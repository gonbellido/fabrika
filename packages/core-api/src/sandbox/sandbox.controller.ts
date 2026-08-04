import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

interface ExecuteRequest {
  wasmBase64: string;
  manifest: {
    name: string;
    version: string;
    runtime: string;
    permissions: string[];
    limits: {
      cpuMs: number;
      memoryMb: number;
      walltimeMs: number;
      network: string;
    };
  };
}

interface ExecuteResponse {
  success: boolean;
  output: string | undefined;
  error: string | undefined;
  cpuUsedMs: number;
  memoryUsedBytes: number;
}

@Controller("sandbox")
export class SandboxController {
  private readonly sidecarUrl: string;

  constructor() {
    this.sidecarUrl =
      process.env["SANDBOX_URL"] ?? "http://localhost:3001";
  }

  @Post("execute")
  async execute(
    @Body() body: ExecuteRequest,
  ): Promise<ExecuteResponse> {
    if (!body.wasmBase64 || body.wasmBase64.length === 0) {
      throw new HttpException(
        { message: "wasmBase64 is required" },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!body.manifest?.permissions?.length) {
      throw new HttpException(
        { message: "Manifest with permissions is required" },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const res = await fetch(`${this.sidecarUrl}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wasm_base64: body.wasmBase64,
          manifest: {
            name: body.manifest.name,
            version: body.manifest.version,
            runtime: body.manifest.runtime ?? "wasm",
            permissions: body.manifest.permissions,
            limits: {
              cpu_ms: body.manifest.limits?.cpuMs ?? 50,
              memory_mb: body.manifest.limits?.memoryMb ?? 32,
              walltime_ms: body.manifest.limits?.walltimeMs ?? 200,
              network: body.manifest.limits?.network ?? "none",
            },
          },
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new HttpException(
          { message: `Sandbox error: ${err}` },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const data = (await res.json()) as {
        success: boolean;
        output?: string;
        error?: string;
        cpu_used_ms: number;
        memory_used_bytes: number;
      };

      return {
        success: data.success,
        output: data.output ?? undefined,
        error: data.error ?? undefined,
        cpuUsedMs: data.cpu_used_ms,
        memoryUsedBytes: data.memory_used_bytes,
      } as ExecuteResponse;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      const message =
        error instanceof Error ? error.message : "Unknown error";

      if (message.includes("ECONNREFUSED") || message.includes("fetch failed")) {
        throw new HttpException(
          { message: "Sandbox sidecar not running on " + this.sidecarUrl },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      throw new HttpException(
        { message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
