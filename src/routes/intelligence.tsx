import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  FileText,
  Info,
  Plus,
  ShieldCheck,
  Sparkles,
  Tag,
  Upload,
  X,
} from "lucide-react";
import { AppLayout, PageHeading, SampleTag, SectionHeading } from "@/components/campusmind/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "Announcement intelligence ·  AI" },
      {
        name: "description",
        content:
          "Submit campus announcements and review sample classifications and extracted dates.",
      },
      { property: "og:title", content: "Announcement intelligence ·  AI" },
      {
        property: "og:description",
        content:
          "Submit campus announcements and review sample classifications and extracted dates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnnouncementIntelligence,
});

const initialQueue = [
  {
    title: "Spring 2027 course registration",
    category: "Academic",
    confidence: "94%",
    dates: "Nov 12 – Dec 4, 2026",
    status: "Pending",
  },
  {
    title: "Student Innovation Fund applications",
    category: "Funding",
    confidence: "88%",
    dates: "Deadline: Nov 20, 2026",
    status: "Pending",
  },
  {
    title: "Extended library hours",
    category: "Facilities",
    confidence: "91%",
    dates: "Nov 16 – Dec 18, 2026",
    status: "Approved",
  },
];

function AnnouncementIntelligence() {
  const [queue, setQueue] = useState(initialQueue);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setQueue((items) => [
      {
        title,
        category: "Needs classification",
        confidence: "—",
        dates: "No dates extracted",
        status: "Pending",
      },
      ...items,
    ]);
    setSelected(0);
    setTitle("");
    setContent("");
    setFile(null);
    setNotice(
      "Added to preview review queue. No AI classification or document extraction was run.",
    );
  }
  function decide(status: string) {
    setQueue((items) =>
      items.map((item, index) => (index === selected ? { ...item, status } : item)),
    );
    setReviewMessage(
      `Preview item marked ${status.toLowerCase()}. No live announcement was published.`,
    );
  }

  const active = queue[selected];
  return (
    <AppLayout>
      <PageHeading
        eyebrow="Content review tools"
        title="Announcement intelligence"
        subtitle="Review category suggestions and dates before administrators approve a campus update."
        action={<SampleTag />}
      />
      {notice && (
        <div className="mb-5 flex items-start justify-between gap-3 rounded-sm border border-amber-300/25 bg-amber-300/5 px-3 py-2.5 text-[10px] leading-5 text-muted-foreground">
          <span className="flex gap-2">
            <Info className="mt-1 size-3.5 shrink-0 text-amber-300" />
            {notice}
          </span>
          <button aria-label="Dismiss notice" onClick={() => setNotice("")}>
            <X className="size-3.5" />
          </button>
        </div>
      )}
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section>
          <SectionHeading title="Submit an announcement" />
          <Card className="border-border/80 bg-card/60 shadow-none">
            <CardContent className="p-4 sm:p-5">
              <form onSubmit={submit} className="space-y-4">
                <label className="block text-[10px] font-medium text-muted-foreground">
                  Announcement title
                  <input
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="mt-1.5 h-10 w-full rounded-sm border border-input bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground"
                    placeholder="e.g. Spring course registration dates"
                  />
                </label>
                <label className="block text-[10px] font-medium text-muted-foreground">
                  Announcement text
                  <textarea
                    required
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="mt-1.5 min-h-[170px] w-full resize-y rounded-sm border border-input bg-background px-3 py-2.5 text-xs leading-5 text-foreground placeholder:text-muted-foreground"
                    placeholder="Paste the official announcement text here…"
                  />
                </label>
                <label className="flex min-h-[74px] cursor-pointer items-center gap-3 rounded-sm border border-dashed border-border bg-secondary/25 px-4">
                  <div className="grid size-8 place-items-center rounded-sm bg-secondary">
                    <Upload className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium">
                      {file ? file.name : "Attach a campus document"}
                    </p>
                    <p className="mt-1 text-[9px] text-muted-foreground">
                      PDF, DOCX or TXT · preview attachment only
                    </p>
                  </div>
                  <input
                    className="sr-only"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  />
                </label>
                <div className="flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                    <AlertCircle className="size-3 text-amber-300" />
                    AI classification is not connected
                  </span>
                  <Button type="submit" className="h-9 text-[10px]">
                    <Plus className="size-3.5" />
                    Add for review
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="mt-4 flex gap-3 rounded-sm border border-border/70 bg-secondary/20 p-3.5">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-[10px] leading-5 text-muted-foreground">
              Only an administrator can approve content for publication. Sample category and date
              values are illustrative and must be confirmed against the original announcement.
            </p>
          </div>
        </section>

        <section className="space-y-7">
          <div>
            <SectionHeading
              title="Review queue"
              action={
                <span className="text-[9px] text-muted-foreground">
                  {queue.filter((item) => item.status === "Pending").length} awaiting review
                </span>
              }
            />
            <Card className="border-border/80 bg-card/50 shadow-none">
              <CardContent className="divide-y divide-border/60 p-0">
                {queue.map((item, index) => (
                  <button
                    key={`${item.title}-${index}`}
                    onClick={() => {
                      setSelected(index);
                      setReviewMessage("");
                    }}
                    className={`flex w-full items-start gap-3 p-4 text-left transition-colors ${selected === index ? "bg-accent/40" : "hover:bg-secondary/30"}`}
                  >
                    <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-sm border border-border bg-secondary/55">
                      <FileText className="size-3.5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[11px] font-medium leading-4">{item.title}</p>
                      <p className="mt-1.5 text-[9px] text-muted-foreground">
                        {item.category} <span className="mx-1">·</span> {item.status}
                      </p>
                    </div>
                    <ArrowRight
                      className={`mt-2 size-3 shrink-0 ${selected === index ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {active && (
            <div>
              <SectionHeading
                title="Classification review"
                icon={<Sparkles className="size-3.5 text-primary" />}
              />
              <Card className="border-primary/25 bg-card/65 shadow-none">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="max-w-[75%]">
                      <Badge
                        variant="outline"
                        className="mb-2 rounded-sm border-border text-[8px] font-medium"
                      >
                        Selected announcement
                      </Badge>
                      <h3 className="text-[13px] font-semibold leading-5">{active.title}</h3>
                    </div>
                    <span
                      className={`rounded-sm px-2 py-1 text-[9px] ${active.status === "Approved" ? "bg-teal-400/10 text-teal-300" : "bg-amber-300/10 text-amber-200"}`}
                    >
                      {active.status}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-sm border border-border/70 bg-background/50 p-3">
                      <p className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                        <Tag className="size-3" />
                        Predicted category
                      </p>
                      <p className="mt-2 text-[13px] font-medium">{active.category}</p>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        Illustrative preview value
                      </p>
                    </div>
                    <div className="rounded-sm border border-border/70 bg-background/50 p-3">
                      <p className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                        <Sparkles className="size-3" />
                        Classification confidence
                      </p>
                      <p className="mt-2 text-[13px] font-medium">{active.confidence}</p>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        Not produced by a live model
                      </p>
                    </div>
                    <div className="rounded-sm border border-border/70 bg-background/50 p-3 sm:col-span-2">
                      <p className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                        <CalendarDays className="size-3" />
                        Extracted dates & deadlines
                      </p>
                      <p className="mt-2 text-[11px] font-medium">{active.dates}</p>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        Confirm each date against the original document
                      </p>
                    </div>
                  </div>
                  {reviewMessage && (
                    <p className="mt-3 rounded-sm border border-border px-3 py-2 text-[9px] text-muted-foreground">
                      {reviewMessage}
                    </p>
                  )}
                  {active.status === "Pending" && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                      <Button
                        onClick={() => decide("Approved")}
                        size="sm"
                        className="h-8 text-[10px]"
                      >
                        <Check className="size-3" />
                        Approve preview
                      </Button>
                      <Button
                        onClick={() => decide("Changes requested")}
                        size="sm"
                        variant="outline"
                        className="h-8 text-[10px]"
                      >
                        <X className="size-3" />
                        Request changes
                      </Button>
                      <span className="self-center text-[9px] text-muted-foreground">
                        No live publishing
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <div>
            <SectionHeading title="Category overview" />
            <div className="flex flex-wrap gap-2">
              {["Academic · 12", "Student life · 8", "Facilities · 4", "Funding · 2"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-border bg-secondary/45 px-2.5 py-1.5 text-[9px] text-muted-foreground"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
