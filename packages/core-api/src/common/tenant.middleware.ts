import { Injectable } from "@nestjs/common";
import type { NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";
import { PrismaService } from "./prisma.service";

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
    // 1. Try JWT from Authorization header first
    const authHeader = req.headers["authorization"];
    if (authHeader?.startsWith("Bearer ")) {
      try {
        const token = authHeader.slice(7);
        const payload = JSON.parse(
          Buffer.from(token.split(".")[1]!, "base64url").toString(),
        );
        if (payload.tenant_id) {
          req.tenantId = payload.tenant_id;
        }
        if (payload.sub) {
          req.userId = payload.sub;
        }
      } catch {
        // Invalid JWT format — ignore, fall through to header
      }
    }

    // 2. Fallback: X-Tenant-Id header (dev mode)
    if (!req.tenantId) {
      const headerTenant = req.headers["x-tenant-id"] as
        | string
        | undefined;
      if (headerTenant) {
        req.tenantId = headerTenant;
      }
    }

    // 3. Set PostgreSQL RLS variable
    if (req.tenantId) {
      await this.prisma.$executeRawUnsafe(
        `SET LOCAL app.current_tenant_id = '${req.tenantId}'`,
      );
    }

    next();
  }
}
