import type { NextPage } from 'next';
import { Suspense } from 'react';
import { Metadata } from 'next';

import Hero from '@/components/Hero';
import FeaturedCollections from '@/components/FeaturedCollections';
import Categories from '@/components/Categories';
import Navigation from '@/components/Navigation';
import Player from '@/components/Player';
import ErrorBoundary from '@/components/ErrorBoundary';


export const metadata: Metadata = {
  title: 'Home | EdenVibe360',
  description: 'Discover and enjoy EDM & Chill Beats on EdenVibe360',
 };

 const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 space-y-12">
        <Hero />
        <ErrorBoundary>
        <Suspense 
          fallback={
            <div className='flex items-center justify-center py-10'>
              Loading collections...
            </div>
          }
        >
          <FeaturedCollections />
        </Suspense>
        <Suspense 
          fallback={
            <div className='flex items-center justify-center py-10'>
              Loading categoriess...
            </div>
          }
        >
          <Categories />
        </Suspense>
        </ErrorBoundary>
      </main>
      <Player />
    </div>
  );
};

export default Home;