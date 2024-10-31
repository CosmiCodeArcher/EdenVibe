import type { NextPage } from 'next';
import { Suspense } from 'react';
import { Metadata } from 'next';

import Hero from '@/components/Hero';
import FeaturedCollections from '@/components/FeaturedCollections';
import Categories from '@/components/Categories';
import ErrorBoundary from '@/components/ErrorBoundary';


export const metadata: Metadata = {
  title: 'Home | EdenVibe360',
  description: 'Discover and enjoy EDM & Chill Beats on EdenVibe360',
 };

 const Home: NextPage = () => {
  return (
    <>
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
              Loading categories...
            </div>
          }
        >
          <Categories />
        </Suspense>
        </ErrorBoundary>
    </>
  );
};

export default Home;