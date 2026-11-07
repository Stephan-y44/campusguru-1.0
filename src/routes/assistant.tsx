import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  FileText,
  MessageCircle,
  Plus,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppLayout, PageHeading, SampleTag } from "@/components/campusmind/shared";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { campusApi } from "@/lib/campus-api";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Campus assistant ·  AI" },
      {
        name: "description",
        content: "Ask about university information and see source verification clearly.",
      },
      { property: "og:title", content: "Campus assistant ·  AI" },
      {
        property: "og:description",
        content: "Ask about university information and see source verification clearly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CampusAssistant,
});

type ChatItem = {
  id: number;
  role: "user" | "assistant";
  text: string;
  verified?: boolean;
  citations?: { title: string; url: string }[];
};
const suggestions = [
  "When does course registration open?",
  "What events are happening this week?",
  "Where can I find academic support?",
];
const recent = [
  "Library exam-period hours",
  "Innovation Fund application",
  "Spring course registration",
];

function CampusAssistant() {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [question, setQuestion] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = question.trim();
    if (!text || working) return;
    setMessages((items) => [...items, { id: Date.now(), role: "user", text }]);
    setQuestion("");
    setError("");
    setWorking(true);
    try {
      const result = await campusApi.ask({ question: text });
      setMessages((items) => [
        ...items,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: result.answer,
          verified: result.verified,
          citations: result.citations,
        },
      ]);
    } catch {
      setMessages((items) => [
        ...items,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "I can’t verify an answer right now. The campus information service isn’t connected, so I haven’t generated or guessed a response.",
          verified: false,
          citations: [],
        },
      ]);
      setError("Campus information service unavailable. No answer was generated.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Your campus, in context"
        title="Campus assistant"
        subtitle="Ask about university information. Answers are only useful when their sources can be checked."
        action={<SampleTag />}
      />
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_285px]">
        <Card className="flex min-h-[570px] flex-col overflow-hidden border-border/80 bg-card/45 shadow-none xl:min-h-[calc(100vh-225px)]">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <div className="grid size-8 place-items-center rounded-sm border border-primary/30 bg-primary/10">
                <MessageCircle className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-medium"> assistant</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[9px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-amber-300" />
                  Campus data connection not configured
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-[10px]"
              onClick={() => {
                setMessages([]);
                setError("");
              }}
            >
              <Plus className="size-3" />
              <span className="hidden sm:inline">New conversation</span>
            </Button>
          </div>
          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="gap-6 p-4 sm:p-6">
              {messages.length === 0 ? (
                <ConversationEmptyState
                  className="min-h-[360px] justify-center py-10"
                  icon={<BookOpen className="size-7 text-primary" />}
                  title="What would you like to know?"
                  description="Campus answers will include their sources when the university service is connected."
                />
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role} className="max-w-[92%]">
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "border border-primary/20 bg-primary text-primary-foreground"
                          : "max-w-full"
                      }
                    >
                      <MessageResponse>{message.text}</MessageResponse>
                      {message.role === "assistant" && (
                        <div className="mt-2 border-t border-border/70 pt-2.5">
                          <p
                            className={`flex items-center gap-1.5 text-[9px] ${message.verified ? "text-teal-300" : "text-amber-300"}`}
                          >
                            <ShieldAlert className="size-3" />
                            {message.verified
                              ? "Verified campus information"
                              : "Unverified · no trusted source available"}
                          </p>
                          {message.citations?.map((citation) => (
                            <a
                              key={citation.url}
                              href={citation.url}
                              className="mt-1.5 flex items-center gap-1.5 text-[10px] text-primary hover:underline"
                            >
                              <FileText className="size-3" />
                              {citation.title}
                              <ArrowUpRight className="size-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </MessageContent>
                  </Message>
                ))
              )}
              {working && (
                <p className="text-xs text-muted-foreground">
                  Checking the campus information service…
                </p>
              )}
              {error && <p className="text-[10px] text-amber-300">{error}</p>}
            </ConversationContent>
          </Conversation>
          {messages.length === 0 && (
            <div className="mx-4 mb-3 flex flex-wrap justify-center gap-2 sm:mx-6">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuestion(suggestion)}
                  className="rounded-md border border-border bg-secondary/50 px-3 py-2 text-left text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <div className="border-t border-border/70 p-3 sm:p-4">
            <PromptInput onSubmit={submit} className="border-border bg-background/75">
              <PromptInputTextarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                disabled={working}
                placeholder="Ask about campus life, courses, or events…"
                className="min-h-[52px] text-[12px]"
              />
              <PromptInputFooter className="justify-between px-2 pb-2">
                <span className="flex items-center gap-1.5 pl-1 text-[9px] text-muted-foreground">
                  <ShieldAlert className="size-3" />
                  Source verification required
                </span>
                <PromptInputSubmit
                  disabled={!question.trim() || working}
                  className="mr-0.5 mb-0.5"
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </Card>
        <aside className="space-y-5">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[12px] font-semibold">Recent conversations</h2>
              <Clock3 className="size-3.5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              {recent.map((item, index) => (
                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className="flex min-h-9 w-full items-center gap-2 rounded-sm px-2 text-left text-[10px] text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                >
                  <MessageCircle className="size-3.5 shrink-0" />
                  <span className="truncate">{item}</span>
                  <span className="ml-auto shrink-0 text-[9px]">{index + 1}d</span>
                </button>
              ))}
            </div>
          </section>
          <section className="border-t border-border/70 pt-5">
            <h2 className="mb-3 text-[12px] font-semibold">Suggested questions</h2>
            <div className="space-y-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className="flex w-full items-start justify-between gap-2 rounded-sm border border-border/70 bg-card/45 p-3 text-left text-[10px] leading-4 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                >
                  <span>{item}</span>
                  <ArrowUpRight className="mt-0.5 size-3 shrink-0 text-primary" />
                </button>
              ))}
            </div>
          </section>
          <Card className="border-amber-300/25 bg-amber-300/5 shadow-none">
            <CardContent className="p-4">
              <p className="text-[10px] font-semibold text-amber-200">Information status</p>
              <p className="mt-1.5 text-[10px] leading-5 text-muted-foreground">
                This preview is not connected to verified campus records. It won’t invent answers or
                citations.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppLayout>
  );
}
