import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2">
        This section is part of the BloxelAI settings suite.
      </p>
      <div
        className="mt-8 card-soft p-10 flex flex-col items-center text-center"
        style={{ background: "var(--pastel-violet)" }}
      >
        <div className="pastel-icon mb-4" style={{ background: "white" }}>
          <Construction className="w-5 h-5" style={{ color: "var(--brand)" }} />
        </div>
        <p className="font-semibold">Coming soon</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          {title} is on the roadmap. Head to <span className="font-semibold text-foreground">Integrations</span> to
          connect Meshy AI, OpenAI, Anthropic, Roblox and Blender Cloud right now.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/settings/general")({
  component: () => <Placeholder title="General" />,
});
