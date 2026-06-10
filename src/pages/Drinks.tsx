import { useState } from 'react';

type Category = 'Beers' | 'Whiskey' | 'Wines' | 'Spirits' | 'Shots' | 'Beverages';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'Beverages', label: 'Beverages' },
  { id: 'Beers', label: 'Beers' },
  { id: 'Whiskey', label: 'Whiskey, Cognac & Brandy' },
  { id: 'Wines', label: 'Wines & Creams' },
  { id: 'Spirits', label: 'Tequila, Gin & Vodka' },
  { id: 'Shots', label: 'Shots' },
];

export default function Drinks() {
  const [active, setActive] = useState<Category>('Beverages');

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Search Bar - removed in previous step, but adding back to match image_25.png */}
      <div className="max-w-3xl mx-auto mb-8">
        <input 
          type="text" 
          placeholder="Search the bar menu..." 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-6 max-w-3xl mx-auto scrollbar-hide">
        {CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              active === id ? 'bg-[#4A2D2D] text-white' : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items - NO PHOTOS */}
      <div className="max-w-3xl mx-auto space-y-3">
        {/* Replace these with your actual items */}
        <DrinkRow name="White Tea" price="KES 200" desc="Brewed black tea finished with warm milk." />
        <DrinkRow name="Black Tea" price="KES 150" desc="Freshly brewed black tea — clear and aromatic." />
        <DrinkRow name="Masala Tea" price="KES 250" desc="Spiced milk tea with cardamom, ginger and cinnamon." />
      </div>
    </div>
  );
}

// This component purposefully contains no <img> tags or background-image styles
function DrinkRow({ name, price, desc }: { name: string; price: string; desc: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
      <div>
        <h3 className="font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-sm">
        {price}
      </span>
    </div>
  );
}