import { describe, it, expect } from "vitest";
import { Orchestrator } from "./orchestrator";
import { agentConfigs } from "./config";

describe("Orchestrator", () => {
  const orch = new Orchestrator();

  describe("plan", () => {
    it("creates correct number of tasks", () => {
      const tasks = orch.plan("Build product card", [
        "research",
        "implementation",
        "testing",
      ]);
      expect(tasks).toHaveLength(3);
    });

    it("tasks have required fields", () => {
      const tasks = orch.plan("Test", ["research"]);
      const task = tasks[0]!;
      expect(task.id).toMatch(/^task-/);
      expect(task.title).toContain("research");
      expect(task.status).toBe("assigned");
      expect(task.dependencies).toEqual([]);
      expect(task.artifactType).toBeDefined();
      expect(task.qualityGates).toHaveLength(4);
    });

    it("first task has no dependencies", () => {
      const tasks = orch.plan("X", ["architecture", "implementation"]);
      expect(tasks[0]!.dependencies).toHaveLength(0);
    });

    it("subsequent tasks depend on previous", () => {
      const tasks = orch.plan("X", ["architecture", "implementation"]);
      expect(tasks[1]!.dependencies).toHaveLength(1);
    });

    it("all tasks have 4 quality gates", () => {
      const tasks = orch.plan("X", ["research", "implementation"]);
      for (const task of tasks) {
        expect(task.qualityGates).toHaveLength(4);
        expect(
          task.qualityGates.map((g) => g.type),
        ).toEqual(["humana", "tecnica", "seguridad", "calidad"]);
      }
    });
  });

  describe("getAgentConfig", () => {
    it("returns config for known role", () => {
      const cfg = orch.getAgentConfig("orchestrator");
      expect(cfg).toBeDefined();
      expect(cfg!.role).toBe("orchestrator");
    });

    it("returns config for all 14 agents", () => {
      const roles = Array.from(agentConfigs.keys());
      expect(roles.length).toBe(14);
      for (const role of roles) {
        expect(orch.getAgentConfig(role as never)).toBeDefined();
      }
    });

    it("returns undefined for unknown role", () => {
      expect(orch.getAgentConfig("nonexistent" as never)).toBeUndefined();
    });
  });

  describe("areDependenciesMet", () => {
    it("returns true when no dependencies", () => {
      const tasks = orch.plan("Test", ["research"]);
      expect(orch.areDependenciesMet(tasks[0]!)).toBe(true);
    });

    it("returns false when dependency not completed", () => {
      const tasks = orch.plan("Test", ["architecture", "implementation"]);
      expect(orch.areDependenciesMet(tasks[1]!)).toBe(false);
    });
  });

  describe("sendMessage", () => {
    it("creates message with id and timestamp", () => {
      const msg = orch.sendMessage({
        from: "orchestrator",
        to: "builder",
        taskId: "t1",
        type: "delegation",
        payload: { test: true },
      });
      expect(msg.id).toMatch(/^msg-/);
      expect(msg.timestamp).toBeDefined();
      expect(msg.from).toBe("orchestrator");
      expect(msg.to).toBe("builder");
    });
  });
});

describe("agentConfigs", () => {
  it("has all required agent roles", () => {
    const roles = Array.from(agentConfigs.keys());
    expect(roles).toContain("product");
    expect(roles).toContain("architecture");
    expect(roles).toContain("implementation");
    expect(roles).toContain("testing");
    expect(roles).toContain("security");
    expect(roles).toContain("orchestrator");
    expect(roles).toContain("builder");
    expect(roles).toContain("attacker");
    expect(roles).toContain("defender");
    expect(roles).toContain("auditor");
    expect(roles).toContain("release");
    expect(roles).toContain("feedback");
    expect(roles).toContain("research");
  });

  it("each config has valid autonomy level", () => {
    const valid = ["autonomous", "assisted", "human_required"];
    for (const [, config] of agentConfigs) {
      expect(valid).toContain(config.autonomy);
    }
  });

  it("builder agent has DSL generation capabilities", () => {
    const builder = agentConfigs.get("builder");
    expect(builder!.capabilities).toContain("catalog.read");
  });

  it("orchestrator has assisted autonomy", () => {
    const orch = agentConfigs.get("orchestrator");
    expect(orch!.autonomy).toBe("assisted");
  });

  it("feedback agent is autonomous", () => {
    const feedback = agentConfigs.get("feedback");
    expect(feedback!.autonomy).toBe("autonomous");
  });

  it("release agent requires human approval", () => {
    const release = agentConfigs.get("release");
    expect(release!.autonomy).toBe("human_required");
  });
});
