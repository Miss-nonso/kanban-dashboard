```markdown
# 🗂️ React / Next Kanban Board  
*A minimal‑yet‑mighty efficient task manager powered by the App Router.*

---

## 🛠️ Tech Stack
| Layer | What we use | Why |
|-------|-------------|-----|
| **Framework** | **Next 15 (App Router)** | Instant pages, file‑system routing, SEO |
| **UI** | React 18 • Tailwind CSS • shadcn/ui | Rapid styling + accessible primitives |
| **State / Drag** | Context API (+ LocalStorage) • @dnd‑kit/core | Tiny footprint, buttery‑smooth drag‑and‑drop |
| **Type Safety** | TypeScript | Catch bugs **before** they ship |
| **Icons & UX** | Lucide • sonner/toast | Crisp visuals + gentle feedback |
| **Tooling** | Vite‑powered dev server (via Next) • ESLint / Prettier | Fast reloads, consistent code |

---

## 📦 Features
### Boards & Columns  
- Create unlimited boards, columns, tasks  
- Persist everything in `localStorage` (reload‑proof)  
- Inline renaming, deletion, column re‑ordering (drag‑and‑drop)

### Tasks  
- Rich task modal with **sub‑tasks** & status select  
- Cross‑column drag with real‑time status update  
- Instant toast after create / edit / delete (good‑bye “Did it work?”)

### UX niceties  
- Dark / Light toggle (Tailwind + `data-theme`)  
- Keyboard‑escape modal close  
- Skeleton loaders while data hydrates  
- 404 fallback for invalid board IDs

---

## 🧱 Project Structure
```

src/
├── app/                    # Next 15 “app” directory
│   ├── boards/             # Dynamic board routes
│   ├── layout.tsx          # Root layout
│   └── globals.css
├── components/
│   ├── board/              # Board grid, Column, TaskCard
│   ├── modal/              # Modal shell & specific modals
│   └── ui/                 # Buttons, Inputs, Toggle …
├── context/
│   ├── BoardContext.tsx    # <— persistence / CRUD logic
│   └── ModalContext.tsx
├── hooks/                  # Custom hooks (use-toast, useOutsideClick)
├── public/assets/          # Static icons & default board JSON
└── utils/                  # Types, helper funcs

````

---

## 🚀 Getting Started

### Prerequisites  
- **Node ≥ 18**  
- npm or pnpm

```bash
# 1. Clone
git clone https://github.com/yourname/next-kanban.git
cd next-kanban

# 2. Install
npm install    # or pnpm i

# 3. Run dev server
npm run dev

# App: http://localhost:3000
````

---



---

## 📝 Assumptions

* Data lives **entirely in localStorage**; no backend/API
* Single‑user, offline‑first scenario
* No authentication or real‑time collaboration (can be added later)

---



## 📄 License

MIT — see [`LICENSE`](./LICENSE).

> Built with plenty of "you can't give up now moments", late‑night resilience, and the relentless belief that **small side‑projects teach big lessons.**

```
```
