variable "environment" {
  description = "Environment name (staging, production)"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "AZs for subnets"
  type        = list(string)
  default     = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t4g.medium"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "fabrika"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  default     = "fabrika_admin"
  sensitive   = true
}

variable "app_container_image" {
  description = "Core API container image"
  type        = string
  default     = "ghcr.io/gonbellido/fabrika-core-api:latest"
}

variable "app_container_port" {
  description = "Container port"
  type        = number
  default     = 3000
}

variable "app_count" {
  description = "Number of app instances"
  type        = number
  default     = 2
}

variable "domain_name" {
  description = "Root domain for the platform"
  type        = string
  default     = "fabrika.dev"
}

variable "tags" {
  description = "Common tags"
  type        = map(string)
  default     = {}
}
