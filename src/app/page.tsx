import Hero from '@/components/Hero';
import FeaturedCollections from '@/components/FeaturedCollections';
import Categories from '@/components/Categories';
import Navigation from '@/components/Navigation';
import Player from '@/components/Player';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <FeaturedCollections />
        <Categories />
      </main>
      <Player />
    </div>
  );
}