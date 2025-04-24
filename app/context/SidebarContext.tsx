"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextProps {
  showSidebar: boolean;
  handleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <SidebarContext.Provider value={{ showSidebar, handleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within Sidebar provider");
  }

  return context;
};
