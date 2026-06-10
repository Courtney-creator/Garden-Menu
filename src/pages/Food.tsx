import { useState } from 'react';

// This is your data structure - no need for a lib folder
const FOOD_MENU = [
  { id: 1, name: "Full Breakfast", category: "breakfast", price: "KES 1,000", image: "/fullb.jpg" },
  { id: 2, name: "Beef", category: "mains", price: "KES 700", image: "/beef.jpg" },
  { id: 3, name: "Boiled Egg", category: "snacks", price: "KES 150", image: "/Boild Egg.jpg" },
  { id: 4, name: "Fried Eggs", category: "breakfast", price: "KES 150", image: "/fried eggs.jpg" },
  { id: 5, name: "Choma Sausage", category: "snacks", price: "KES 200", image: "/Choma Sausage.jpg" },
];

const CATEGORIES = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'mains', label: 'Mains' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'sides', label: 'Sides' },
];

export default function Food() {
  const [active, setActive] = useState('breakfast');

  return (
    <div className="min-h-screen bg-white p-5">
      <h1 className="text-3xl font-bold mb-6">Food Menu</h1>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`px-4 py-2 rounded-full ${active === cat.id ? 'bg-red-900 text-white' : 'bg-gray-100'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FOOD_MENU.filter(item => item.category === active).map(item => (
          <div key={item.id} className="border rounded-2xl overflow-hidden shadow-sm">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover"
              onError={() => {
                // This helps you see if an image is missing
                console.log("Failed to load:", item.image);
              }}
            />
            <div className="p-4">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-red-900 font-semibold">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}