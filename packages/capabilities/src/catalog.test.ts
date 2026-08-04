import { describe, it, expect } from "vitest";
import {
  CATALOG,
  getCapability,
  isCapabilityAuthorized,
  getDefaultCapabilities,
  getCapabilitiesByScope,
} from "./catalog";

describe("CATALOG", () => {
  it("has 31 capabilities", () => {
    expect(CATALOG).toHaveLength(31);
  });

  it("all capabilities have required fields", () => {
    for (const cap of CATALOG) {
      expect(cap.id).toBeTruthy();
      expect(cap.allows).toBeTruthy();
      expect(cap.denies).toBeTruthy();
      expect(["Tenant", "Usuario"]).toContain(cap.scope);
      expect(typeof cap.default).toBe("boolean");
    }
  });

  it("all capability IDs are unique", () => {
    const ids = CATALOG.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all IDs follow namespace.resource.action format", () => {
    for (const cap of CATALOG) {
      const parts = cap.id.split(".");
      expect(parts.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("getCapability", () => {
  it("returns definition for catalog.read", () => {
    const cap = getCapability("catalog.read");
    expect(cap).toBeDefined();
    expect(cap!.scope).toBe("Tenant");
    expect(cap!.default).toBe(true);
  });

  it("returns definition for cart.write", () => {
    const cap = getCapability("cart.write");
    expect(cap).toBeDefined();
    expect(cap!.scope).toBe("Usuario");
  });

  it("returns definition for tenant.users.read", () => {
    const cap = getCapability("tenant.users.read");
    expect(cap).toBeDefined();
    expect(cap!.default).toBe(false);
  });

  it("returns undefined for unknown capability", () => {
    expect(getCapability("nonexistent.cap")).toBeUndefined();
  });

  it("returns undefined for empty string", () => {
    expect(getCapability("")).toBeUndefined();
  });
});

describe("isCapabilityAuthorized", () => {
  it("authorizes capability in permissions list", () => {
    expect(
      isCapabilityAuthorized("catalog.read", ["catalog.read"]),
    ).toBe(true);
  });

  it("authorizes with multiple permissions", () => {
    expect(
      isCapabilityAuthorized("cart.write", [
        "catalog.read",
        "cart.write",
      ]),
    ).toBe(true);
  });

  it("rejects capability not in permissions", () => {
    expect(
      isCapabilityAuthorized("cart.write", ["catalog.read"]),
    ).toBe(false);
  });

  it("rejects unknown capability even if in list", () => {
    expect(
      isCapabilityAuthorized("bad.cap", ["bad.cap"]),
    ).toBe(false);
  });

  it("rejects empty permissions list", () => {
    expect(isCapabilityAuthorized("catalog.read", [])).toBe(false);
  });
});

describe("getDefaultCapabilities", () => {
  it("returns array of default capability IDs", () => {
    const defaults = getDefaultCapabilities();
    expect(defaults.length).toBeGreaterThan(10);
    expect(defaults).toContain("catalog.read");
    expect(defaults).toContain("cart.read");
    expect(defaults).toContain("content.read");
  });

  it("does not include non-default capabilities", () => {
    const defaults = getDefaultCapabilities();
    expect(defaults).not.toContain("catalog.write");
    expect(defaults).not.toContain("analytics.read");
  });
});

describe("getCapabilitiesByScope", () => {
  it("returns tenant-scoped capabilities", () => {
    const tenant = getCapabilitiesByScope("Tenant");
    expect(tenant.length).toBeGreaterThan(0);
    for (const cap of tenant) {
      expect(cap.scope).toBe("Tenant");
    }
  });

  it("returns user-scoped capabilities", () => {
    const user = getCapabilitiesByScope("Usuario");
    expect(user.length).toBeGreaterThan(0);
    for (const cap of user) {
      expect(cap.scope).toBe("Usuario");
    }
    expect(user.some((c) => c.id === "cart.write")).toBe(true);
  });
});
