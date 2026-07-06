import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Settings as SettingsIcon,
  Users,
  CreditCard,
  BarChart3,
  KeyRound,
  Webhook,
  Plug,
  ScrollText,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — BloxelAI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsLayout,
});

const NAV = [
  { to: "/settings/general", icon: SettingsIcon, label: "General" },
  { to: "/settings/team", icon: Users, label: "Team" },
  { to: "/settings/billing", icon: CreditCard, label: "Billing" },
  { to: "/settings/usage", icon: BarChart3, label: "Usage" },
  { to: "/settings/api-keys", icon: KeyRound, label: "API Keys" },
  { to: "/settings/webhooks", icon: Webhook, label: "Webhooks" },
  { to: "/settings/integrations", icon: Plug, label: "Integrations" },
  { to: "/settings/audit-logs", icon: ScrollText, label: "Audit Logs" },
] as const;

function SettingsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-72 border-r border-border bg-card flex flex-col">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <Logo />
        </div>
        <div className="p-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to app
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2">
            Settings
          </p>
          <nav className="space-y-1">
            {NAV.map((n) => {
              const active = pathname === n.to || (pathname === "/settings" && n.to === "/settings/general");
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    active
                      ? "bg-accent text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <n.icon className="w-4 h-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
