import { Injectable } from '@nestjs/common';
import type { NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { PrismaService } from './prisma.service';

// Extend Express Request to include tenant context
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      tenantId?: string;
      userId?: string;
      userRole?: string;
    }
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    // In production, extract tenant_id from JWT token (Keycloak)
    // For dev, use header X-Tenant-Id or default to demo tenant
    const tenantId = req.headers['x-tenant-id'] as string | undefined;

    if (tenantId) {
      req.tenantId = tenantId;
    }

    // Set PostgreSQL session variable for RLS
    if (req.tenantId) {
      await this.prisma.$executeRawUnsafe(
        `SET LOCAL app.current_tenant_id = '${req.tenantId}'`,
      );
    }

    next();
  }
}
