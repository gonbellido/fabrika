# Fabrika Infrastructure (Terraform)

## Estructura

```
infra/terraform/
├── variables.tf                  # Variables globales
├── modules/
│   ├── networking/               # VPC, subnets, NAT, IGW
│   ├── database/                 # RDS PostgreSQL 16 + RLS-ready
│   ├── compute/                  # ECS Fargate, ALB, IAM
│   └── cdn/                      # CloudFront, S3, Route53
└── environments/
    ├── staging/                  # 1 AZ, db.t4g.micro, 1 instance
    └── production/               # 3 AZs, db.t4g.medium, 3 instances, WAF
```

## Despliegue

### Prerequisitos

1. AWS CLI configurado
2. Terraform >= 1.5
3. S3 bucket para tfstate: `fabrika-tfstate`
4. ACM certificate para el dominio
5. Secrets Manager: `fabrika-{env}-db-credentials`

### Comandos

```bash
# Staging
cd infra/terraform/environments/staging
terraform init
terraform plan
terraform apply

# Production
cd infra/terraform/environments/production
terraform init
terraform plan
terraform apply
```

## Recursos creados

| Recurso    | Staging                  | Production                        |
| ---------- | ------------------------ | --------------------------------- |
| VPC        | 10.0.0.0/16, 2 AZs       | 10.1.0.0/16, 3 AZs                |
| RDS        | db.t4g.micro, 20GB       | db.t4g.medium, multi-AZ, 20-100GB |
| ECS        | 1 task, 512 CPU, 1GB RAM | 3 tasks, 512 CPU, 1GB RAM         |
| CloudFront | 1 distribution           | 1 distribution                    |
| WAF        | No                       | Rate limiting (2000 req/5min)     |
| Backups    | 7 days                   | 30 days, deletion protection      |

## Variables sensibles (Secrets Manager)

- `fabrika-{env}-db-credentials`: username, password, host, port, dbname
- Database password: generado automáticamente por `random_password`
