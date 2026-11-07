import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Clock3,
  MapPin,
  MessageSquareText,
  Plus,
  Sparkles,
  Users,
  BookOpenCheck,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppLayout, PageHeading, SampleTag, SectionHeading } from "@/components/campusmind/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student dashboard ·  AI" },
      {
        name: "description",
        content: "Your university day, deadlines and campus updates at a glance.",
      },
      { property: "og:title", content: "Student dashboard ·  AI" },
      {
        property: "og:description",
        content: "Your university day, deadlines and campus updates at a glance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentDashboard,
});

const lectures = [
  {
    time: "09:00",
    end: "10:30",
    code: "CS 204",
    title: "Human–Computer Interaction",
    room: "Engineering Block · E204",
    color: "bg-primary",
  },
  {
    time: "11:00",
    end: "12:30",
    code: "STAT 210",
    title: "Applied Statistics",
    room: "Science Complex · S12",
    color: "bg-teal-400",
  },
  {
    time: "14:00",
    end: "15:30",
    code: "CS 218",
    title: "Data Structures & Algorithms",
    room: "Engineering Block · Lab 3",
    color: "bg-amber-300",
  },
];

const deadlines = [
  {
    subject: "CS 204 · Interface critique",
    date: "Due today, 23:59",
    days: "8h left",
    progress: 82,
    tone: "bg-primary",
  },
  {
    subject: "STAT 210 · Problem set 4",
    date: "Tomorrow, 17:00",
    days: "1 day",
    progress: 54,
    tone: "bg-teal-400",
  },
  {
    subject: "CS 218 · Project proposal",
    date: "Mon, 9 Nov",
    days: "4 days",
    progress: 28,
    tone: "bg-amber-300",
  },
];

function StudentDashboard() {
  return (
    <AppLayout>
      <PageHeading
        eyebrow="Thursday · 5 November 2026"
        title="Good evening, Stephany"
        subtitle="Here’s what’s happening across your campus today."
        action={<SampleTag />}
      />
      <section className="mb-7 grid gap-4 sm:grid-cols-3">
        <Stat
          icon={<CalendarClock className="size-4" />}
          label="Next lecture"
          value="09:00 AM"
          detail="Human–Computer Interaction"
          accent="text-primary"
        />
        <Stat
          icon={<BookOpenCheck className="size-4" />}
          label="Open deadlines"
          value="03"
          detail="One due before midnight"
          accent="text-amber-300"
        />
        <Stat
          icon={<CalendarDays className="size-4" />}
          label="This week on campus"
          value="08 events"
          detail="2 match your interests"
          accent="text-teal-300"
        />
      </section>

      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1.68fr)_minmax(315px,0.92fr)]">
        <div className="space-y-7">
          <section>
            <SectionHeading
              title="Today’s timetable"
              action={
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                >
                  Full timetable <ArrowRight className="size-3" />
                </Link>
              }
            />
            <Card className="overflow-hidden border-border/80 bg-card/70 shadow-none">
              <CardContent className="p-0">
                {lectures.map((lecture, index) => (
                  <div
                    key={lecture.code}
                    className={`grid grid-cols-[58px_1fr_auto] items-center gap-3 px-4 py-4 sm:grid-cols-[68px_1fr_auto] sm:gap-4 sm:px-5 ${index ? "border-t border-border/60" : ""}`}
                  >
                    <div className="text-[11px] font-medium tabular-nums text-muted-foreground">
                      <p className="text-foreground">{lecture.time}</p>
                      <p className="mt-1 text-[9px]">{lecture.end}</p>
                    </div>
                    <div className="flex min-w-0 items-stretch gap-3">
                      <span className={`w-[3px] shrink-0 rounded-full ${lecture.color}`} />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-[9px] font-semibold tracking-wide text-primary">
                            {lecture.code}
                          </span>
                          <span className="text-[8px] text-muted-foreground">·</span>
                          <span className="truncate text-[12px] font-medium">{lecture.title}</span>
                        </div>
                        <p className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <MapPin className="size-3" />
                          {lecture.room}
                        </p>
                      </div>
                    </div>
                    <span className="hidden rounded-sm border border-border px-2 py-1 text-[9px] text-muted-foreground sm:inline-flex">
                      Lecture
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-secondary/30 px-4 py-3 sm:px-5">
                  <p className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Clock3 className="size-3.5" />
                    No lectures scheduled after 15:30
                  </p>
                  <Link to="/profile" className="text-[10px] font-medium text-primary">
                    View week
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <SectionHeading
              title="Deadlines to keep in view"
              action={
                <Link
                  to="/profile"
                  className="text-[11px] text-muted-foreground hover:text-foreground"
                >
                  All coursework
                </Link>
              }
            />
            <Card className="border-border/80 bg-card/70 shadow-none">
              <CardContent className="space-y-4 p-4 sm:p-5">
                {deadlines.map((item) => (
                  <div key={item.subject} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2">
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium">{item.subject}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{item.date}</p>
                    </div>
                    <span
                      className={`self-center text-[10px] ${item.days === "8h left" ? "text-amber-300" : "text-muted-foreground"}`}
                    >
                      {item.days}
                    </span>
                    <Progress
                      value={item.progress}
                      className="col-span-2 h-1 bg-secondary [&>div]:bg-primary"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <SectionHeading
              title="Campus announcements"
              action={
                <Link to="/intelligence" className="text-[11px] text-primary">
                  See all <ArrowRight className="ml-1 inline size-3" />
                </Link>
              }
            />
            <div className="divide-y divide-border/60 border-y border-border/70">
              <Announcement
                category="ACADEMIC"
                title="Registration for Spring 2027 courses opens next week"
                date="2 hours ago"
                tint="text-primary"
              />
              <Announcement
                category="STUDENT LIFE"
                title="Applications open: Student Innovation Fund"
                date="Today · 10:24 AM"
                tint="text-teal-300"
              />
              <Announcement
                category="FACILITIES"
                title="Main library extended hours during exam period"
                date="Yesterday"
                tint="text-amber-300"
              />
            </div>
          </section>
        </div>

        <div className="space-y-7">
          <section>
            <SectionHeading
              title="Campus events"
              action={
                <Link to="/intelligence" className="text-[11px] text-primary">
                  Browse all
                </Link>
              }
            />
            <Card className="border-border/80 bg-card/70 shadow-none">
              <CardContent className="p-0">
                <EventItem
                  day="06"
                  month="NOV"
                  category="CAREERS"
                  title="Future of Tech: Alumni Panel"
                  time="Fri · 16:00"
                  place="Innovation Hub"
                  tint="text-primary"
                />
                <EventItem
                  day="07"
                  month="NOV"
                  category="COMMUNITY"
                  title="Nairobi Green Campus Walk"
                  time="Sat · 08:30"
                  place="Student Centre, Gate A"
                  tint="text-teal-300"
                />
                <EventItem
                  day="10"
                  month="NOV"
                  category="WORKSHOP"
                  title="Designing for accessibility"
                  time="Tue · 14:00"
                  place="Library Media Lab"
                  tint="text-amber-300"
                />
              </CardContent>
            </Card>
          </section>

          <section>
            <SectionHeading
              title="Picked for you"
              icon={<Sparkles className="size-3.5 text-primary" />}
            />
            <Card className="grid-paper overflow-hidden border-primary/25 bg-card shadow-none">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded-sm border border-primary/25 bg-primary/10">
                    <Users className="size-3.5 text-primary" />
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-primary">
                    Based on your interests
                  </span>
                </div>
                <h3 className="text-[14px] font-semibold">Women in Computing Meetup</h3>
                <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">
                  Connect with student builders and researchers for an evening of ideas and
                  community.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">Wed, 11 Nov · 17:30</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 border-primary/35 px-2.5 text-[10px] text-primary"
                  >
                    Explore <ArrowUpRight className="size-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <Link
            to="/assistant"
            className="group flex items-center gap-3 rounded-md border border-primary/25 bg-accent/45 p-4 transition-colors hover:bg-accent/70"
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground">
              <MessageSquareText className="size-[17px]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium">Ask </p>
              <p className="mt-1 text-[10px] text-muted-foreground">Find campus information</p>
            </div>
            <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

function Stat({
  icon,
  label,
  value,
  detail,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  accent: string;
}) {
  return (
    <Card className="border-border/80 bg-card/65 shadow-none">
      <CardContent className="flex items-start justify-between p-4 sm:p-5">
        <div>
          <p className="text-[10px] text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-[21px] font-semibold tabular-nums">{value}</p>
          <p className="mt-1 text-[10px] text-muted-foreground">{detail}</p>
        </div>
        <span className={`grid size-8 place-items-center rounded-sm bg-secondary ${accent}`}>
          {icon}
        </span>
      </CardContent>
    </Card>
  );
}

function Announcement({
  category,
  title,
  date,
  tint,
}: {
  category: string;
  title: string;
  date: string;
  tint: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5">
      <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/80" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[8px] font-semibold tracking-[0.08em] ${tint}`}>{category}</span>
          <span className="text-[9px] text-muted-foreground">{date}</span>
        </div>
        <p className="mt-1.5 text-[11px] leading-5">{title}</p>
      </div>
    </div>
  );
}

function EventItem({
  day,
  month,
  category,
  title,
  time,
  place,
  tint,
}: {
  day: string;
  month: string;
  category: string;
  title: string;
  time: string;
  place: string;
  tint: string;
}) {
  return (
    <div className="flex gap-3 border-b border-border/60 p-4 last:border-0">
      <div className="flex w-10 shrink-0 flex-col items-center justify-center rounded-sm border border-border bg-secondary/50 py-1">
        <span className="font-display text-[16px] font-semibold leading-none">{day}</span>
        <span className="mt-1 text-[8px] text-muted-foreground">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <span className={`text-[8px] font-semibold tracking-[0.08em] ${tint}`}>{category}</span>
        <p className="mt-1 truncate text-[11px] font-medium">{title}</p>
        <p className="mt-1 text-[9px] text-muted-foreground">
          {time} <span className="mx-1">·</span> {place}
        </p>
      </div>
      <Plus className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
    </div>
  );
}
