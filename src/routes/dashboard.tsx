import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Send,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  Circle,
  Clock,
  Play,
  MessageSquare,
  Package,
  Boxes,
  Cog,
  FileCode,
  Gamepad2,
  Settings,
  CreditCard,
  Users,
  BarChart3,
  KeyRound,
  Plug,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — BloxelAI" },
      { name: "description", content: "Build your Roblox games from prompts in the BloxelAI dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const RECENT = [
  "Dragon Obby Adventure",
  "Neon Racing City",
  "Zombie Tycoon RPG",
  "Underwater Explorer",
  "Sky Island Battle",
];

type Message = { role: "user" | "ai"; text: string };
const INITIAL_MESSAGES: Message[] = [
  { role: "user", text: "Make a colorful obby with 10 stages and a dragon boss at the end." },
  {
    role: "ai",
    text: "Love it! I'll build a 10-stage obby with a rising difficulty curve, checkpoint pads, and a dragon boss encounter at stage 10. Generating assets now — you can watch the progress below.",
  },
  { role: "user", text: "Add coins to collect on each stage too." },
  {
    role: "ai",
    text: "Adding a coin pickup system with a global counter, spawn 5 coins per stage, and a leaderboard for high scores. Setting up the environment…",
  },
];

const STEPS = [
  { icon: Package, label: "Generating assets", status: "running" as const },
  { icon: Boxes, label: "Setting up environment", status: "queued" as const },
  { icon: Cog, label: "Importing models", status: "pending" as const },
  { icon: FileCode, label: "Scripting logic", status: "pending" as const },
  { icon: Play, label: "Playtesting", status: "pending" as const },
];

function StatusPill({ status }: { status: "running" | "queued" | "pending" | "done" }) {
  const map = {
    running: { bg: "var(--pastel-violet)", fg: "var(--brand)", icon: Loader2, label: "Running", spin: true },
    queued: { bg: "var(--pastel-amber)", fg: "oklch(0.55 0.16 75)", icon: Clock, label: "Queued", spin: false },
    pending: { bg: "var(--muted)", fg: "var(--muted-foreground)", icon: Circle, label: "Pending", spin: false },
    done: { bg: "var(--pastel-green)", fg: "oklch(0.5 0.18 155)", icon: CheckCircle2, label: "Done", spin: false },
  } as const;
  const s = map[status];
  const Icon = s.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.fg }}
    >
      <Icon className={`w-3 h-3 ${s.spin ? "animate-spin" : ""}`} />
      {s.label}
    </span>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 flex flex-col border-r border-border bg-card h-full">
      <div className="p-5 border-b border-border">
        <Logo />
      </div>
      <div className="p-4">
        <button className="btn-gradient w-full inline-flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-full">
          <Plus className="w-4 h-4" /> New Chat
        </button>
      </div>
      <div className="px-4 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2">
          Recent chats
        </p>
        <ul className="space-y-1">
          {RECENT.map((r, i) => (
            <li key={r}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition truncate ${
                  i === 0 ? "bg-muted font-medium" : "text-muted-foreground"
                }`}
              >
                <MessageSquare className="inline w-3.5 h-3.5 mr-2 opacity-70" />
                {r}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-3 border-t border-border">
        <ProfileMenu />
      </div>
    </aside>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { icon: Settings, label: "General", to: "/settings/general" },
    { icon: Users, label: "Team", to: "/settings/team" },
    { icon: CreditCard, label: "Billing", to: "/settings/billing" },
    { icon: BarChart3, label: "Usage", to: "/settings/usage" },
    { icon: KeyRound, label: "API Keys", to: "/settings/api-keys" },
    { icon: Plug, label: "Integrations", to: "/settings/integrations" },
  ] as const;

  return (
    <div className="relative">
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full mb-2 left-0 right-0 z-30 card-soft p-1.5 shadow-xl">
            {menuItems.map((m) => (
              <Link
                key={m.label}
                to={m.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-muted"
              >
                <m.icon className="w-4 h-4 text-muted-foreground" />
                {m.label}
              </Link>
            ))}
            <div className="my-1 h-px bg-border" />
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-muted text-destructive">
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        </>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
          style={{ background: "var(--gradient-brand)" }}
        >
          AK
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold leading-tight">Alex Kim</p>
          <p className="text-xs text-muted-foreground">Pro plan</p>
        </div>
        <ChevronUp className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}

function AgentActionLog() {
  const [open, setOpen] = useState(true);
  return (
    <div className="card-soft overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-muted/40 transition"
      >
        <div className="flex items-center gap-3">
          <div className="pastel-icon" style={{ background: "var(--pastel-violet)" }}>
            <Cog className="w-4 h-4 text-primary animate-spin-slow" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Agent Action Log</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status="running" />
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      {open && (
        <div className="px-5 py-3 border-t border-border">
          <ul className="space-y-2">
            {STEPS.map((s) => (
              <li key={s.label} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="pastel-icon w-8 h-8" style={{ background: "var(--muted)" }}>
                    <s.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                <StatusPill status={s.status} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ChatMessage({ m }: { m: Message }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[75%] px-4 py-3 rounded-2xl text-sm text-white shadow-brand"
          style={{ background: "var(--gradient-brand)", borderTopRightRadius: "6px" }}
        >
          {m.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%] card-soft px-4 py-3 text-sm text-foreground" style={{ borderTopLeftRadius: "6px" }}>
        {m.text}
      </div>
    </div>
  );
}

function LivePreview() {
  return (
    <div className="card-soft p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-sm">Live Game Preview</p>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "var(--pastel-green)", color: "oklch(0.5 0.18 155)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Live
        </span>
      </div>
      <div
        className="flex-1 rounded-xl relative overflow-hidden flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.95 0.05 295), oklch(0.95 0.05 265)), radial-gradient(circle at 30% 30%, oklch(0.85 0.15 295 / 0.4), transparent 60%)",
        }}
      >
        <div className="text-center px-6">
          <div
            className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-brand)" }}
          >
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <p className="font-semibold">Dragon Obby Adventure</p>
          <p className="text-xs text-muted-foreground mt-1">Building preview…</p>
        </div>
      </div>
      <button className="mt-3 btn-gradient rounded-full py-2 text-sm font-semibold inline-flex items-center justify-center gap-2">
        <Play className="w-4 h-4" /> Playtest
      </button>
    </div>
  );
}

function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input.trim() },
      { role: "ai", text: "Got it — updating the plan and regenerating affected assets." },
    ]);
    setInput("");
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex overflow-hidden">
        <section className="flex-1 flex flex-col border-r border-border min-w-0">
          <header className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Chats</h1>
              <p className="text-xs text-muted-foreground">Dragon Obby Adventure · started 2m ago</p>
            </div>
            <Link to="/settings/integrations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              <Plug className="w-4 h-4" /> Integrations
            </Link>
          </header>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((m, i) => (
              <ChatMessage key={i} m={m} />
            ))}
            <AgentActionLog />
          </div>
          <form onSubmit={send} className="p-4 border-t border-border">
            <div className="card-soft flex items-center gap-2 pl-4 pr-2 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your game…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground py-2"
              />
              <button
                type="submit"
                className="btn-gradient inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
              >
                Send <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </section>
        <aside className="w-[360px] p-4 hidden lg:flex flex-col">
          <LivePreview />
        </aside>
      </main>
    </div>
  );
}
