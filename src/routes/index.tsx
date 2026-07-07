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
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed hero image */}
      <img
        src={heroImg}
        alt="Epic voxel dragon Roblox scene"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Cinematic gradient overlays for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.15 0.05 275 / 0.55) 0%, oklch(0.15 0.05 275 / 0.15) 35%, oklch(0.15 0.05 275 / 0.15) 55%, oklch(0.1 0.06 275 / 0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 60%, oklch(0.2 0.15 285 / 0.55), transparent 70%)",
        }}
      />

      <Nav overlay />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 md:pt-48 pb-24 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white">
            <Sparkles className="w-3.5 h-3.5" /> AI Game Creator for Roblox
          </span>
          <h1 className="mt-6 font-display text-white text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-bold leading-[0.9] drop-shadow-[0_6px_30px_rgba(0,0,0,0.4)]">
            Turn a prompt
            <br />
            into a{" "}
            <span className="italic font-serif font-normal tracking-tight bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              Roblox
            </span>{" "}
            game.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-xl leading-relaxed">
            Describe your idea in plain English. BloxelAI builds the world, the assets,
            the scripts and the gameplay — then ships it straight to Roblox.
          </p>

          <div className="mt-10 max-w-2xl">
            <div className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white p-2 pl-4 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
              <Wand2 className="w-5 h-5 text-primary shrink-0" />
              <input
                defaultValue="A dragon battle arena with magic swords and epic loot"
                className="flex-1 bg-transparent outline-none text-[15px] text-foreground placeholder:text-muted-foreground py-2.5"
              />
              <Link
                to="/dashboard"
                className="btn-gradient inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl whitespace-nowrap"
              >
                Generate <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-white/70 pl-1">
              Try: "obby through a candy kingdom" · "tycoon on Mars" · "PvP sword arena"
            </p>
          </div>
        </div>

        {/* Bottom marquee-style stats bar */}
        <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 text-white/80 text-sm border-t border-white/15 pt-6">
          <div className="flex items-center gap-2"><Boxes className="w-4 h-4" /> 12M+ voxel blocks placed</div>
          <div className="flex items-center gap-2"><Gamepad2 className="w-4 h-4" /> 40k+ games shipped</div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4" /> Avg. build time · 90 seconds</div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    icon: MousePointerClick,
    title: "Describe your world",
    desc: "One sentence is enough. A tycoon on Mars, a candy obby, a PvP sword arena — anything you can picture.",
  },
  {
    n: "02",
    icon: Layers,
    title: "AI assembles everything",
    desc: "BloxelAI generates terrain, 3D assets via Meshy, Luau scripts, UI and multiplayer logic in parallel.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Ship straight to Roblox",
    desc: "One click publishes the place. Iterate live — the agent edits scripts and assets while you play.",
  },
] as const;

function Values() {
  return (
    <section id="features" className="relative bg-[oklch(0.16_0.04_275)] text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(500px 300px at 90% 0%, oklch(0.55 0.24 295 / 0.5), transparent), radial-gradient(600px 400px at 0% 100%, oklch(0.5 0.24 265 / 0.4), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="max-w-2xl">
          <span className="inline-flex text-[11px] font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
            The workflow
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[0.95]">
            Three steps.{" "}
            <span className="italic font-serif font-normal bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              No engine
            </span>{" "}
            required.
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative p-8 md:p-10 bg-[oklch(0.16_0.04_275)] hover:bg-[oklch(0.2_0.06_285)] transition group"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif italic text-6xl text-white/20 leading-none">
                  {s.n}
                </span>
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-primary/30 transition">
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="mt-10 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
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
