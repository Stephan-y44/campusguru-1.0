import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Eye,
  Megaphone,
  Plus,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { AppLayout, PageHeading, SampleTag, SectionHeading } from "@/components/campusmind/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin workspace ·  AI" },
      {
        name: "description",
        content: "Review campus announcements, manage events and inspect preview engagement.",
      },
      { property: "og:title", content: "Admin workspace ·  AI" },
      {
        property: "og:description",
        content: "Review campus announcements, manage events and inspect preview engagement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminDashboard,
});

const initialRows = [
  {
    title: "Spring 2027 course registration dates",
    category: "Academic",
    submitted: "Today, 10:18 AM",
    status: "Needs review",
  },
  {
    title: "Innovation Fund applications now open",
    category: "Funding",
    submitted: "Yesterday, 3:42 PM",
    status: "Published",
  },
  {
    title: "Library exam-period hours",
    category: "Facilities",
    submitted: "Nov 3, 2026",
    status: "Published",
  },
  {
    title: "Student research symposium call for papers",
    category: "Academic",
    submitted: "Nov 2, 2026",
    status: "Needs review",
  },
];

function AdminDashboard() {
  const [rows, setRows] = useState(initialRows);
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState({ title: "", content: "" });
  const [document, setDocument] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("All categories");
  const categories = ["All categories", ...Array.from(new Set(rows.map((row) => row.category)))];
  const filtered =
    category === "All categories" ? rows : rows.filter((row) => row.category === category);

  function submitDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) return;
    setRows((items) => [
      {
        title: draft.title,
        category: "Unclassified",
        submitted: "Just now",
        status: "Needs review",
      },
      ...items,
    ]);
    setDraft({ title: "", content: "" });
    setDocument(null);
    setShowForm(false);
    setNotice("Announcement draft added to the preview review queue.");
  }
  function updateStatus(index: number, status: string) {
    setRows((items) =>
      items.map((item, rowIndex) => (rowIndex === index ? { ...item, status } : item)),
    );
    setNotice(
      `Preview status changed to ${status.toLowerCase()}. This does not publish to a live campus feed.`,
    );
  }

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Campus operations"
        title="Admin workspace"
        subtitle="Review announcements, keep events organized, and follow campus engagement."
        action={
          <div className="flex items-center gap-2">
            <SampleTag />
            <Button
              onClick={() => setShowForm((value) => !value)}
              size="sm"
              className="h-9 text-[11px]"
            >
              <Plus className="size-3.5" />
              New announcement
            </Button>
          </div>
        }
      />
      {notice && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-sm border border-primary/25 bg-primary/5 px-3 py-2 text-[10px] text-muted-foreground">
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss notice">
            <X className="size-3.5" />
          </button>
        </div>
      )}
      {showForm && (
        <Card className="mb-7 border-primary/30 bg-card/80 shadow-none">
          <CardContent className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold">Create announcement draft</h2>
              <button onClick={() => setShowForm(false)} aria-label="Close form">
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
            <form onSubmit={submitDraft} className="grid gap-3 md:grid-cols-2">
              <label className="text-[10px] text-muted-foreground">
                Announcement title
                <input
                  required
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  className="mt-1.5 h-9 w-full rounded-sm border border-input bg-background px-3 text-xs text-foreground"
                  placeholder="Add a clear title"
                />
              </label>
              <label className="text-[10px] text-muted-foreground">
                Announcement details
                <textarea
                  required
                  value={draft.content}
                  onChange={(event) => setDraft({ ...draft, content: event.target.value })}
                  className="mt-1.5 min-h-[82px] w-full rounded-sm border border-input bg-background px-3 py-2 text-xs text-foreground"
                  placeholder="Add the full announcement text"
                />
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-dashed border-border p-3 text-[10px] text-muted-foreground md:col-span-2">
                <Upload className="size-4 text-primary" />
                <span>
                  {document ? document.name : "Attach a document for administrator review"}
                </span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(event) => setDocument(event.target.files?.[0] ?? null)}
                />
              </label>
              <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                <Button size="sm" type="submit" className="h-8 text-[10px]">
                  Add to review queue
                </Button>
                <span className="text-[9px] text-muted-foreground">
                  Preview only · document content is not extracted
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={<Megaphone className="size-4" />}
          label="Announcements this month"
          value="24"
          change="8 awaiting review"
        />
        <Metric
          icon={<Eye className="size-4" />}
          label="Total announcement views"
          value="1,842"
          change="Across sample records"
        />
        <Metric
          icon={<Users className="size-4" />}
          label="Student reach"
          value="68%"
          change="Preview estimate"
        />
        <Metric
          icon={<CalendarDays className="size-4" />}
          label="Upcoming campus events"
          value="12"
          change="Next 30 days"
        />
      </section>
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.6fr)_minmax(290px,0.8fr)]">
        <section>
          <SectionHeading
            title="Announcement review"
            action={
              <span className="text-[10px] text-muted-foreground">{filtered.length} records</span>
            }
          />
          <Card className="overflow-hidden border-border/80 bg-card/55 shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-4 py-3">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-sm border px-2 py-1 text-[9px] ${category === item ? "border-primary/35 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <span className="text-[9px] text-muted-foreground">Preview records</span>
            </div>
            <div className="divide-y divide-border/60">
              {filtered.map((row) => {
                const index = rows.indexOf(row);
                return (
                  <div
                    key={row.title}
                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[11px] font-medium">{row.title}</p>
                        <Badge
                          variant="outline"
                          className="rounded-sm border-border px-1.5 py-0 text-[8px] font-normal"
                        >
                          {row.category}
                        </Badge>
                      </div>
                      <p className="mt-1.5 text-[9px] text-muted-foreground">
                        Submitted {row.submitted}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 sm:justify-end">
                      <span
                        className={`rounded-sm px-2 py-1 text-[9px] ${row.status === "Published" ? "bg-teal-400/10 text-teal-300" : "bg-amber-300/10 text-amber-200"}`}
                      >
                        {row.status}
                      </span>
                      {row.status === "Needs review" && (
                        <>
                          <Button
                            onClick={() => updateStatus(index, "Published")}
                            size="icon"
                            variant="ghost"
                            className="size-7 text-teal-300"
                            aria-label={`Approve ${row.title}`}
                          >
                            <Check className="size-3.5" />
                          </Button>
                          <Button
                            onClick={() => updateStatus(index, "Needs changes")}
                            size="icon"
                            variant="ghost"
                            className="size-7 text-muted-foreground"
                            aria-label={`Request changes for ${row.title}`}
                          >
                            <X className="size-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>
        <aside className="space-y-7">
          <section>
            <SectionHeading
              title="Campus event calendar"
              action={
                <Link to="/intelligence" className="text-[10px] text-primary">
                  Manage <ArrowRight className="ml-1 inline size-3" />
                </Link>
              }
            />
            <Card className="border-border/80 bg-card/55 shadow-none">
              <CardContent className="divide-y divide-border/60 p-0">
                <AdminEvent
                  day="06 Nov"
                  title="Future of Tech: Alumni Panel"
                  meta="16:00 · Innovation Hub"
                />
                <AdminEvent
                  day="07 Nov"
                  title="Nairobi Green Campus Walk"
                  meta="08:30 · Student Centre"
                />
                <AdminEvent
                  day="10 Nov"
                  title="Designing for accessibility"
                  meta="14:00 · Library Media Lab"
                />
              </CardContent>
            </Card>
          </section>
          <section>
            <SectionHeading title="Announcement categories" />
            <div className="space-y-3">
              {[
                { name: "Academic", count: 12, share: 46, color: "bg-primary" },
                { name: "Student life", count: 8, share: 31, color: "bg-teal-400" },
                { name: "Facilities", count: 4, share: 15, color: "bg-amber-300" },
                { name: "Funding", count: 2, share: 8, color: "bg-rose-400" },
              ].map((item) => (
                <div key={item.name}>
                  <div className="mb-1.5 flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-2">
                      <span className={`size-1.5 rounded-full ${item.color}`} />
                      {item.name}
                    </span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-1 rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Card className="border-border/80 bg-card/55 shadow-none">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="grid size-8 place-items-center rounded-sm bg-secondary">
                <Activity className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-medium">Engagement snapshot</p>
                <p className="mt-1 text-[10px] leading-5 text-muted-foreground">
                  Student views and reach are illustrative preview totals, not live analytics.
                </p>
                <p className="mt-2 flex items-center gap-1 text-[10px] text-teal-300">
                  <ArrowUpRight className="size-3" />
                  +12% sample week-over-week
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppLayout>
  );
}

function Metric({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <Card className="border-border/80 bg-card/60 shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground">{label}</p>
          <span className="text-primary">{icon}</span>
        </div>
        <p className="mt-3 font-display text-[23px] font-semibold">{value}</p>
        <p className="mt-1 text-[9px] text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}
function AdminEvent({ day, title, meta }: { day: string; title: string; meta: string }) {
  return (
    <div className="flex gap-3 p-3.5">
      <span className="w-11 shrink-0 pt-0.5 text-[9px] font-medium text-primary">{day}</span>
      <div>
        <p className="text-[10px] font-medium">{title}</p>
        <p className="mt-1 text-[9px] text-muted-foreground">{meta}</p>
      </div>
    </div>
  );
}
