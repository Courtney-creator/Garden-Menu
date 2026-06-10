import { Home, UtensilsCrossed, Wine, MapPin } from 'lucide-react';

type Page = 'home' | 'food' | 'drinks' | 'visit';

interface Props {
  page: Page;
  setPage: (page: Page) => void;
}

export default function BottomNav({ page, setPage }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-yellow-700 flex justify-around py-3 z-50">
      <button onClick={() => setPage('home')} className={`flex flex-col items-center text-xs gap-1 ${page === 'home' ? 'text-yellow-500' : 'text-gray-400'}`}>
        <Home size={20} />
        Home
      </button>
      <button onClick={() => setPage('food')} className={`flex flex-col items-center text-xs gap-1 ${page === 'food' ? 'text-yellow-500' : 'text-gray-400'}`}>
        <UtensilsCrossed size={20} />
        Food
      </button>
      <button onClick={() => setPage('drinks')} className={`flex flex-col items-center text-xs gap-1 ${page === 'drinks' ? 'text-yellow-500' : 'text-gray-400'}`}>
        <Wine size={20} />
        Drinks
      </button>
      <button onClick={() => setPage('visit')} className={`flex flex-col items-center text-xs gap-1 ${page === 'visit' ? 'text-yellow-500' : 'text-gray-400'}`}>
        <MapPin size={20} />
        Visit
      </button>
    </div>
  );
}