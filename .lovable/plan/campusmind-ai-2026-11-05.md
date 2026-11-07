# CampusMind AI

## Goal
Build a polished, responsive university intelligence workspace with five usable views and mock data, keeping AI and external API behavior explicitly non-functional until a service is connected.

## User-facing work
- Student dashboard at `/` with lectures, deadlines, announcements, events, and recommendations.
- Admin workspace at `/admin` for announcement drafts, review, event management, categories, and engagement figures.
- Campus assistant at `/assistant` with chat history, suggestions, citations/source status, and a clear unverified-information state; no fabricated AI replies.
- Announcement intelligence at `/intelligence` with submission, illustrative predicted category/confidence/date fields, and approval controls.
- Student profile at `/profile` with course details, timetable, interests, and activity preferences.
- Shared navigation and responsive layout so views feel like one product.

## Technical approach
- Use existing TanStack Start routes, React/TypeScript, Lucide icons, and existing shadcn controls.
- Keep presentation and mock data in focused reusable modules; isolate future Flask API calls in a service layer without pretending requests succeed.
- Define the dark navy/purple visual system with semantic OKLCH tokens in `src/styles.css`.
- Add unique page metadata to every content route and keep the root shell generic.
- Update routing coverage tests where applicable and validate the core navigation and assistant non-response states.
