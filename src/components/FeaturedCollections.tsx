import CollectionCard from './CollectionCard';
import { musicCollections } from '@/data/collections';

 function FeaturedCollections() {
    const featuredCollections = musicCollections.filter(collection => collection.featured);
  
    return (
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-4">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map through featured collections using CollectionCard */}
          {featuredCollections.map(collection => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>
    );
  }

  export default FeaturedCollections