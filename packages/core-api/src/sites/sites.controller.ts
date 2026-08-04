import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

function validateUuid(id: string, name: string) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    throw new BadRequestException(`Invalid ${name} ID format`);
  }
}

@Controller("tenants/:tenantId/sites")
export class SitesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(@Param("tenantId") tenantId: string) {
    validateUuid(tenantId, "tenant");
    return this.prisma.site.findMany({ where: { tenantId } });
  }

  @Get(":id")
  async get(@Param("tenantId") tenantId: string, @Param("id") id: string) {
    validateUuid(tenantId, "tenant");
    validateUuid(id, "site");
    const site = await this.prisma.site.findFirst({
      where: { id, tenantId },
    });
    if (!site) throw new NotFoundException("Site not found");
    return site;
  }

  @Post()
  async create(
    @Param("tenantId") tenantId: string,
    @Body() body: { name: string; domain?: string },
  ) {
    validateUuid(tenantId, "tenant");
    return this.prisma.site.create({
      data: { name: body.name, domain: body.domain ?? null, tenantId },
    });
  }
}
