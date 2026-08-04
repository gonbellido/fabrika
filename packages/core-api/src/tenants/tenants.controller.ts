import { Controller, Get, Post, Param, Body, Req } from "@nestjs/common";
import type { Request } from "express";
import { PrismaService } from "../common/prisma.service";

@Controller("tenants")
export class TenantsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(@Req() req: Request) {
    if (req.tenantId) {
      return this.prisma.tenant.findMany({ where: { id: req.tenantId } });
    }
    return this.prisma.tenant.findMany();
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return this.prisma.tenant.findUniqueOrThrow({ where: { id } });
  }

  @Post()
  async create(@Body() body: { name: string; slug: string }) {
    return this.prisma.tenant.create({
      data: { name: body.name, slug: body.slug },
    });
  }
}
