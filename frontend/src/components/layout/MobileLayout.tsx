import type { ReactNode } from 'react';
import Header from './Header';
import { Footer } from './Footer';
import Fab from '../ui/Fab/Fab';
import { Plus } from 'lucide-react';

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
    <div className="w-full max-w-md mx-auto h-screen flex flex-col relative">
      <Header title={headerTitle} />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Footer />
      {showFab && (
        <div className="absolute bottom-[5.5rem] right-4 z-20">
          <Fab aria-label="새로운 할 일 추가">
            <Plus className="w-6 h-6" />
          </Fab>
        </div>
      )}
    </div>
  );
} 