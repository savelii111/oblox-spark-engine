import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Box,
  Cpu,
  Palette,
  Sparkles,
  Bot,
} from "lucide-react";
import {
  listIntegrations,
  saveIntegrationKey,
  testIntegration,
  type IntegrationSlug,
  type IntegrationStatus,
} from "@/lib/integrations.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — BloxelAI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: async () => {
    return await listIntegrations();
  },
  component: IntegrationsPage,
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-destructive">Failed to load: {error.message}</div>
  ),
});

type Meta = {
  slug: IntegrationSlug;
  name: string;
  description: string;
  icon: React.ElementType;
  tone: string;
  fg: string;
  placeholder: string;
};

const META: Meta[] = [
  {
    slug: "meshy",
    name: "Meshy AI",
    description: "Text-to-3D asset generation for characters, props and terrain.",
    icon: Box,
    tone: "var(--pastel-violet)",
    fg: "var(--brand)",
    placeholder: "msy-••••••••••••••••",
  },
  {
    slug: "roblox",
    name: "Roblox",
    description: "Publish and update your generated games directly to Roblox.",
    icon: Cpu,
    tone: "var(--pastel-pink)",
    fg: "oklch(0.55 0.2 350)",
    placeholder: "roblox-oauth-token",
  },
  {
    slug: "blender",
    name: "Blender Cloud",
    description: "Import and refine models with cloud-hosted Blender rendering.",
    icon: Palette,
    tone: "var(--pastel-amber)",
    fg: "oklch(0.55 0.16 75)",
    placeholder: "blender-cloud-key",
  },
  {
    slug: "openai",
    name: "OpenAI",
    description: "GPT-powered scripting and dialogue generation for NPCs.",
    icon: Sparkles,
    tone: "var(--pastel-green)",
    fg: "oklch(0.5 0.18 155)",
    placeholder: "sk-••••••••••••••••",
  },
  {
    slug: "anthropic",
    name: "Anthropic",
    description: "Claude-powered narrative design and multi-step game reasoning.",
    icon: Bot,
    tone: "var(--pastel-blue)",
    fg: "oklch(0.5 0.2 240)",
    placeholder: "sk-ant-••••••••••••••••",
  },
];

function IntegrationCard({
  meta,
  status,
}: {
  meta: Meta;
  status: IntegrationStatus | undefined;
}) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const qc = useQueryClient();
  const router = useRouter();

  const saveFn = useServerFn(saveIntegrationKey);
  const testFn = useServerFn(testIntegration);

  const save = useMutation({
    mutationFn: (apiKey: string) => saveFn({ data: { slug: meta.slug, apiKey } }),
    onSuccess: async () => {
      toast.success(`${meta.name} key saved`);
      setValue("");
      await router.invalidate();
      qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const test = useMutation({
    mutationFn: () => testFn({ data: { slug: meta.slug } }),
    onSuccess: async (res) => {
      if (res.ok) toast.success(`${meta.name}: ${res.detail}`);
      else toast.error(`${meta.name}: ${res.detail}`);
      await router.invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const Icon = meta.icon;
  const connected = status?.connected ?? false;
  const hasKey = status?.hasKey ?? false;
  const displayed = value
    ? show
      ? value
      : "•".repeat(Math.min(value.length, 24))
    : hasKey && status?.maskedKey
      ? status.maskedKey
      : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      toast.error("Enter an API key first");
      return;
    }
    await save.mutateAsync(value.trim());
    await test.mutateAsync();
  }

  return (
    <div className="card-soft p-5 md:p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4 min-w-0">
          <div className="pastel-icon shrink-0" style={{ background: meta.tone }}>
            <Icon className="w-5 h-5" style={{ color: meta.fg }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base">{meta.name}</h3>
              {connected ? (
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: "var(--pastel-green)", color: "oklch(0.5 0.18 155)" }}
                >
                  <CheckCircle2 className="w-3 h-3" /> Connected
                </span>
              ) : hasKey ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                  Key saved — not verified
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                  Not connected
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{meta.description}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid md:grid-cols-[1fr_auto] gap-3 items-center">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            API Key
          </label>
          <div className="flex items-center gap-2 rounded-full border border-border bg-background pl-4 pr-1.5 py-1.5">
            <input
              type={show ? "text" : "password"}
              value={value || (hasKey && !show ? "" : value)}
              onChange={(e) => setValue(e.target.value)}
              placeholder={hasKey ? displayed : meta.placeholder}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="p-2 rounded-full hover:bg-muted text-muted-foreground"
              aria-label={show ? "Hide key" : "Show key"}
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-end gap-2 md:pt-6">
          <button
            type="submit"
            disabled={save.isPending || test.isPending}
            className="btn-gradient inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full disabled:opacity-60"
          >
            {(save.isPending || test.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
            {save.isPending ? "Saving…" : test.isPending ? "Testing…" : "Test"}
          </button>
        </div>
      </form>
    </div>
  );
}

function IntegrationsPage() {
  const data = Route.useLoaderData();
  const statusBySlug = new Map(data.map((d) => [d.slug, d]));

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground mt-2">
          Connect the AI providers and tools BloxelAI uses to build your Roblox games. Your keys are stored
          securely on the server and are never exposed to the browser.
        </p>
      </div>

      <div className="space-y-4">
        {META.map((m) => (
          <IntegrationCard key={m.slug} meta={m} status={statusBySlug.get(m.slug)} />
        ))}
      </div>

      <div
        className="mt-10 card-soft p-5 flex items-start gap-4"
        style={{ background: "var(--pastel-green)", borderColor: "transparent" }}
      >
        <ShieldCheck className="w-6 h-6 shrink-0" style={{ color: "oklch(0.4 0.15 155)" }} />
        <div>
          <p className="font-semibold" style={{ color: "oklch(0.3 0.12 155)" }}>
            Your data is secure
          </p>
          <p className="text-sm" style={{ color: "oklch(0.35 0.1 155)" }}>
            API keys are encrypted at rest and only accessible from BloxelAI's server. The UI shows a masked
            preview so keys are never leaked in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
