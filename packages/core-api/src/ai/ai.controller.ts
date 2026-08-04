import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { DeepSeekProvider } from "./deepseek";
import { validateComponent } from "@fabrika/dsl";

@Controller("ai")
export class AiController {
  private readonly provider: DeepSeekProvider;

  constructor() {
    this.provider = new DeepSeekProvider();
  }

  @Post("generate")
  async generate(
    @Body() body: { prompt: string; type?: string },
  ) {
    if (!body.prompt || body.prompt.trim().length === 0) {
      throw new HttpException(
        { message: "Prompt is required" },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (body.prompt.length > 2000) {
      throw new HttpException(
        { message: "Prompt too long (max 2000 chars)" },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const componentType = body.type ?? "ProductCard";
      const dsl = await this.provider.generateComponent(
        body.prompt,
        componentType,
      );

      const validation = validateComponent(dsl);
      if (!validation.valid) {
        throw new HttpException(
          {
            message: "Generated DSL failed validation",
            errors: validation.errors,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return dsl;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "AI generation failed";

      if (message.includes("DEEPSEEK_API_KEY not set")) {
        throw new HttpException(
          {
            message:
              "AI not configured. Set DEEPSEEK_API_KEY in .env",
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      throw new HttpException(
        { message, details: [] },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
