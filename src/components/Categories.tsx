import { musicCollections } from '@/data/collections';

export default function Categories() {
      // Extract unique categories from musicCollections
    const categories = [...new Set(musicCollections.map(collection => collection.category))];
  
    return (
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(category => (
            <div key={category} className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>
    );
  }