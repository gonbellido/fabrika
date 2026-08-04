/** Tipo de agente en la fábrica multiagente */
export type AgentRole =
  | "product"
  | "research"
  | "architecture"
  | "ux"
  | "implementation"
  | "testing"
  | "security"
  | "release"
  | "feedback"
  | "orchestrator"
  | "builder"
  | "attacker"
  | "defender"
  | "auditor";

/** Autonomía del agente */
export type AgentAutonomy = "autonomous" | "assisted" | "human_required";

/** Estado de una tarea asignada a un agente */
export type TaskStatus =
  "pending" | "assigned" | "in_progress" | "awaiting_review" | "completed" | "blocked" | "failed";

/** Una tarea asignable a un agente */
export interface AgentTask {
  id: string;
  title: string;
  description: string;
  assignedTo: AgentRole;
  status: TaskStatus;
  dependencies: string[];
  artifactType: ArtifactType;
  qualityGates: QualityGate[];
  createdAt: string;
  updatedAt: string;
}

/** Tipo de artefacto que produce un agente */
export type ArtifactType =
  | "user_story"
  | "research_finding"
  | "adr"
  | "component_dsl"
  | "api_contract"
  | "prisma_schema"
  | "test_suite"
  | "security_report"
  | "changelog"
  | "feedback_report"
  | "task_plan";

/** Puerta de calidad que debe atravesar una tarea */
export interface QualityGate {
  type: "producto" | "tecnica" | "seguridad" | "calidad" | "humana";
  status: "pending" | "passed" | "failed";
  reviewedBy?: AgentRole;
  reviewedAt?: string;
}

/** Mensaje entre agentes */
export interface AgentMessage {
  id: string;
  from: AgentRole;
  to: AgentRole;
  taskId: string;
  type: "request" | "response" | "notification" | "delegation";
  payload: unknown;
  timestamp: string;
}

/** Configuración de un agente */
export interface AgentConfig {
  role: AgentRole;
  autonomy: AgentAutonomy;
  capabilities: string[];
  systemPrompt?: string;
}
