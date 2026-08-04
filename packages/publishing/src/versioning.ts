import type { PublishResult, RollbackTarget, PageToPublish } from "./types.js";

/**
 * Gestor de versionado para el publishing engine.
 * Mantiene historial de versiones publicadas y permite rollback.
 */
export class VersionManager {
  private history: Map<string, PublishResult[]> = new Map();

  /** Registra una nueva publicación */
  record(page: PageToPublish, result: PublishResult) {
    const versions = this.history.get(page.id) ?? [];
    versions.push(result);
    this.history.set(page.id, versions);
  }

  /** Obtiene todas las versiones publicadas de una página */
  getVersions(pageId: string): PublishResult[] {
    return this.history.get(pageId) ?? [];
  }

  /** Obtiene una versión específica */
  getVersion(pageId: string, version: number): PublishResult | undefined {
    return this.history.get(pageId)?.find((v) => v.version === version);
  }

  /** Obtiene la última versión publicada */
  getLatest(pageId: string): PublishResult | undefined {
    const versions = this.history.get(pageId);
    if (!versions || versions.length === 0) return undefined;
    return versions[versions.length - 1];
  }

  /** Crea un plan de rollback */
  planRollback(target: RollbackTarget): {
    current: PublishResult;
    target: PublishResult;
    diff: { versionDelta: number };
    risk: "low" | "medium" | "high";
  } | null {
    const current = this.getLatest(target.pageId);
    const targetVersion = this.getVersion(target.pageId, target.toVersion);
    if (!current || !targetVersion) return null;

    const versionDelta = current.version - targetVersion.version;

    return {
      current,
      target: targetVersion,
      diff: { versionDelta },
      risk: versionDelta > 3 ? "high" : versionDelta > 1 ? "medium" : "low",
    };
  }
}
