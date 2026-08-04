import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as jwksRsa from "jwks-rsa";

export interface KeycloakUser {
  sub: string;
  email?: string;
  preferred_username?: string;
  realm_access?: { roles: string[] };
  tenant_id?: string;
}

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, "keycloak") {
  constructor() {
    const keycloakUrl = process.env["KEYCLOAK_URL"] ?? "http://localhost:8081";
    const realm = process.env["KEYCLOAK_REALM"] ?? "fabrika";

    const jwksUri = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/certs`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri,
      }),
      issuer: `${keycloakUrl}/realms/${realm}`,
      algorithms: ["RS256"],
    });
  }

  async validate(payload: Record<string, unknown>) {
    return {
      sub: payload["sub"],
      email: payload["email"] ?? payload["preferred_username"],
      preferred_username: payload["preferred_username"],
      realm_access: payload["realm_access"],
      tenant_id: payload["tenant_id"],
    } as KeycloakUser;
  }
}
