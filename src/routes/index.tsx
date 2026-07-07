import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Wand2,
  Code2,
  Rocket,
  ArrowRight,
  Zap,
  Clock,
  Sliders,
  TrendingUp,
  MousePointerClick,
  Layers,
  Gamepad2,
  Boxes,
} from "lucide-react";
import heroImg from "@/assets/hero-voxel.jpg";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function Nav({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={
        overlay
          ? "absolute top-0 inset-x-0 z-40"
          : "sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border"
      }
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <div className={overlay ? "text-white [&_*]:!text-white" : ""}>
          <Logo />
        </div>
        <nav
          className={`hidden md:flex items-center gap-8 text-sm font-medium ${
            overlay ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          <a href="#features" className={overlay ? "hover:text-white" : "hover:text-foreground"}>Features</a>
          <a href="#how" className={overlay ? "hover:text-white" : "hover:text-foreground"}>How It Works</a>
          <a href="#examples" className={overlay ? "hover:text-white" : "hover:text-foreground"}>Examples</a>
          <a href="#pricing" className={overlay ? "hover:text-white" : "hover:text-foreground"}>Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className={`hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full ${
              overlay ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
            }`}
          >
            Log in
          </Link>
          <Link
            to="/dashboard"
            className="btn-gradient inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 15% 0%, oklch(0.97 0.05 295), transparent), radial-gradient(500px 300px at 85% 10%, oklch(0.97 0.05 265), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-28 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-5 relative z-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border">
            <Sparkles className="w-3.5 h-3.5" /> AI Game Creator for Roblox
          </span>
          <h1 className="mt-6 font-display text-[3.25rem] md:text-[4.25rem] lg:text-[5.25rem] font-bold leading-[0.95]">
            Turn a prompt
            <br />
            into a{" "}
            <span className="italic font-serif font-normal text-gradient tracking-tight">
              Roblox
            </span>{" "}
            game.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Describe your idea in plain English. BloxelAI builds the world, the assets,
            the scripts and the gameplay — then ships it straight to Roblox.
          </p>

          <div className="mt-8 max-w-xl">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-white p-2 pl-4 shadow-[0_10px_40px_-12px_rgba(124,58,237,0.35)]">
              <Wand2 className="w-5 h-5 text-primary shrink-0" />
              <input
                defaultValue="A dragon battle arena with magic swords and epic loot"
                className="flex-1 bg-transparent outline-none text-[15px] text-foreground placeholder:text-muted-foreground py-2"
              />
              <Link
                to="/dashboard"
                className="btn-gradient inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl whitespace-nowrap"
              >
                Generate <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground pl-1">
              Try: "obby through a candy kingdom" · "tycoon on Mars" · "PvP sword arena"
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 relative">
          <div
            className="absolute -inset-8 -z-10 rounded-[2.5rem] blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, oklch(0.75 0.2 295 / 0.55), transparent 70%)",
            }}
          />
          <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-[0_30px_80px_-20px_rgba(76,29,149,0.35)]">
            <img
              src={heroImg}
              alt="Epic voxel dragon Roblox scene"
              width={1536}
              height={1280}
              className="w-full h-auto block"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur border border-border">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium">Generating scene…</span>
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur border border-border text-xs font-medium">
              Dragon Arena · v1
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const VALUE_CARDS = [
  {
    icon: Wand2,
    title: "AI Game Generation",
    desc: "Turn a single sentence into a complete Roblox place with terrain, logic and characters.",
    tone: "var(--pastel-violet)",
    fg: "var(--brand)",
  },
  {
    icon: Sparkles,
    title: "Automatic Assets",
    desc: "Meshy-powered text-to-3D produces props, characters and vehicles on demand.",
    tone: "var(--pastel-pink)",
    fg: "oklch(0.55 0.2 350)",
  },
  {
    icon: Code2,
    title: "Smart Scripting",
    desc: "Clean Luau scripts for movement, scoring, UI and multiplayer — ready to tweak.",
    tone: "var(--pastel-blue)",
    fg: "oklch(0.5 0.2 240)",
  },
  {
    icon: Rocket,
    title: "One-Click Publish",
    desc: "Deploy straight to Roblox with one click. Iterate live from your dashboard.",
    tone: "var(--pastel-green)",
    fg: "oklch(0.5 0.18 155)",
  },
] as const;

function Values() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {VALUE_CARDS.map((c) => (
          <div key={c.title} className="card-soft p-6 hover:shadow-lg transition">
            <div className="pastel-icon" style={{ background: c.tone }}>
              <c.icon className="w-5 h-5" style={{ color: c.fg }} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const CHIPS = [
  { icon: Zap, label: "Beginner Friendly" },
  { icon: Clock, label: "Save Hours of Work" },
  { icon: Sliders, label: "Full Creative Control" },
  { icon: TrendingUp, label: "Always Improving" },
] as const;

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-4xl px-6 py-24 text-center">
      <span className="inline-flex text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border">
        Workflow
      </span>
      <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
        From Idea to Roblox in <span className="text-gradient">Minutes</span>
      </h2>
      <p className="mt-4 text-muted-foreground text-lg">
        Skip weeks of setup. Focus on the fun. BloxelAI handles the heavy lifting.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {CHIPS.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium"
          >
            <c.icon className="w-4 h-4 text-primary" /> {c.label}
          </span>
        ))}
      </div>
      <div className="mt-12">
        <Link
          to="/dashboard"
          className="btn-gradient inline-flex items-center gap-2 text-base font-semibold px-7 py-3.5 rounded-full"
        >
          Try BloxelAI Free <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BloxelAI. Made for creators.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Values />
      <HowItWorks />
      <Footer />
    </div>
  );
}
