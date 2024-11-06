import './globals.css';
import Navigation from '@/components/Navigation';
import Player from '@/components/Player';
import { PlayerProvider } from '@/context/PlayerContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation className="h-16 flex-shrink-0" />
            <main className="flex-grow overflow-auto pb-20">
              {children}
            </main>
            <Player />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}