'use client'

import Categories from '@/components/Categories';
import Playlist from '@/components/Playlist';
import CollectionGrid from '@/components/CollectionGrid';
import About from '@/components/About';


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow p-4">

      <div className="mb-10">
        <Playlist />
      </div>

        <section id="home" className="mb-10">
          <CollectionGrid /> 
        </section>

        <section id="categories" className="mb-10">
          <Categories />
        </section>

        <section id="about" className="mb-10">
          <About />
        </section>
      </div>
    </div>
  );
}
