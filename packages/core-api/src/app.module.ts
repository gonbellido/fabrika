import { Module } from "@nestjs/common";
import type { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PrismaService } from "./common/prisma.service";
import { TenantMiddleware } from "./common/tenant.middleware";
import { LoggingMiddleware } from "./common/logging.middleware";
import { TenantsController } from "./tenants/tenants.controller";
import { SitesController } from "./sites/sites.controller";
import { PagesController } from "./pages/pages.controller";
import { AiController } from "./ai/ai.controller";
import { SandboxController } from "./sandbox/sandbox.controller";
import { HealthController } from "./common/health.controller";
import { AuthModule } from "./auth/auth.module";
import { OptionalKeycloakGuard } from "./auth/keycloak.guard";

@Module({
  imports: [AuthModule],
  controllers: [
    HealthController,
    TenantsController,
    SitesController,
    PagesController,
    AiController,
    SandboxController,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: OptionalKeycloakGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
    consumer.apply(TenantMiddleware).forRoutes("*");
  }
}
