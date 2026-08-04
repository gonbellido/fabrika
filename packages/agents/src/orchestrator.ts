import type {
  AgentTask,
  AgentMessage,
  AgentConfig,
  TaskStatus,
  AgentRole,
  QualityGate,
} from "./types.js";

import { agentConfigs } from "./config.js";

/** El Orchestrator divide objetivos en tareas, las asigna y resuelve conflictos */
export class Orchestrator {
  private tasks: Map<string, AgentTask> = new Map();
  private messages: AgentMessage[] = [];

  /** Divide un objetivo en tareas con dependencias */
  plan(objective: string, roles: AgentRole[]): AgentTask[] {
    const tasks: AgentTask[] = roles.map((role, index) => ({
      id: `task-${Date.now()}-${index}`,
      title: `${role}: ${objective}`,
      description: `Tarea asignada al agente ${role} para: ${objective}`,
      assignedTo: role,
      status: "assigned" as TaskStatus,
      dependencies: index > 0 ? [`task-${Date.now()}-${index - 1}`] : [],
      artifactType: this.inferArtifact(role),
      qualityGates: this.defaultGates(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    for (const task of tasks) {
      this.tasks.set(task.id, task);
    }

    return tasks;
  }

  /** Obtiene la configuración de un agente */
  getAgentConfig(role: AgentRole): AgentConfig | undefined {
    return agentConfigs.get(role);
  }

  /** Verifica dependencias de una tarea */
  areDependenciesMet(task: AgentTask): boolean {
    return task.dependencies.every((depId) => {
      const dep = this.tasks.get(depId);
      return dep?.status === "completed";
    });
  }

  /** Envía un mensaje entre agentes */
  sendMessage(message: Omit<AgentMessage, "id" | "timestamp">): AgentMessage {
    const msg: AgentMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    this.messages.push(msg);
    return msg;
  }

  private inferArtifact(role: AgentRole) {
    const map: Partial<Record<AgentRole, AgentTask["artifactType"]>> = {
      product: "user_story",
      research: "research_finding",
      architecture: "adr",
      implementation: "component_dsl",
      testing: "test_suite",
      security: "security_report",
      release: "changelog",
      feedback: "feedback_report",
      orchestrator: "task_plan",
      builder: "component_dsl",
    };
    return map[role] ?? "task_plan";
  }

  private defaultGates(): QualityGate[] {
    return [
      { type: "humana", status: "pending" },
      { type: "tecnica", status: "pending" },
      { type: "seguridad", status: "pending" },
      { type: "calidad", status: "pending" },
    ];
  }
}
