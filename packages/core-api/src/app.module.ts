import { Module } from "@nestjs/common";
import type { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PrismaService } from "./common/prisma.service";
import { TenantMiddleware } from "./common/tenant.middleware";
import { TenantsController } from "./tenants/tenants.controller";
import { SitesController } from "./sites/sites.controller";
import { PagesController } from "./pages/pages.controller";
import { AiController } from "./ai/ai.controller";
import { AuthModule } from "./auth/auth.module";
import { OptionalKeycloakGuard } from "./auth/keycloak.guard";

@Module({
  imports: [AuthModule],
  controllers: [
    TenantsController,
    SitesController,
    PagesController,
    AiController,
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
    consumer.apply(TenantMiddleware).forRoutes("*");
  }
}
