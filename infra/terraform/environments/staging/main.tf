terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
    random = { source = "hashicorp/random", version = "~> 3.0" }
  }
  backend "s3" {
    bucket  = "fabrika-tfstate"
    key     = "staging/terraform.tfstate"
    region  = "eu-west-1"
    encrypt = true
  }
}

provider "aws" {
  region = "eu-west-1"
  default_tags {
    tags = {
      Project     = "fabrika"
      Environment = "staging"
      ManagedBy   = "terraform"
    }
  }
}

locals {
  environment = "staging"
  tags = {
    Project     = "fabrika"
    Environment = local.environment
  }
}

module "networking" {
  source = "../../modules/networking"
  vpc_cidr = "10.0.0.0/16"
  azs = ["eu-west-1a", "eu-west-1b"]
  environment = local.environment
  tags = local.tags
}

module "database" {
  source = "../../modules/database"
  vpc_id             = module.networking.vpc_id
  private_subnet_ids = module.networking.private_subnet_ids
  environment        = local.environment
  instance_class     = "db.t4g.micro"
  db_name            = "fabrika"
  db_username        = "fabrika_admin"
  tags               = local.tags
}

module "compute" {
  source = "../../modules/compute"
  vpc_id                = module.networking.vpc_id
  private_subnet_ids    = module.networking.private_subnet_ids
  public_subnet_ids     = module.networking.public_subnet_ids
  db_security_group_id  = module.database.security_group_id
  environment           = local.environment
  container_image       = "ghcr.io/gonbellido/fabrika-core-api:staging"
  container_port        = 3000
  app_count             = 1
  domain_name           = "staging.fabrika.dev"
  tags                  = local.tags
}

module "cdn" {
  source = "../../modules/cdn"
  domain_name  = "staging.fabrika.dev"
  alb_dns_name = module.compute.alb_dns_name
  environment  = local.environment
  tags         = local.tags
}

output "alb_dns_name" { value = module.compute.alb_dns_name }
output "cloudfront_domain" { value = module.cdn.cloudfront_domain }
