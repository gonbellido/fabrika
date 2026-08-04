import { describe, it, expect } from "vitest";
import { PublishingEngine } from "./engine";
import { FlagManager } from "./flags";
import { VersionManager } from "./versioning";
import type { ComponentDSL } from "@fabrika/dsl";

const base: ComponentDSL = {
  type: "ProductCard",
  version: "1.0.0",
  schema: "https://fabrika.dev/schemas/component-v1",
  label: "Test Card",
  category: "ecommerce",
  permissions: ["catalog.read"],
  children: [],
  meta: { source: "ai", author: "test" },
};

describe("PublishingEngine", () => {
  const engine = new PublishingEngine();

  describe("publish", () => {
    it("generates HTML for all breakpoints", () => {
      const result = engine.publish({
        id: "p1",
        siteId: "s1", tenantId: "t1",
        slug: "test",
        title: "Test Page",
        dsl: base,
        version: 1,
      });
      expect(result.html.desktop).toContain("<!DOCTYPE html>");
      expect(result.html.desktop).toContain("Test Card");
      expect(result.html.tablet).toBeDefined();
      expect(result.html.mobile).toBeDefined();
    });

    it("generates correct URL", () => {
      const result = engine.publish(
        {
          id: "p1",
          siteId: "s1", tenantId: "t1",
          slug: "test",
          title: "Test Page",
          dsl: base,
          version: 1,
        },
        "https://demo.fabrika.dev",
      );
      expect(result.url).toBe(
        "https://demo.fabrika.dev/sites/s1/test",
      );
    });

    it("renders component type in HTML", () => {
      const result = engine.publish({
        id: "p1",
        siteId: "s1", tenantId: "t1",
        slug: "test",
        title: "Test",
        dsl: base,
        version: 1,
      });
      expect(result.html.desktop).toContain('data-component="ProductCard"');
    });

    it("includes meta tags", () => {
      const result = engine.publish({
        id: "p1",
        siteId: "s1", tenantId: "t1",
        slug: "test",
        title: "Test Page",
        dsl: base,
        version: 1,
      });
      expect(result.html.desktop).toContain("<title>Test Card</title>");
      expect(result.html.desktop).toContain("viewport");
    });

    it("respects feature flags", () => {
      const flagged: ComponentDSL = {
        ...base,
        type: "Section",
        label: "SecretSection",
        permissions: [],
        children: [],
        slots: {},
      };

      const eng = new PublishingEngine();
      eng.setFlags([
        {
          key: "hide-secret",
          description: "Hide secret section",
          targets: ["SecretSection"],
          rollout: 100,
          enabled: false,
        },
      ]);

      const result = eng.publish({
        id: "p1",
        siteId: "s1", tenantId: "t1",
        slug: "test",
        title: "Test",
        dsl: flagged,
        version: 1,
      });
      // The title tag may still contain the label but the body won't render it
      expect(result.html.desktop).not.toContain('data-component="Section"');
    });
  });
});

describe("FlagManager", () => {
  const fm = new FlagManager();

  it("registers and retrieves flags", () => {
    fm.register({
      key: "new-feature",
      description: "A new feature",
      targets: ["Hero"],
      rollout: 100,
      enabled: true,
    });
    expect(fm.getActive()).toHaveLength(1);
  });

  it("evaluates enabled flag", () => {
    fm.register({
      key: "enabled-flag",
      description: "Enabled",
      targets: ["X"],
      rollout: 100,
      enabled: true,
    });
    expect(fm.evaluate("enabled-flag")).toBe(true);
  });

  it("evaluates disabled flag", () => {
    fm.register({
      key: "disabled-flag",
      description: "Disabled",
      targets: ["Y"],
      rollout: 100,
      enabled: false,
    });
    expect(fm.evaluate("disabled-flag")).toBe(false);
  });

  it("isComponentVisible returns false for disabled flag target", () => {
    fm.register({
      key: "hidden-comp",
      description: "Hides component",
      targets: ["HiddenHero"],
      rollout: 100,
      enabled: false,
    });
    expect(fm.isComponentVisible("HiddenHero")).toBe(false);
  });

  it("isComponentVisible returns true for unknown component", () => {
    expect(fm.isComponentVisible("Unknown")).toBe(true);
  });

  it("deterministic rollout", () => {
    const fm2 = new FlagManager();
    fm2.register({
      key: "rollout-50",
      description: "50% rollout",
      targets: ["X"],
      rollout: 50,
      enabled: true,
    });
    // Same user always gets same result
    const r1 = fm2.evaluate("rollout-50", "user-123");
    const r2 = fm2.evaluate("rollout-50", "user-123");
    expect(r1).toBe(r2);
  });
});

describe("VersionManager", () => {
  const vm = new VersionManager();

  it("starts with no versions", () => {
    expect(vm.getVersions("p1")).toEqual([]);
  });

  it("records publications", () => {
    const result = {
      pageId: "p1",
      version: 1,
      url: "/p1",
      html: { desktop: "", tablet: "", mobile: "" },
      flags: [],
    };
    vm.record(
      {
        id: "p1",
        siteId: "s1", tenantId: "t1",
        title: "Test",
        slug: "test",
        dsl: base,
        state: "published",
        version: 1,
      },
      result,
    );
    expect(vm.getVersions("p1")).toHaveLength(1);
  });

  it("getLatest returns most recent version", () => {
    const latest = vm.getLatest("p1");
    expect(latest).toBeDefined();
    expect(latest!.version).toBe(1);
  });

  it("getVersion returns specific version", () => {
    const v1 = vm.getVersion("p1", 1);
    expect(v1).toBeDefined();
    expect(v1!.version).toBe(1);
    expect(vm.getVersion("p1", 99)).toBeUndefined();
  });

  it("planRollback detects risk level", () => {
    const vm2 = new VersionManager();
    const r = {
      pageId: "p2",
      version: 0,
      url: "/p2",
      html: { desktop: "", tablet: "", mobile: "" },
      flags: [],
    };
    // Record v1 and v3 (skip v2)
    vm2.record(
      {
        id: "p2",
        siteId: "s1", tenantId: "t1",
        title: "T",
        slug: "t",
        dsl: base,
        state: "published",
        version: 1,
      },
      { ...r, version: 1 },
    );
    vm2.record(
      {
        id: "p2",
        siteId: "s1", tenantId: "t1",
        title: "T",
        slug: "t",
        dsl: base,
        state: "published",
        version: 3,
      },
      { ...r, version: 3 },
    );
    const plan = vm2.planRollback({
      pageId: "p2",
      toVersion: 1,
      reason: "Bug in v3",
    });
    expect(plan).toBeDefined();
    expect(plan!.risk).toBe("medium");
    expect(plan!.diff.versionDelta).toBe(2);
  });

  it("planRollback returns null for unknown page", () => {
    expect(
      vm.planRollback({ pageId: "unknown", toVersion: 1, reason: "" }),
    ).toBeNull();
  });
});
