export type CampusQuestion = { question: string };
export type CampusQuestionResult = {
  answer: string;
  citations: { title: string; url: string }[];
  verified: boolean;
};
export type AnnouncementSubmission = {
  title: string;
  content: string;
  documentName?: string;
};

const apiRoot = import.meta.env.VITE_CAMPUS_API_URL;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiRoot) throw new Error(" API is not connected.");
  const response = await fetch(new URL(path, apiRoot), {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) throw new Error(` API request failed (${response.status}).`);
  return response.json() as Promise<T>;
}

export const campusApi = {
  ask: (input: CampusQuestion) =>
    request<CampusQuestionResult>("/assistant/ask", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  submitAnnouncement: (input: AnnouncementSubmission) =>
    request<{ id: string }>("/announcements", {
      method: "POST",
      body: JSON.stringify(input),
    }),
};
