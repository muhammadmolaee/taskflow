# TaskFlow PWA

> A production-quality Progressive Web Application for personal task management.
> Built following **Pressman's Software Engineering: A Practitioner's Approach**.

![GitHub Actions](https://github.com/muhammadmolaee/taskflow/actions/workflows/deploy.yml/badge.svg)
![Version](https://img.shields.io/badge/version-1.0.0-indigo)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌐 Live Demo

👉 [https://muhammadmolaee.github.io/taskflow/](https://muhammadmolaee.github.io/taskflow/)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Software Engineering Process](#software-engineering-process)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Git Workflow](#git-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Lessons Learned](#lessons-learned)

---

## Project Overview

### Problem Statement

Modern life generates an overwhelming volume of tasks and responsibilities.
Existing to-do applications are either too complex or too simple. Individual
users need a lightweight, fast, installable task management application that
works on any device, functions offline, and provides meaningful organization
through categories and due dates — without requiring an account or internet
connectivity.

### Vision Statement

**FOR** individuals and professionals who need to manage daily tasks
**WHO** struggle with heavyweight apps and require offline access
**THE** TaskFlow PWA **IS A** progressive web application
**THAT** enables users to create, organize, prioritize, and complete tasks
across devices without internet dependency
**UNLIKE** Todoist or Notion
**OUR PRODUCT** delivers a zero-account, offline-first, installable experience

### Success Metrics

| Metric                | Target      | Status |
| --------------------- | ----------- | ------ |
| Initial load time     | < 2 seconds | ✅     |
| Offline functionality | 100%        | ✅     |
| PWA installable       | Yes         | ✅     |
| Data stays on device  | Yes         | ✅     |
| Lighthouse PWA score  | ≥ 90        | ✅     |

---

## Software Engineering Process

This project was built following **Pressman's Software Engineering:
A Practitioner's Approach** using a **Hybrid Incremental-Agile** methodology.

### Phase 1 — Communication

- Stakeholder identification
- Problem definition and vision statement
- Simulated user interviews (3 archetypes)
- Functional requirements (28)
- Non-functional requirements (14)
- MoSCoW prioritization

### Phase 2 — Planning

- Scope definition
- Risk analysis
- Work breakdown structure
- Iteration planning (3 iterations)
- Project schedule

### Phase 3 — Modeling

- Use case model
- Domain model
- Component architecture
- Data model design

### Phase 4 — Construction

- Incremental development
- Component-based architecture
- IndexedDB persistence layer
- PWA implementation
- Automated CI/CD pipeline

### Phase 5 — Deployment

- GitHub Actions workflow
- GitHub Pages hosting
- Production build optimization
- Release tagging (v1.0.0)

---

## Features

### Core Features

- ✅ Create, edit, and delete tasks
- ✅ Mark tasks as complete or incomplete
- ✅ Priority levels — High, Medium, Low
- ✅ Due dates with overdue indicators
- ✅ Categories with custom colors

### Organization

- ✅ Real-time search
- ✅ Filter by priority, category, status
- ✅ Sort by priority, due date, newest
- ✅ Progress bar showing completion percentage

### PWA Features

- ✅ Installable on iOS, Android, and Desktop
- ✅ Full offline support
- ✅ Service Worker caching
- ✅ App manifest

### User Experience

- ✅ Dark mode and light mode
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations
- ✅ Toast notifications
- ✅ Confirm dialog before deletion
- ✅ Keyboard shortcuts (N = new task, / = search)
- ✅ Scroll to top button
- ✅ Due date reminders banner

### Data Management

- ✅ Export tasks as JSON backup
- ✅ Import tasks from JSON backup
- ✅ IndexedDB persistence

---

## Technology Stack

| Technology      | Purpose       | Justification                       |
| --------------- | ------------- | ----------------------------------- |
| React 18        | UI Framework  | Component-based, large ecosystem    |
| Vite            | Build Tool    | Fast dev server, optimized builds   |
| Tailwind CSS    | Styling       | Utility-first, rapid development    |
| IndexedDB (idb) | Storage       | Offline-first, browser native       |
| Vite PWA Plugin | PWA           | Service worker, manifest generation |
| date-fns        | Date handling | Lightweight, tree-shakeable         |
| lucide-react    | Icons         | Clean, consistent icon set          |
| uuid            | ID generation | Collision-free unique IDs           |
| GitHub Actions  | CI/CD         | Automated deployment pipeline       |
| GitHub Pages    | Hosting       | Free, reliable static hosting       |

---

## Architecture

### Component Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation, dark mode, export/import
│   ├── TaskForm.jsx         # New task creation form
│   ├── TaskCard.jsx         # Individual task display and editing
│   ├── TaskList.jsx         # Task list container
│   ├── FilterBar.jsx        # Search, filter, and sort controls
│   ├── CategoryManager.jsx  # Category CRUD operations
│   ├── ProgressBar.jsx      # Task completion progress
│   ├── ReminderBanner.jsx   # Overdue task warnings
│   ├── ConfirmDialog.jsx    # Delete confirmation modal
│   ├── Toast.jsx            # Notification system
│   ├── ScrollToTop.jsx      # Scroll to top button
│   └── Spinner.jsx          # Loading state
├── context/
│   └── TaskContext.jsx      # Global state management
├── hooks/
│   ├── useFilters.js        # Filtering and sorting logic
│   ├── useToast.js          # Toast notification management
│   └── useKeyboardShortcuts.js  # Keyboard shortcut handling
├── db/
│   └── database.js          # IndexedDB operations
└── utils/
    ├── dateUtils.js         # Date formatting helpers
    └── exportImport.js      # Backup and restore logic
```

### Data Model

```
Task {
  id: string (uuid)
  title: string (required)
  description: string (optional)
  priority: 'high' | 'medium' | 'low'
  category: string (category id, optional)
  dueDate: string (ISO date, optional)
  completed: boolean
  createdAt: string (ISO datetime)
}

Category {
  id: string (uuid)
  name: string
  color: string (hex color)
}
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/muhammadmolaee/taskflow.git

# Navigate to project folder
cd taskflow

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## Git Workflow

This project follows **Conventional Commits** standard.

### Branch Structure

```
main          → production-ready code
gh-pages      → deployed build (auto-generated)
```

### Commit Types

| Type       | Description      |
| ---------- | ---------------- |
| `feat`     | New feature      |
| `fix`      | Bug fix          |
| `docs`     | Documentation    |
| `chore`    | Maintenance      |
| `ci`       | CI/CD changes    |
| `refactor` | Code refactoring |

### Example Commits

```
feat: initialize React PWA project with Vite
feat(db): add IndexedDB database layer
feat(context): add global task and category state
feat(components): add TaskCard with edit and delete
fix(pwa): fix base path for GitHub Pages deployment
ci: add GitHub Actions workflow for deployment
release: TaskFlow PWA v1.0.0
```

---

## Testing

### Manual Testing Checklist

#### Task Management

- [ ] Create a task with title only
- [ ] Create a task with all fields
- [ ] Edit a task title
- [ ] Edit a task priority
- [ ] Delete a task with confirmation
- [ ] Mark a task as complete
- [ ] Mark a task as incomplete
- [ ] Clear all completed tasks

#### Categories

- [ ] Create a category with a color
- [ ] Assign a category to a task
- [ ] Delete a category
- [ ] Filter tasks by category

#### Search and Filter

- [ ] Search by task title
- [ ] Search by description
- [ ] Filter by priority
- [ ] Filter by status
- [ ] Sort by due date
- [ ] Sort by priority
- [ ] Clear all filters

#### PWA

- [ ] App installs on desktop
- [ ] App works offline
- [ ] Data persists after page refresh
- [ ] Data persists after browser restart

#### UI

- [ ] Dark mode toggles correctly
- [ ] App is responsive on mobile
- [ ] Keyboard shortcut N focuses task input
- [ ] Keyboard shortcut / focuses search
- [ ] Toast appears after adding task
- [ ] Confirm dialog appears before delete
- [ ] Progress bar updates correctly
- [ ] Overdue banner appears for overdue tasks

---

## Deployment

### CI/CD Pipeline

Every push to `main` automatically:

1. Installs Node.js 20
2. Runs `npm ci`
3. Runs `npm run build`
4. Deploys `dist/` to `gh-pages` branch
5. GitHub Pages serves the app live

### Live URL

```
https://muhammadmolaee.github.io/taskflow/
```

---

## Future Improvements

| Feature                              | Priority |
| ------------------------------------ | -------- |
| Cloud sync across devices            | High     |
| Push notifications for due dates     | High     |
| Recurring tasks                      | Medium   |
| Subtasks                             | Medium   |
| Drag and drop reordering             | Medium   |
| Task sharing                         | Low      |
| Multiple themes                      | Low      |
| Statistics and productivity insights | Low      |

---

## Lessons Learned

1. **Requirements first** — Writing requirements before coding prevented
   scope creep and kept the project focused.

2. **Offline-first design** — Building with IndexedDB from the start
   made offline support natural rather than an afterthought.

3. **Component modularity** — Small focused components made debugging
   and iteration much faster.

4. **CI/CD early** — Setting up GitHub Actions early meant every
   change was automatically deployed without manual effort.

5. **Pressman's process works** — Following a structured software
   engineering process produced a more complete and professional
   result than ad-hoc development.

---

## Methodology Justification

This project followed a **Hybrid Incremental-Agile** model as described
by Pressman. The structured phases (Communication → Planning → Modeling
→ Construction → Deployment) provided discipline and documentation,
while agile thinking within each phase allowed flexibility and iteration.

This was suitable because:

- The project was small enough for one developer
- Requirements were mostly known upfront
- Incremental delivery allowed testing at each stage
- The hybrid approach balanced documentation with speed

---

## License

MIT License — feel free to use this project for learning or as a template.

---

_Built with ❤️ following Pressman's Software Engineering principles_
