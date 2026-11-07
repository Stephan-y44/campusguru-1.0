# CampusGuru

**A University Intelligence Workspace**

CampusGuru is a university-focused digital workspace designed to bring essential academic information, campus communication, and student support tools into one accessible platform.

The project aims to simplify how students interact with academic information while providing administrators with tools for managing campus announcements and activities.

> **Project status:** Prototype  
> Backend integration, production authentication, persistent data storage, and live AI functionality are not yet fully implemented.

## Features

### 1. Student Dashboard
- Centralized student dashboard.
- Academic announcements and updates.
- Upcoming activities and deadlines.
- Access to other CampusGuru modules.

### 2. Administration Workspace
- Announcement drafting and review interface.
- Event management interface.
- Administrative overview and engagement metrics.
- Demonstration of announcement workflows.

### 3. Campus Assistant
- Dedicated assistant interface.
- Chat interface and conversation history presentation.
- Designed to support future AI-powered student assistance.

**Note:** Live AI responses depend on the configuration of the required backend service.

### 4. Campus Intelligence
- Sample campus information and classification views.
- Demonstration of information organization and administrative workflows.
- Upload interface for future document-processing capabilities.

**Note:** Current sample data and upload interactions should not be interpreted as live AI classification or document extraction.

### 5. Student Profile
- Student profile interface.
- Academic information presentation.
- Timetable and related student information views.

## Technology Stack

- **Frontend:** React 19 and TypeScript
- **Framework:** TanStack Start
- **Routing:** TanStack Router
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Development:** Node.js and npm

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Stephan-y44/campusguru.git
```

Navigate into the project:

```bash
cd campusguru
```

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

To generate a production build:

```bash
npm run build
```

## Project Structure

```text
campusguru/
├── src/
│   ├── components/
│   ├── lib/
│   ├── routes/
│   ├── router.tsx
│   └── start.ts
├── public/
├── package.json
└── README.md
```

## Current Development Scope

CampusGuru is being developed as a functional demonstration prototype.

The current implementation uses sample data and local interface state in several modules. Supabase integration, persistent database operations, production authentication, and fully operational AI services remain future development objectives.

## Future Development

Planned improvements include:

- Supabase database integration.
- Secure user authentication and role-based access control.
- Persistent student and administrative records.
- Live AI-powered campus assistance.
- Automated document processing and information classification.
- Improved testing, validation, and deployment.

## Security Considerations

- Never commit API keys, passwords, or environment secrets.
- Validate and sanitize user-provided input.
- Implement server-side authorization before introducing production administrative operations.
- Apply appropriate access controls to student information.

## Project Repository

[CampusGuru on GitHub](https://github.com/Stephan-y44/campusguru)

---

**CampusGuru — Bringing the university experience into one intelligent workspace.**