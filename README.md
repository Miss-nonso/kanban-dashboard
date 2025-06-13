# 🗂️ Kanban Board

A sleek, minimal, and responsive **Kanban Board** built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and the expressive beauty of **ShadCN UI**.

Designed to help you manage tasks with ease — whether you're planning your next startup, writing documentation, or just organizing your thoughts — this Kanban board brings structure to your chaos with style and intention.

---

## 🛠 Tech Stack

* **Next.js (App Router)** – The backbone of the project
* **TypeScript** – Because type safety is productivity
* **Tailwind CSS** – Utility-first styling for clean, scalable UI
* **ShadCN UI** – Elegant and accessible components
* **Lucide Icons** – Crisp, lightweight icons
* **nanoid** – For generating unique task and board IDs
* **localStorage** – For client-side state persistence
* **React DnD (planned)** – For drag-and-drop functionality
* **Toast Notifications** – UX feedback that whispers, not screams

---

## 📦 Features

**🗂 Board & Task Management**
* **Create Boards** – Give structure to your projects
* **Add Columns** – Customize your workflow: Todo, In Progress, Done — you decide
* **Column re‑ordering** - Easy re-order of column using drag-and-drop
* **Add Tasks** – Each task gets a title, description, and some subtasks
* **Delete with Caution** – Toast confirms after you give the go ahead
* **Add Task descriptions** for more detail
* Rich task modal with **sub‑tasks** & status select  
* Cross‑column drag with real‑time status update  

**🧠 Smart UX Decisions**
* Persisted data using localStorage (Refresh your tab, not your progress)
* Instant visual feedback using toast messages
* Responsive Design – Looks good from mobile to widescreen
* Accessible UX – Focus states, keyboard nav, and readable contrast

**⚙️ Developer Features**
* Modular, readable component structure
* Easy-to-extend state update logic
* Light/dark mode support 


---

## 🧱 File Structure

```
src/
├── app/                    # App router directory
│   └── page.tsx           # Landing page
│   └── layout.tsx         # Global layout
├── components/            # Shared, reusable UI components
│   ├── board/             # Board UI logic
│   ├── column/            # Column logic
│   ├── task/              # Task cards and form
│   └── ui/                # Buttons, inputs, modals (shadcn-based)
├── hooks/                 # Custom hooks (e.g. useLocalStorage)
├── lib/                   # Utility functions (e.g. state update logic)
├── types/                 # TypeScript interfaces
├── constants/             # App-wide static data
├── styles/                # Global styles & tailwind config
└── public/                # Static assets (if any)
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18 or later
* Yarn or npm

### Installation

```bash
git clone https://github.com/Miss-nonso/kanban-board.git
cd kanban-board
npm install # or yarn
```

### Run the development server

```bash
npm run dev # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the board.

---





## 📝 Assumptions

* No external database — everything's stored in the browser
* No authentication
* Designed with accessibility in mind

---


---

Built with plenty of "You can't give up now" moments, late‑night bug hunts, and the relentless belief that small side‑projects teach big lessons.


