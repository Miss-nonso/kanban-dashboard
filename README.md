 

---

### **Kanban Board**  

#### **📌 Overview**  
This Kanban board project is a highly interactive task management tool built with **Next.js (App Router)** and **TypeScript**. It follows best UI/UX practices to ensure smooth user experience across all screen sizes.  

---

### **🚀 Features**  
- **Drag & Drop Support** – Easily reorder tasks and columns.  
- **Column Indicators** – Unique color-coding for quick visual differentiation.  
- **Dark/Light Mode Support** – Theme adapts dynamically.  
- **Local Storage Persistence** – Ensures data is retained between sessions.  
- **Accessible & Responsive UI** – Keyboard navigation and mobile-friendly layout.  

---

### **🎨 Design System & Best Practices**  

#### **🎯 Color Palette & Indicators**  
- Used a distinct **hex-based color system** for column identification.  
- Ensured high contrast for better readability and accessibility.  
- Followed **WCAG color contrast guidelines** to enhance visibility.  

#### **📏 UI/UX Principles Followed**  
- **Consistency** – Components follow a structured **design system** for uniformity.  
- **Minimalist Design** – Reduced cognitive load with simple layouts.  
- **Visual Hierarchy** – Used proper spacing, typography, and color coding for clarity.  
- **State Management** – Managed state efficiently using **React Hooks** (`useState`, `useEffect`).  

---

### **⚠️ Challenges Encountered & Solutions**  

#### **1️⃣ Dynamic Theme Switching Issues**  
- **Problem:** CSS variables for `textcolor` weren’t updating as expected.  
- **Solution:** Removed quotation marks from HEX values in `:root`, ensuring correct parsing.  

#### **2️⃣ TypeScript Errors with State Management**  
- **Problem:** Encountered issues with **null values** in `useState` (e.g., `Property 'columns' does not exist on type '{}'`).  
- **Solution:** Explicitly typed states to avoid `undefined` behavior:  
  ```ts
  const [board, setBoard] = useState<Board | null>(null);
  ```

#### **3️⃣ Too Many Re-Renders in React**  
- **Problem:** Infinite loop when setting state inside `useEffect`.  
- **Solution:** Adjusted dependencies to prevent redundant re-renders:  
  ```ts
  useEffect(() => {
    if (!id) return;
    const foundBoard = FindBoard(id);
    if (!foundBoard) {
      setInvalidURL(true);
    } else {
      setBoard(foundBoard);
      setHeaderName(extractHeaderName(foundBoard));
    }
  }, [id]);
  ```

---

### **💡 Lessons Learned**  
- **Avoid unnecessary re-renders** by managing dependencies in `useEffect`.  
- **Type safety is crucial** in TypeScript to prevent runtime errors.  
- **Ensure CSS variables are correctly formatted** for dynamic theming to work as expected.  
- **Follow accessibility best practices** for keyboard navigation and color contrast.  

---

This project embodies clean code practices, efficient state management, and a scalable design system. 🚀🔥 Let me know if you'd like to expand on anything!
