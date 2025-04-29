import React from "react";
import { useSidebar } from "../context/SidebarContext";

const SidebarButton = () => {
  const { handleSidebar } = useSidebar();
  return (
    <button
      className="bg-[var(--darkpurple)] rounded-2xl px-4 py-2 fixed bottom-16 -left-3"
      onClick={handleSidebar}
    >
      <span className="">▶️</span>
    </button>
  );
};

export default SidebarButton;
