import CollectionCard from './CollectionCard';
import { musicCollections } from '@/data/collections';

 function FeaturedCollections() {
    const featuredCollections = musicCollections.filter(collection => collection.featured);
  
    return (
      <section className="py-20 bg-gradient-to-b from-purple-900 to-black text-white">
        <div className='container mx-auto px-4'>
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Map through featured collections using CollectionCard */}
            {featuredCollections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  export default FeaturedCollections