import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Wand2,
  Code2,
  Rocket,
  Star,
  ArrowRight,
  Zap,
  Clock,
  Sliders,
  TrendingUp,
} from "lucide-react";
import heroImg from "@/assets/hero-voxel.jpg";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How It Works</a>
          <a href="#examples" className="hover:text-foreground">Examples</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#docs" className="hover:text-foreground">Docs</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full text-foreground hover:bg-muted"
          >
            Log in
          </Link>
          <Link
            to="/dashboard"
            className="btn-gradient inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Start Building Free
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
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border">
            <Sparkles className="w-3.5 h-3.5" /> AI Game Creator for Roblox
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Turn Any Prompt Into a{" "}
            <span className="text-gradient">Roblox Game</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Describe your idea in plain English. BloxelAI generates the world, assets,
            scripts and gameplay — then publishes straight to Roblox. No engine skills
            needed.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              to="/dashboard"
              className="btn-gradient inline-flex items-center gap-2 text-base font-semibold px-7 py-3.5 rounded-full"
            >
              Start Building Free <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#a78bfa", "#f0abfc", "#93c5fd", "#86efac", "#fde68a"].map((c) => (
                  <span
                    key={c}
                    className="w-8 h-8 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Loved by 20,000+ creators</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden card-soft p-4">
            <img
              src={heroImg}
              alt="Voxel Roblox game illustration"
              width={1408}
              height={1200}
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute left-6 -bottom-6 md:left-10 md:-bottom-8 right-6 md:right-10">
              <div className="card-soft bg-background/95 backdrop-blur px-4 py-3 flex items-center gap-3 rounded-2xl shadow-lg">
                <div className="pastel-icon" style={{ background: "var(--pastel-violet)" }}>
                  <Wand2 className="w-4 h-4 text-primary" />
                </div>
                <input
                  disabled
                  placeholder="Describe your game… e.g. an obby with dragons"
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button className="btn-gradient text-xs font-semibold px-4 py-2 rounded-full">
                  Generate
                </button>
              </div>
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
