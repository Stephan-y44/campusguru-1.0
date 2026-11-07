import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  Heart,
  MapPin,
  Plus,
  Save,
  UserRound,
  X,
} from "lucide-react";
import { AppLayout, PageHeading, SampleTag, SectionHeading } from "@/components/campusmind/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student profile ·  AI" },
      {
        name: "description",
        content: "Review student courses, timetable, campus interests and activity preferences.",
      },
      { property: "og:title", content: "Student profile ·  AI" },
      {
        property: "og:description",
        content: "Review student courses, timetable, campus interests and activity preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentProfile,
});

const allInterests = [
  "Women in tech",
  "Design",
  "Climate action",
  "Entrepreneurship",
  "Research",
  "Volunteering",
  "Photography",
  "Sports",
  "Music",
  "Debate",
];
const initialCourses = [
  "Human–Computer Interaction",
  "Applied Statistics",
  "Data Structures & Algorithms",
  "Research Methods",
];
const schedule = [
  {
    day: "MON",
    time: "09:00",
    code: "CS 204",
    name: "Human–Computer Interaction",
    venue: "Engineering · E204",
  },
  {
    day: "MON",
    time: "11:00",
    code: "STAT 210",
    name: "Applied Statistics",
    venue: "Science · S12",
  },
  {
    day: "TUE",
    time: "14:00",
    code: "CS 218",
    name: "Data Structures & Algorithms",
    venue: "Engineering · Lab 3",
  },
  {
    day: "WED",
    time: "10:00",
    code: "CS 204",
    name: "Human–Computer Interaction",
    venue: "Engineering · E204",
  },
  {
    day: "THU",
    time: "09:00",
    code: "CS 218",
    name: "Data Structures & Algorithms",
    venue: "Engineering · Lab 3",
  },
  {
    day: "THU",
    time: "11:00",
    code: "STAT 210",
    name: "Applied Statistics",
    venue: "Science · S12",
  },
  { day: "FRI", time: "13:00", code: "RES 202", name: "Research Methods", venue: "Library · L05" },
];

function StudentProfile() {
  const [interests, setInterests] = useState([
    "Women in tech",
    "Design",
    "Climate action",
    "Research",
  ]);
  const [preferences, setPreferences] = useState(["Workshops", "Career events"]);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [day, setDay] = useState("All days");

  function toggle(value: string, values: string[], setter: (items: string[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
    setSaved(false);
  }
  function save() {
    setEditing(false);
    setSaved(true);
  }
  const days = ["All days", "MON", "TUE", "WED", "THU", "FRI"];

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Your campus identity"
        title="Student profile"
        subtitle="Manage your course details, weekly schedule and the campus activities you care about."
        action={
          <div className="flex items-center gap-2">
            <SampleTag />
            <Button
              size="sm"
              className="h-8 text-[10px]"
              onClick={() => (editing ? save() : setEditing(true))}
            >
              {editing ? (
                <>
                  <Check className="size-3" />
                  Save changes
                </>
              ) : (
                <>
                  <Save className="size-3" />
                  Edit profile
                </>
              )}
            </Button>
          </div>
        }
      />
      {saved && (
        <p className="mb-4 flex items-center gap-2 text-[10px] text-teal-300">
          <Check className="size-3.5" />
          Profile preferences updated in this preview.
        </p>
      )}
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="space-y-7">
          <section>
            <Card className="overflow-hidden border-border/80 bg-card/60 shadow-none">
              <div className="h-24 bg-accent/35 grid-paper" />
              <CardContent className="relative px-5 pb-5">
                <div className="-mt-7 grid size-[58px] place-items-center rounded-full border-4 border-card bg-secondary text-[15px] font-semibold text-secondary-foreground">
                  SC
                </div>
                <h2 className="mt-3 text-[17px] font-semibold">Stephany Chemutai</h2>
                <p className="mt-1 text-[10px] text-muted-foreground">Student · Year 3</p>
                <div className="mt-4 space-y-3 border-t border-border/70 pt-4">
                  <ProfileDetail
                    icon={<GraduationCap />}
                    label="Programme"
                    value="BSc Computer Science"
                  />
                  <ProfileDetail
                    icon={<Award />}
                    label="School"
                    value="School of Computing & Informatics"
                  />
                  <ProfileDetail icon={<MapPin />} label="Campus" value="Main Campus · Nairobi" />
                  <ProfileDetail icon={<UserRound />} label="Student ID" value="SC-2024-0816" />
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <SectionHeading
              title="Courses this semester"
              icon={<BookOpen className="size-3.5 text-primary" />}
            />
            <Card className="border-border/80 bg-card/55 shadow-none">
              <CardContent className="divide-y divide-border/60 p-0">
                {initialCourses.map((course, index) => (
                  <div key={course} className="flex items-center gap-3 px-4 py-3">
                    <span className="grid size-7 place-items-center rounded-sm bg-secondary text-[9px] font-medium text-primary">
                      0{index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-medium">{course}</p>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        {["CS 204", "STAT 210", "CS 218", "RES 202"][index]} · Semester 1
                      </p>
                    </div>
                    <span className="text-[9px] text-muted-foreground">
                      {["3", "3", "4", "2"][index]} credits
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
          <section>
            <SectionHeading
              title="Campus interests"
              icon={<Heart className="size-3.5 text-primary" />}
            />
            <div className="flex flex-wrap gap-2">
              {allInterests.map((interest) => {
                const active = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    disabled={!editing}
                    onClick={() => toggle(interest, interests, setInterests)}
                    className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-[9px] transition-colors ${active ? "border-primary/35 bg-primary/10 text-primary" : "border-border bg-card/35 text-muted-foreground"} ${editing ? "cursor-pointer hover:border-primary/50" : "cursor-default"}`}
                  >
                    {active && <Check className="size-2.5" />}
                    {interest}
                  </button>
                );
              })}
            </div>
            {editing && (
              <p className="mt-2 text-[9px] text-muted-foreground">
                Select topics you’d like to see around campus.
              </p>
            )}
          </section>
          <section>
            <SectionHeading
              title="Preferred activities"
              icon={<Award className="size-3.5 text-primary" />}
            />
            <div className="flex flex-wrap gap-2">
              {[
                "Workshops",
                "Career events",
                "Community",
                "Sports",
                "Arts & culture",
                "Networking",
              ].map((item) => {
                const active = preferences.includes(item);
                return (
                  <button
                    key={item}
                    disabled={!editing}
                    onClick={() => toggle(item, preferences, setPreferences)}
                    className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-[9px] ${active ? "border-teal-300/30 bg-teal-300/10 text-teal-200" : "border-border bg-card/35 text-muted-foreground"} ${editing ? "cursor-pointer hover:border-primary/50" : "cursor-default"}`}
                  >
                    {active && <Check className="size-2.5" />}
                    {item}
                  </button>
                );
              })}
            </div>
            {editing && (
              <p className="mt-2 text-[9px] text-muted-foreground">
                Your event picks use these preferences in the preview.
              </p>
            )}
          </section>
        </div>

        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeading
              title="Personal timetable"
              icon={<CalendarDays className="size-3.5 text-primary" />}
            />
            <div className="flex flex-wrap gap-1">
              {days.map((value) => (
                <button
                  key={value}
                  onClick={() => setDay(value)}
                  className={`rounded-sm border px-2 py-1 text-[8px] ${day === value ? "border-primary/30 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  {value === "All days" ? "All" : value}
                </button>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden border-border/80 bg-card/55 shadow-none">
            <CardContent className="p-0">
              {(day === "All days" ? schedule : schedule.filter((item) => item.day === day)).map(
                (item, index, list) => (
                  <div
                    key={`${item.day}-${item.time}`}
                    className={`grid grid-cols-[44px_50px_1fr] gap-3 px-3 py-3.5 sm:grid-cols-[52px_58px_1fr_auto] sm:gap-4 sm:px-5 ${index < list.length - 1 ? "border-b border-border/60" : ""}`}
                  >
                    <span className="pt-1 text-[8px] font-semibold tracking-wide text-muted-foreground">
                      {item.day}
                    </span>
                    <span className="pt-0.5 text-[9px] tabular-nums text-foreground">
                      {item.time}
                    </span>
                    <div className="min-w-0 border-l-2 border-primary/50 pl-3">
                      <p className="truncate text-[10px] font-medium">{item.name}</p>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        {item.code} <span className="mx-1">·</span>{" "}
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-2.5" />
                          {item.venue}
                        </span>
                      </p>
                    </div>
                    <span className="hidden items-center gap-1 text-[8px] text-muted-foreground sm:flex">
                      <Clock3 className="size-3" />
                      90 min
                    </span>
                  </div>
                ),
              )}
            </CardContent>
          </Card>
          <div className="mt-4 flex gap-3 rounded-sm border border-border/70 bg-secondary/25 p-3.5">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-[10px] leading-5 text-muted-foreground">
              This timetable is sample course data for the interface preview, not your official
              university schedule.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function ProfileDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-muted-foreground [&_svg]:size-3.5">{icon}</span>
      <span className="w-[62px] shrink-0 text-[9px] text-muted-foreground">{label}</span>
      <span className="min-w-0 truncate text-[10px]">{value}</span>
    </div>
  );
}
