# 📝 Lists - Interactive Sortable Table App

A modern, beautiful, and highly interactive table app built with Next.js, React, and Tailwind CSS. Effortlessly sort, reorder, and manage tabular data with a delightful user experience, smooth animations, and persistent preferences.

---

## ✨ Features

- **Drag & Drop Sorting Panel**: Reorder sort criteria visually using drag-and-drop (powered by `@dnd-kit`).
- **Multi-Criteria Sorting**: Sort data by multiple fields (Name, Created At, Updated At, Status) in any order.
- **Persistent Preferences**: Your sort panel configuration is saved in localStorage and restored automatically.
- **Animated UI**: Smooth transitions and feedback using `motion` for a delightful experience.
- **Responsive & Accessible**: Works beautifully on all screen sizes and supports keyboard navigation.
- **Custom Table Components**: Built with reusable, accessible UI primitives.
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS 4, TypeScript, and more.

---

## 🚀 Demo

https://github.com/user-attachments/assets/13b3074e-f26d-4173-9aa0-7eb40998840f

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [@dnd-kit](https://dndkit.com/) (drag-and-drop)
- [motion](https://motion.dev/) (animations)
- [Lucide React](https://lucide.dev/) (icons)
- [Radix UI](https://www.radix-ui.com/) (popover, select, label)
- TypeScript

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Lists/lists
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Folder Structure

```
lists/
  app/           # Next.js app directory (entry, layout, global styles)
  components/    # UI components (List, Table, Button, etc.)
    List/        # Main sortable table logic
    ui/          # Reusable UI primitives
  lib/           # Utility functions
  public/        # Static assets (SVGs, images)
  ...
```

---

## 🧩 Customization & Extensibility

- **Add More Columns**: Edit `ALL_COLUMNS` and `SORTABLE_FIELDS` in `components/List/List.tsx`.
- **Change Data**: Update `dummyData` in `components/Data.tsx`.
- **Styling**: Modify `app/globals.css` and Tailwind config for custom themes.
- **Animations**: Tweak `motion` variants in `List.tsx` for custom effects.

---

## 🙏 Credits

- [Next.js](https://nextjs.org/)
- [dnd-kit](https://dndkit.com/)
- [motion.dev](https://motion.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 📄 License

This project is for educational and demo purposes. Feel free to use and modify it!
