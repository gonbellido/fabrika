variable "vpc_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "public_subnet_ids" { type = list(string) }
variable "db_security_group_id" { type = string }
variable "environment" { type = string }
variable "container_image" { type = string }
variable "container_port" { type = number }
variable "app_count" { type = number }
variable "domain_name" { type = string }
variable "tags" { type = map(string) }

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "fabrika-${var.environment}"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  tags = var.tags
}

# Security group for app
resource "aws_security_group" "app" {
  name   = "fabrika-${var.environment}-app-sg"
  vpc_id = var.vpc_id
  ingress {
    from_port   = var.container_port
    to_port     = var.container_port
    protocol    = "tcp"
    cidr_blocks = [] // filled by ALB SG
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = merge(var.tags, { Name = "fabrika-${var.environment}-app-sg" })
}

# Allow DB access from app
resource "aws_security_group_rule" "app_to_db" {
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.app.id
  security_group_id        = var.db_security_group_id
}

# ALB
resource "aws_lb" "main" {
  name               = "fabrika-${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = var.public_subnet_ids
  tags = merge(var.tags, { Name = "fabrika-${var.environment}-alb" })
}

resource "aws_security_group" "alb" {
  name   = "fabrika-${var.environment}-alb-sg"
  vpc_id = var.vpc_id
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Allow ALB → App
resource "aws_security_group_rule" "alb_to_app" {
  type                     = "ingress"
  from_port                = var.container_port
  to_port                  = var.container_port
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.alb.id
  security_group_id        = aws_security_group.app.id
}

resource "aws_lb_target_group" "app" {
  name        = "fabrika-${var.environment}-tg"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"
  health_check {
    path                = "/api/health"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = data.aws_acm_certificate.main.arn
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

data "aws_acm_certificate" "main" {
  domain   = var.domain_name
  statuses = ["ISSUED"]
}

# ECS Service
resource "aws_ecs_task_definition" "app" {
  family                   = "fabrika-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 512
  memory                   = 1024
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([{
    name  = "core-api"
    image = var.container_image
    portMappings = [{ containerPort = var.container_port }]
    environment = [
      { name = "DATABASE_URL", value = "postgresql://$${DB_USERNAME}:$${DB_PASSWORD}@$${DB_HOST}:$${DB_PORT}/$${DB_NAME}" },
      { name = "ENVIRONMENT", value = var.environment },
    ]
    secrets = [
      { name = "DB_USERNAME", valueFrom = "${data.aws_secretsmanager_secret_version.db_creds.arn}:username::" },
      { name = "DB_PASSWORD", valueFrom = "${data.aws_secretsmanager_secret_version.db_creds.arn}:password::" },
      { name = "DB_HOST", valueFrom = "${data.aws_secretsmanager_secret_version.db_creds.arn}:host::" },
      { name = "DB_PORT", valueFrom = "${data.aws_secretsmanager_secret_version.db_creds.arn}:port::" },
      { name = "DB_NAME", valueFrom = "${data.aws_secretsmanager_secret_version.db_creds.arn}:dbname::" },
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/fabrika-${var.environment}"
        "awslogs-region"        = data.aws_region.current.name
        "awslogs-stream-prefix" = "core-api"
      }
    }
  }])
}

data "aws_secretsmanager_secret_version" "db_creds" {
  secret_id = "fabrika-${var.environment}-db-credentials"
}

resource "aws_ecs_service" "app" {
  name            = "fabrika-${var.environment}-app"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [aws_security_group.app.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "core-api"
    container_port   = var.container_port
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  tags = var.tags
}

# IAM
resource "aws_iam_role" "ecs_execution" {
  name = "fabrika-${var.environment}-ecs-execution"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution_policy" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_task" {
  name = "fabrika-${var.environment}-ecs-task"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "secrets_access" {
  name = "fabrika-${var.environment}-secrets-access"
  role = aws_iam_role.ecs_task.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action   = ["secretsmanager:GetSecretValue"]
      Effect   = "Allow"
      Resource = ["*"]
    }]
  })
}

# CloudWatch Logs
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/fabrika-${var.environment}"
  retention_in_days = var.environment == "production" ? 90 : 14
  tags              = var.tags
}

data "aws_region" "current" {}

output "alb_dns_name" { value = aws_lb.main.dns_name }
output "cluster_name" { value = aws_ecs_cluster.main.name }
output "service_name" { value = aws_ecs_service.app.name }
