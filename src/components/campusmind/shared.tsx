import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Search,
  Settings2,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import campusMark from "@/assets/campusmind-mark.png";
import { Button } from "@/components/ui/button";

const navigation = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/assistant", label: "Campus assistant", icon: MessageCircle },
  { to: "/intelligence", label: "Announcement intelligence", icon: Compass },
  { to: "/admin", label: "Admin workspace", icon: ShieldCheck },
  { to: "/profile", label: "Student profile", icon: UserRound },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const current = navigation.find((item) => item.to === path)?.label ?? "Overview";

  return (
    <div className="app-shell min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[256px] flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <Link
          to="/"
          className="flex h-[76px] items-center gap-3 border-b border-sidebar-border px-6"
          aria-label=" AI overview"
        >
          <img src={campusMark} alt="" width={40} height={40} className="size-10 object-contain" />
          <span className="font-display text-[17px] font-semibold text-sidebar-foreground">
            {" "}
            <span className="text-primary">AI</span>
          </span>
        </Link>
        <div className="px-4 pt-7">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
            Campus workspace
          </p>
          <nav className="space-y-1" aria-label="Main navigation">
            {navigation.map(({ to, label, icon: Icon }) => {
              const active = path === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-10 items-center gap-3 rounded-md px-3 text-[13px] transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"}`}
                >
                  <Icon
                    className={`size-[17px] ${active ? "text-primary" : ""}`}
                    strokeWidth={1.8}
                  />
                  <span>{label}</span>
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto px-4 pb-5">
          <div className="rounded-md border border-sidebar-border bg-sidebar-accent/35 p-3.5">
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="size-1.5 rounded-full bg-emerald-400" /> University network
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">Sample campus workspace</p>
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-2 pt-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-accent text-xs font-semibold text-accent-foreground">
              SC
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium">Stephany Chemutai</p>
              <p className="text-[10px] text-muted-foreground">Student account</p>
            </div>
            <Settings2 className="size-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-background/75" onClick={() => setMenuOpen(false)} />
          <aside className="relative flex w-[290px] max-w-[88vw] flex-col border-r border-sidebar-border bg-sidebar">
            <div className="flex h-[72px] items-center justify-between border-b border-sidebar-border px-5">
              <Link to="/" className="flex items-center gap-2.5">
                <img src={campusMark} alt="" width={36} height={36} className="size-9" />
                <span className="font-display text-base font-semibold">
                  {" "}
                  <span className="text-primary">AI</span>
                </span>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X />
              </Button>
            </div>
            <nav className="space-y-1 p-4" aria-label="Mobile navigation">
              {navigation.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm ${path === to ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent"}`}
                >
                  <Icon className="size-[17px]" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-sidebar-border p-5 text-xs text-muted-foreground">
              Sample campus workspace
            </div>
          </aside>
        </div>
      )}

      <div className="lg:pl-[256px]">
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between gap-4 border-b border-border/70 bg-background/90 px-4 backdrop-blur-lg sm:px-7 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu />
            </Button>
            <div className="hidden items-center gap-2 text-[11px] text-muted-foreground sm:flex">
              <span>Campus</span>
              <span className="text-border">/</span>
              <span className="text-foreground">{current}</span>
            </div>
            <Link to="/" className="flex items-center gap-2 sm:hidden">
              <img src={campusMark} alt="" width={28} height={28} className="size-7" />
              <span className="font-display text-sm font-semibold"></span>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden h-9 w-[min(22vw,245px)] items-center gap-2 rounded-md border border-input bg-card px-3 md:flex">
              <Search className="size-3.5 text-muted-foreground" />
              <span className="flex-1 text-[11px] text-muted-foreground">Search campus...</span>
              <kbd className="rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                ⌘ K
              </kbd>
            </div>
            <Button size="icon" variant="ghost" aria-label="Notifications" className="relative">
              <Bell className="size-[17px]" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
            </Button>
            <div className="hidden h-7 border-l border-border sm:block" />
            <button className="flex items-center gap-2" aria-label="Account menu">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                SC
              </span>
              <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
            </button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1500px] px-4 pb-12 pt-7 sm:px-7 sm:pt-9 lg:px-10 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
          {eyebrow}
        </p>
        <h1 className="page-title text-[27px] font-semibold leading-tight sm:text-[31px]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted-foreground">{subtitle}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function SectionHeading({
  title,
  action,
  icon,
}: {
  title: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-[14px] font-semibold">
        {icon}
        <span>{title}</span>
      </h2>
      {action}
    </div>
  );
}

export function SampleTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-secondary/70 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.09em] text-muted-foreground">
      <span className="size-1 rounded-full bg-primary" />
      Preview data
    </span>
  );
}

export function Trend({ value, positive = true }: { value: string; positive?: boolean }) {
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`inline-flex items-center text-[10px] ${positive ? "text-emerald-400" : "text-amber-300"}`}
    >
      <Icon className="mr-0.5 size-3" />
      {value}
    </span>
  );
}

export const navIcons = { BookOpen, CalendarDays, ClipboardCheck, MessageCircle };
