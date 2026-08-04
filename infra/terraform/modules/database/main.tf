variable "vpc_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "environment" { type = string }
variable "instance_class" { type = string }
variable "db_name" { type = string }
variable "db_username" { type = string }
variable "tags" { type = map(string) }

resource "aws_security_group" "db" {
  name   = "fabrika-${var.environment}-db-sg"
  vpc_id = var.vpc_id
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [] // populated by compute module
  }
  tags = merge(var.tags, { Name = "fabrika-${var.environment}-db-sg" })
}

resource "aws_db_subnet_group" "main" {
  name       = "fabrika-${var.environment}-db-subnet"
  subnet_ids = var.private_subnet_ids
  tags = merge(var.tags, { Name = "fabrika-${var.environment}-db-subnet" })
}

resource "random_password" "db_password" {
  length  = 32
  special = false
}

resource "aws_db_instance" "main" {
  identifier = "fabrika-${var.environment}"

  engine         = "postgres"
  engine_version = "16"
  instance_class = var.instance_class

  db_name  = var.db_name
  username = var.db_username
  password = random_password.db_password.result

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true
  storage_type          = "gp3"

  multi_az               = var.environment == "production"
  backup_retention_period = var.environment == "production" ? 30 : 7
  deletion_protection     = var.environment == "production"

  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  skip_final_snapshot = var.environment != "production"

  tags = merge(var.tags, { Name = "fabrika-${var.environment}-db" })
}

output "endpoint" { value = aws_db_instance.main.endpoint }
output "port" { value = aws_db_instance.main.port }
output "name" { value = aws_db_instance.main.db_name }
output "security_group_id" { value = aws_security_group.db.id }
output "password_arn" { value = "arn:aws:secretsmanager:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:secret:fabrika-${var.environment}-db-password" }

data "aws_region" "current" {}
data "aws_caller_identity" "current" {}
