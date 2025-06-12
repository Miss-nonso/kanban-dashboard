import type { Metadata } from 'next';
import './styles/globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { BoardProvider } from './context/BoardContext';
import { SidebarProvider } from './context/SidebarContext';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Kanban Task Management app',
  description: 'Plan and mange tasks better with Kanban',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex min-h-screen`}>
        <ThemeProvider>
          <BoardProvider>
            <SidebarProvider>
              <ModalProvider>
                {/* <Sidebar /> */}

                <main className="flex-1"> {children}</main>
                <Toaster />
              </ModalProvider>
            </SidebarProvider>
          </BoardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
