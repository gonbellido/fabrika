import type { FeatureFlag } from "./types.js";

/**
 * Gestor de feature flags para el publishing engine.
 * Permite activar/desactivar componentes por flag y hacer rollout gradual.
 */
export class FlagManager {
  private flags: Map<string, FeatureFlag> = new Map();

  register(flag: FeatureFlag) {
    this.flags.set(flag.key, flag);
  }

  /** Evalúa si un flag está activo para un request (basado en rollout %) */
  evaluate(key: string, userId?: string): boolean {
    const flag = this.flags.get(key);
    if (!flag) return false;
    if (!flag.enabled) return false;

    if (flag.rollout < 100 && userId) {
      // Deterministic rollout basado en hash del userId
      const bucket = this.hashBucket(userId);
      return bucket < flag.rollout;
    }

    return flag.rollout === 100;
  }

  /** Verifica si un componente específico debe mostrarse */
  isComponentVisible(componentLabel: string): boolean {
    for (const flag of this.flags.values()) {
      if (flag.targets.includes(componentLabel) && !flag.enabled) {
        return false;
      }
    }
    return true;
  }

  /** Lista todos los flags activos */
  getActive(): FeatureFlag[] {
    return Array.from(this.flags.values());
  }

  /** Hash simple para rollout determinístico */
  private hashBucket(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash) % 100;
  }
}
