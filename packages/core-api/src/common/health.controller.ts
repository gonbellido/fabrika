import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return {
      status: "ok",
      version: "1.0.0",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        keycloak: process.env["KEYCLOAK_URL"] ?? "http://localhost:8081",
        vault: "http://localhost:8201",
        sandbox: process.env["SANDBOX_URL"] ?? "http://localhost:3001",
      },
    };
  }
}
