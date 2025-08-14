import { AppSidebar } from "@/components/app-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <main className="flex-1 ml-16 overflow-auto">
        {children}
      </main>
    </div>
  );
}