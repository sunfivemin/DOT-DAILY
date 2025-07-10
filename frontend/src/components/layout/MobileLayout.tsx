import type { ReactNode } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import Fab from "../ui/Fab/Fab";
import { Plus } from "lucide-react";

interface MobileLayoutProps {
  children: ReactNode;
  headerTitle: string;
  showFab?: boolean;
}

export default function MobileLayout({
  children,
  headerTitle,
  showFab = false,
}: MobileLayoutProps) {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-surface-base shadow-lg relative">
      <Header title={headerTitle} />
      <main className="pb-20">{children}</main>
      <Footer />
      {showFab && (
        <div className="fixed bottom-24 right-4 z-50 max-w-md w-full mx-auto">
          <Fab aria-label="새로운 할 일 추가">
            <Plus className="w-6 h-6" />
          </Fab>
        </div>
      )}
    </div>
  );
}
