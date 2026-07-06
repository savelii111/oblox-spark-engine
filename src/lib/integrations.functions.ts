import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type IntegrationSlug = "meshy" | "roblox" | "blender" | "openai" | "anthropic";

export type IntegrationStatus = {
  slug: IntegrationSlug;
  connected: boolean;
  hasKey: boolean;
  maskedKey: string | null;
  lastTestedAt: string | null;
};

function mask(key: string | null | undefined): string | null {
  if (!key) return null;
  if (key.length <= 8) return "•".repeat(key.length);
  return key.slice(0, 4) + "•".repeat(Math.max(4, key.length - 8)) + key.slice(-4);
}

export const listIntegrations = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("integrations")
    .select("slug, api_key, connected, last_tested_at")
    .order("slug");
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Array<{
    slug: string;
    api_key: string | null;
    connected: boolean;
    last_tested_at: string | null;
  }>;
  return rows.map<IntegrationStatus>((r) => ({
    slug: r.slug as IntegrationSlug,
    connected: r.connected,
    hasKey: !!r.api_key,
    maskedKey: mask(r.api_key),
    lastTestedAt: r.last_tested_at,
  }));
});

const SaveSchema = z.object({
  slug: z.enum(["meshy", "roblox", "blender", "openai", "anthropic"]),
  apiKey: z.string().min(1).max(2000),
});

export const saveIntegrationKey = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => SaveSchema.parse(raw))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("integrations")
      .upsert({
        slug: data.slug,
        api_key: data.apiKey,
        connected: false,
        updated_at: new Date().toISOString(),
      });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

async function testMeshy(apiKey: string) {
  // Meshy: hit balance endpoint as a lightweight auth check.
  const res = await fetch("https://api.meshy.ai/openapi/v1/balance", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (res.ok) return { ok: true, detail: "Meshy AI key verified." };
  const text = await res.text().catch(() => "");
  return { ok: false, detail: `Meshy rejected key (${res.status}): ${text.slice(0, 200)}` };
}

async function testOpenAI(apiKey: string) {
  const res = await fetch("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return res.ok
    ? { ok: true, detail: "OpenAI key verified." }
    : { ok: false, detail: `OpenAI rejected key (${res.status}).` };
}

async function testAnthropic(apiKey: string) {
  const res = await fetch("https://api.anthropic.com/v1/models", {
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
  });
  return res.ok
    ? { ok: true, detail: "Anthropic key verified." }
    : { ok: false, detail: `Anthropic rejected key (${res.status}).` };
}

async function testGeneric(apiKey: string, name: string) {
  // Stub: accept any non-empty key that looks reasonable.
  if (apiKey.trim().length < 8) return { ok: false, detail: `${name} key looks too short.` };
  return { ok: true, detail: `${name} credentials stored (stub validation).` };
}

const TestSchema = z.object({
  slug: z.enum(["meshy", "roblox", "blender", "openai", "anthropic"]),
});

export const testIntegration = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => TestSchema.parse(raw))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("integrations")
      .select("api_key")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    const key = (row?.api_key as string | null) ?? null;
    if (!key) return { ok: false, detail: "No API key saved for this integration." };

    let result: { ok: boolean; detail: string };
    switch (data.slug) {
      case "meshy":
        result = await testMeshy(key);
        break;
      case "openai":
        result = await testOpenAI(key);
        break;
      case "anthropic":
        result = await testAnthropic(key);
        break;
      case "roblox":
        result = await testGeneric(key, "Roblox");
        break;
      case "blender":
        result = await testGeneric(key, "Blender Cloud");
        break;
    }

    await supabaseAdmin
      .from("integrations")
      .update({
        connected: result.ok,
        last_tested_at: new Date().toISOString(),
      })
      .eq("slug", data.slug);

    return result;
  });

const MeshyTextTo3DSchema = z.object({
  prompt: z.string().min(3).max(600),
  artStyle: z.enum(["realistic", "sculpture"]).optional(),
});

export const meshyTextTo3D = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => MeshyTextTo3DSchema.parse(raw))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("integrations")
      .select("api_key")
      .eq("slug", "meshy")
      .maybeSingle();
    const key = (row?.api_key as string | null) ?? null;
    if (!key) throw new Error("Meshy AI is not connected. Add your API key in Settings → Integrations.");

    const res = await fetch("https://api.meshy.ai/openapi/v2/text-to-3d", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: "preview",
        prompt: data.prompt,
        art_style: data.artStyle ?? "realistic",
        should_remesh: true,
      }),
    });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      throw new Error(
        `Meshy error ${res.status}: ${JSON.stringify(json).slice(0, 300)}`,
      );
    }
    return { taskId: (json.result as string | undefined) ?? null, raw: json };
  });
