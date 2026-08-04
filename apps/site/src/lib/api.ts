import type { ComponentDSL } from "@fabrika/dsl";

const API_BASE = process.env["CORE_API_URL"] ?? "http://localhost:3000/api";

export interface SitePage {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  dsl: ComponentDSL;
  state: string;
  version: number;
}

export async function fetchPages(siteId: string): Promise<SitePage[]> {
  try {
    const res = await fetch(`${API_BASE}/sites/${siteId}/pages`);
    if (!res.ok) return [];
    return (await res.json()) as SitePage[];
  } catch {
    return [];
  }
}

export async function fetchPage(
  siteId: string,
  pageId: string,
): Promise<SitePage | null> {
  try {
    const res = await fetch(
      `${API_BASE}/sites/${siteId}/pages/${pageId}`,
    );
    if (!res.ok) return null;
    return (await res.json()) as SitePage;
  } catch {
    return null;
  }
}
