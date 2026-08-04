import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Keycloak JWT guard — protege endpoints requiriendo un token válido.
 */
@Injectable()
export class KeycloakGuard extends AuthGuard("keycloak") {
  override canActivate(context: ExecutionContext) {
    // Allow requests without token (for public endpoints)
    // The guard is only applied to routes that need auth via @UseGuards
    return super.canActivate(context);
  }

  override handleRequest<TUser>(
    err: unknown,
    user: TUser,
  ): TUser {
    if (err || !user) {
      throw err ?? new Error("Unauthorized");
    }
    return user;
  }
}

/**
 * Optional JWT guard — extrae el usuario si hay token, pero no bloquea.
 */
@Injectable()
export class OptionalKeycloakGuard extends AuthGuard("keycloak") {
  override handleRequest<TUser>(
    err: unknown,
    user: TUser | false,
  ): TUser | null {
    if (err || !user) return null;
    return user as TUser;
  }
}
