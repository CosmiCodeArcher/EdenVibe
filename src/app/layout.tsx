'use client'

import './globals.css';
import Navigation from '@/components/Navigation';
import Player from '@/components/Player';
import { PlayerProvider } from '@/context/PlayerContext';
import { ModalProvider } from '@/context/ModalContext';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <html lang="en">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="frame-src 'self' https://www.youtube.com https://vercel.live/;"
        />
      </Head>
      <body className='bg-gradient-to-r from-black via-teal-600 to-blue-900'>
        {loading ? (
          <LoadingScreen />
        ) : (
          <PlayerProvider>
            <ModalProvider>
              <div className='mb-10'>
                <Navigation className="h-16 flex-shrink-0 from-black via-teal-600 to-blue-900 shadow-lg" />
              </div>
              <div>
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow overflow-auto p-10 bg-gradient-to-r from-black via-teal-600 to-blue-900 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-100">
                  {children}
                </main>
                <Player />
              </div>
            </div>
          </ModalProvider>
        </PlayerProvider>
      )}
      </body>
    </html>
  );
}