
type Page = 'landing' | 'food' | 'drinks';

interface Props {
  onNavigate: (p: Page) => void;
}

export default function Home({ onNavigate }: Props) {
  return (
    // h-screen locks the height to the viewport; overflow-hidden prevents scrolling
    <div className="h-screen w-full bg-white flex flex-col p-8 overflow-hidden">
      
      {/* Header */}
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-widest text-gray-900">5PM</h1>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center">
        <h2 className="text-6xl font-serif font-bold text-gray-900 leading-tight">
          A Stay.<br /> A Story.
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-sm">
          Slow-fired meats, hearty classics, and a bar built for the golden hour.
        </p>
      </main>

      {/* Footer Navigation */}
      <footer className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('food')}
          className="py-5 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          VIEW MENU
        </button>
        <button 
          onClick={() => onNavigate('drinks')}
          className="py-5 bg-[#6B1A2A] text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          OUR BAR
        </button>
      </footer>
    </div>
  );
}