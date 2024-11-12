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
      <body className='bg-gradient-to-r from-black via-teal-600 to-blue-900'>
        <div className='mb-10'>
        <Navigation className="h-16 flex-shrink-0 from-black via-teal-600 to-blue-900 shadow-lg" />
        </div>
        <div>
        <PlayerProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow overflow-auto p-10 bg-gradient-to-r from-black via-teal-600 to-blue-900 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-100">
              {children}
            </main>
            <Player />
          </div>
        </PlayerProvider>
        </div>
      </body>
    </html>
  );
}