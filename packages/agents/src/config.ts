import type { AgentConfig } from "./types.js";

/**
 * Configuración de los 14 agentes de la fábrica.
 * AgentConfig define autonomía, capabilities, y propósito.
 */

export const agentConfigs = new Map<string, AgentConfig>([
  [
    "product",
    {
      role: "product",
      autonomy: "assisted",
      capabilities: ["content.read", "analytics.read"],
      systemPrompt:
        "Convierte ideas en historias de producto con criterios de aceptación. No generes código ni DSL.",
    },
  ],
  [
    "research",
    {
      role: "research",
      autonomy: "autonomous",
      capabilities: ["content.read"],
      systemPrompt:
        "Investiga documentación, plugins, competidores. Cita fuentes y nivel de confianza.",
    },
  ],
  [
    "architecture",
    {
      role: "architecture",
      autonomy: "assisted",
      capabilities: [],
      systemPrompt:
        "Propón ADRs, modelos de datos, contratos. No generes implementación.",
    },
  ],
  [
    "implementation",
    {
      role: "implementation",
      autonomy: "assisted",
      capabilities: ["catalog.read", "content.write"],
      systemPrompt:
        "Genera SOLO DSL validado por JSON Schema. Sin JavaScript, SQL, ni GraphQL.",
    },
  ],
  [
    "testing",
    {
      role: "testing",
      autonomy: "autonomous",
      capabilities: ["catalog.read", "content.read"],
      systemPrompt:
        "Crea tests unitarios, integración, E2E, visuales, responsive, accesibilidad.",
    },
  ],
  [
    "security",
    {
      role: "security",
      autonomy: "assisted",
      capabilities: [],
      systemPrompt:
        "Revisa amenazas, permisos, sandbox. Puede bloquear releases.",
    },
  ],
  [
    "release",
    {
      role: "release",
      autonomy: "human_required",
      capabilities: ["content.read", "site.write"],
      systemPrompt:
        "Prepara changelogs, migraciones, rollback. No publica sin aprobación humana.",
    },
  ],
  [
    "feedback",
    {
      role: "feedback",
      autonomy: "autonomous",
      capabilities: ["analytics.read", "content.read"],
      systemPrompt:
        "Clasifica y prioriza feedback de usuarios. Genera propuestas para Product Agent.",
    },
  ],
  [
    "orchestrator",
    {
      role: "orchestrator",
      autonomy: "assisted",
      capabilities: [],
      systemPrompt:
        "Divide objetivos en tareas, asigna agentes, verifica dependencias. No ejecuta tareas directamente.",
    },
  ],
  [
    "builder",
    {
      role: "builder",
      autonomy: "autonomous",
      capabilities: ["catalog.read", "content.write"],
      systemPrompt:
        "Genera componentes DSL e integraciones. Solo produce DSL validado (JSON Schema).",
    },
  ],
  [
    "attacker",
    {
      role: "attacker",
      autonomy: "autonomous",
      capabilities: ["catalog.read"],
      systemPrompt:
        "Intenta escapar del sandbox, saltar permisos, exfiltrar datos. Rol adversarial.",
    },
  ],
  [
    "defender",
    {
      role: "defender",
      autonomy: "assisted",
      capabilities: [],
      systemPrompt:
        "Propón restricciones, políticas de seguridad, tests adversariales.",
    },
  ],
  [
    "auditor",
    {
      role: "auditor",
      autonomy: "assisted",
      capabilities: [],
      systemPrompt:
        "Verifica el modelo de amenazas. Puede bloquear releases. Revisa todos los artefactos.",
    },
  ],
]);
