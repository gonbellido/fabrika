variable "domain_name" { type = string }
variable "alb_dns_name" { type = string }
variable "environment" { type = string }
variable "tags" { type = map(string) }

# CloudFront distribution para el editor SPA y sitios publicados
resource "aws_cloudfront_distribution" "main" {
  enabled = true
  aliases = [var.domain_name, "*.${var.domain_name}"]

  # Sitios publicados (S3 static)
  origin {
    domain_name = aws_s3_bucket.sites.bucket_regional_domain_name
    origin_id   = "s3-sites"
  }

  # Editor SPA (S3 static)
  origin {
    domain_name = aws_s3_bucket.editor.bucket_regional_domain_name
    origin_id   = "s3-editor"
  }

  # API (ALB)
  origin {
    domain_name = var.alb_dns_name
    origin_id   = "alb-api"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-sites"
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }

  # API cache behavior
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "alb-api"
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = true
      headers      = ["Authorization", "X-Tenant-Id"]
      cookies { forward = "all" }
    }
  }

  # Editor cache behavior
  ordered_cache_behavior {
    path_pattern     = "/editor/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-editor"
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.main.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = var.tags
}

data "aws_acm_certificate" "main" {
  domain   = var.domain_name
  statuses = ["ISSUED"]
}

# S3 para sitios publicados (HTML estático)
resource "aws_s3_bucket" "sites" {
  bucket = "fabrika-${var.environment}-sites"
  tags   = var.tags
}

resource "aws_s3_bucket_public_access_block" "sites" {
  bucket                  = aws_s3_bucket.sites.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "editor" {
  bucket = "fabrika-${var.environment}-editor"
  tags   = var.tags
}

resource "aws_s3_bucket_public_access_block" "editor" {
  bucket                  = aws_s3_bucket.editor.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Route 53
data "aws_route53_zone" "main" {
  name = "${var.domain_name}."
}

resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "wildcard" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "*.${var.domain_name}"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = true
  }
}

output "cloudfront_domain" { value = aws_cloudfront_distribution.main.domain_name }
output "sites_bucket" { value = aws_s3_bucket.sites.id }
output "editor_bucket" { value = aws_s3_bucket.editor.id }
