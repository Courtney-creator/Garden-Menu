import React, { useState, useMemo } from 'react';
import {
  UtensilsCrossed,
  Wine,
  Cookie,
  Flame,
  Leaf,
  Beer,
  Coffee,
  GlassWater,
  Sparkles,
  Search,
  Sunrise,
  Salad,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type View = 'landing' | 'food' | 'drinks';

type FoodCategory = 'Breakfast' | 'Grills' | 'Snacks' | 'Sides';
type DrinkCategory =
  | 'Beverages'
  | 'Beers'
  | 'Whiskey, Cognac & Brandy'
  | 'Wines & Creams'
  | 'Tequila, Gin & Vodka'
  | 'Shots';

interface FoodItem {
  id: number;
  name: string;
  category: FoodCategory;
  price: string;
  description: string;
  /**
   * HOW TO ADD YOUR OWN PHOTOS
   * ──────────────────────────
   * 1. Create a folder called `public/images/` in the project root
   *    (same level as `src/` and `index.html`).
   * 2. Drop your photo files in there — .jpg, .jpeg, .png, .webp all work.
   * 3. Set this field to the path starting with `/images/`
   *    e.g.  image: '/images/full-breakfast.jpg'
   * 4. You can also paste any full https:// URL here.
   * 5. Leave as '' to show a neutral placeholder tile.
   */
  image: string;
}

interface DrinkItem {
  id: number;
  name: string;
  category: DrinkCategory;
  price: string;
  description: string;
  image?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER PHOTOS  (replace each image: value with your own path or URL)
// Using Unsplash for demo — swap for '/images/your-file.jpg' on Vercel
// ─────────────────────────────────────────────────────────────────────────────

const U = (id: string, q = 80) =>
  `https://images.unsplash.com/${id}?w=900&auto=format&fit=crop&q=${q}`;

export const IMG = {
  // Breakfast
  fullBreakfast: "/fullb.jpg",
  lightBreakfast: "/lb.jpg",
  pancakes: U("photo-1528207776546-365bb710ee93"),
  friedEggs: "/fried eggs.jpg",
  boiledEggs: "/Boild Egg.jpg",
  omelette: "/spo.jpg",
  sausage: "/sausage.jpg",
  samosa: "/samosa.jpg",
  arrowRoots: "/arrow.jpg",
  sweetPotato: "/Slow Cooker Sweet Potatoes.jpg",
  fruitSalad: "/fruit salad.jpg",

  // Grills
  goat: "/goat.jpg",
  pork: "/pork.jpg",
  beef: "/beef.jpg",
  broiler: "/broil.jpg",
  kienyeji: "/chicken.jpg",
  tilapia: "/Tilapia fish.jpg",
  brisket: U("photo-1558030006-450675393462"),
  ribs: "/ribs.jpg",
  chickenLegs: "leg.jpg",


  // Snacks 
  wings: "/wings.jpg",
  sliders: "/Pork Sliders.jpg",
  pigsBlanket: "/pib.jpg",
  meatballs: U("photo-1529042410759-befb1204b468"),
  burger: U("photo-1568901346375-23c9450c58cd"),
  chomaSausage: "/Choma Sausage.jpg",
  wingsFries: U("photo-1567620832903-9fc6debc209f"),
  baconFries: "/Fries and Bacon.jpg",
  fishFingers: "/Fish Fingers.jpg",
  saladSweetPotato: "/sps.jpg",
  salad5pm: "/5pm.jpg",
  caesar: "/css.jpg",

  // Side Dishes
  fries: "/fries.jpg",
  wedges: "/wedges.jpg",
  roastPotatoes: "/roast.jpg",
  sauteed: "/satp.jpg",
  mashed: "/mash.jpg",
  whiteugali: "/wugali.jpg",
  brownugali: "/bugali.jpg",
  pumpkinugali: "/pum.jpg",
  veg: "/sukuma.jpg",
  cabbage: "/cabbage.jpg",
  whiterice: "/rice.jpg",
  vegetablerice: "/veger.jpg",
  chapati: "/chapatis.jpg",

  
};

/**
 * DRINKS PAGE HERO IMAGE
 * Swap this for your own photo: '/images/bar-hero.jpg'
 */
const DRINKS_HERO_IMAGE =
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1800&auto=format&fit=crop&q=85';

// ─────────────────────────────────────────────────────────────────────────────
// FOOD MENU DATA
// ─────────────────────────────────────────────────────────────────────────────

const FOOD_MENU: FoodItem[] = [
  // BREAKFAST
  { id: 1,  name: 'Full Breakfast',    category: 'Breakfast', price: 'KES 1,000', description: 'Eggs, sausages, bacon, sautéed potatoes, fresh fruit and a hot beverage.',           image: IMG.fullBreakfast },
  { id: 2,  name: 'Light Breakfast',   category: 'Breakfast', price: 'KES 900',   description: 'Eggs, toast, fresh fruit and your choice of tea or coffee.',                          image: IMG.lightBreakfast },
  { id: 3,  name: 'Pancakes',          category: 'Breakfast', price: 'KES 300',   description: 'Warm, fluffy pancakes drizzled with honey and dusted with icing sugar.',              image: IMG.pancakes },
  { id: 4,  name: 'Fried Eggs',        category: 'Breakfast', price: 'KES 150',   description: 'Two farm-fresh eggs fried to your liking.',                                           image: IMG.friedEggs },
  { id: 5,  name: 'Boiled Eggs',       category: 'Breakfast', price: 'KES 150',   description: 'Soft or hard boiled farm eggs.',                                                      image: IMG.boiledEggs },
  { id: 6,  name: 'Spanish Omelette',  category: 'Breakfast', price: 'KES 200',   description: 'Hearty omelette with potatoes, onions and capsicum.',                                 image: IMG.omelette },
  { id: 7,  name: 'Sausage',           category: 'Breakfast', price: 'KES 200',   description: 'Lightly grilled pork sausage served warm.',                                           image: IMG.sausage },
  { id: 8,  name: 'Samosa',            category: 'Breakfast', price: 'KES 200',   description: 'Crispy golden samosas filled with spiced beef and herbs.',                            image: IMG.samosa },
  { id: 9,  name: 'Arrow Roots',       category: 'Breakfast', price: 'KES 200',   description: 'Steamed arrow roots — a wholesome traditional side.',                                 image: IMG.arrowRoots },
  { id: 10, name: 'Sweet Potatoes',    category: 'Breakfast', price: 'KES 200',   description: 'Slow-steamed sweet potatoes with naturally sweet flesh.',                             image: IMG.sweetPotato },
  { id: 11, name: 'Fruit Salad',       category: 'Breakfast', price: 'KES 200',   description: 'A bright, chilled mix of seasonal tropical fruits.',                                  image: IMG.fruitSalad },

  // GRILLS
  // GRILLS
{ id: 20, name: 'Goat', category: 'Grills', price: '½kg KES 800 · 1kg KES 1,500', description: 'Tender slow-cooked goat in our signature spice blend.', image: IMG.goat },
{ id: 22, name: 'Pork', category: 'Grills', price: '½kg KES 800 · 1kg KES 1,500', description: 'Expertly grilled pork with a crisp, smoky char from open coals.', image: IMG.pork },
{ id: 24, name: 'Beef', category: 'Grills', price: '½kg KES 700 · 1kg KES 1,400', description: 'Tender beef, marinated and grilled to order.', image: IMG.beef },
{ id: 26, name: 'Broiler Chicken', category: 'Grills', price: '½kg KES 1,100 · Full KES 1,800', description: 'Marinated broiler chicken, char-grilled to juicy perfection.', image: IMG.broiler },
{ id: 28, name: 'Kienyeji Chicken', category: 'Grills', price: '½kg KES 1,100 · Full KES 2,800', description: 'Free-range kienyeji chicken, slow-cooked for deep flavor.', image: IMG.kienyeji },
{ id: 30, name: 'Whole Tilapia', category: 'Grills', price: 'KES 1,250', description: 'Whole tilapia, deep-fried crispy and served with ugali and greens.', image: IMG.tilapia },
{ id: 31, name: 'Beef Brisket', category: 'Grills', price: 'KES 2,800', description: 'Slow-cooked, melt-in-your-mouth brisket in a rich house gravy.', image: IMG.brisket },
{ id: 32, name: 'Pork Ribs', category: 'Grills', price: '800grms KES 1,500', description: 'Fall-off-the-bone pork ribs glazed in smoky-sweet BBQ and Fries on the side.', image: IMG.ribs },
{ id: 33, name: 'Chicken Legs', category: 'Grills', price: 'KES 800', description: 'Plump chicken legs in bold spices, open-flame grilled and Fries on the side.', image: IMG.chickenLegs },

  // SNACKS
  { id: 50, name: 'Chicken Wings',        category: 'Snacks', price: 'KES 800', description: 'Crispy fried wings tossed in our house BBQ sauce.',                          image: IMG.wings },
  { id: 51, name: 'Pork Sliders',         category: 'Snacks', price: 'KES 500', description: 'Soft mini buns with tender pulled pork and house sauce.',                    image: IMG.sliders },
  { id: 52, name: 'Pigs in a Blanket',    category: 'Snacks', price: 'KES 450', description: 'Sausages wrapped in smoked bacon and flame-grilled.',                        image: IMG.pigsBlanket },
  { id: 53, name: 'Meat Balls',           category: 'Snacks', price: 'KES 500', description: 'Perfectly seasoned meatballs in a rich tomato glaze.',                       image: IMG.meatballs },
  { id: 54, name: 'Beef Burger',          category: 'Snacks', price: 'KES 700', description: 'Juicy beef patty, melted cheese, toasted bun, house sauce.',                 image: IMG.burger },
  { id: 55, name: 'Choma Sausage',        category: 'Snacks', price: 'KES 450', description: 'Flame-grilled local choma sausage, sliced and warm.',                        image: IMG.chomaSausage },
  { id: 56, name: 'Chicken Wings & Fries',category: 'Snacks', price: 'KES 800', description: 'Crispy wings with golden hand-cut fries.',                                   image: IMG.wingsFries },
  { id: 57, name: 'Bacon & Fries',        category: 'Snacks', price: 'KES 700', description: 'Smoked bacon piled over hot, golden fries.',                                 image: IMG.baconFries },
  { id: 58, name: 'Fish Fingers',         category: 'Snacks', price: 'KES 800', description: 'Breaded fish fingers, crisp and golden, with tartar sauce.',                  image: IMG.fishFingers },
  { id: 59, name: 'Sweet Potato Salad',   category: 'Snacks', price: 'KES 350', description: 'Roasted sweet potato, sweet corn, capsicum and pineapple.',                  image: IMG.saladSweetPotato },
  { id: 60, name: '5PM Salad',            category: 'Snacks', price: 'KES 300', description: 'Carrots, cucumber, mango, sultanas and capsicum — our signature.',            image: IMG.salad5pm },
  { id: 61, name: 'Chicken Caesar Salad', category: 'Snacks', price: 'KES 650', description: 'Chargrilled chicken on romaine with parmesan and croutons.',                  image: IMG.caesar },

  // SIDE DISHES
  { id: 70, name: 'French Fries',       category: 'Sides', price: 'KES 250', description: 'Hand-cut fries, double-fried until perfectly crisp.',                                image: IMG.fries },
  { id: 71, name: 'Potato Wedges',      category: 'Sides', price: 'KES 250', description: 'Thick-cut seasoned wedges, oven-roasted golden.',                                    image: IMG.wedges },
  { id: 72, name: 'Roast Potatoes',     category: 'Sides', price: 'KES 250', description: 'Crisp outside, fluffy inside, finished with rosemary.',                              image: IMG.roastPotatoes },
  { id: 73, name: 'Sautéed Potatoes',   category: 'Sides', price: 'KES 300', description: 'Pan-tossed potatoes with herbs and garlic butter.',                                  image: IMG.sauteed },
  { id: 74, name: 'Mashed Potatoes',    category: 'Sides', price: 'KES 250', description: 'Silky, buttery mash with a hint of cream.',                                          image: IMG.mashed },
  { id: 75, name: 'White Ugali',        category: 'Sides', price: 'KES 100', description: 'Classic, freshly prepared white ugali.',                                             image: IMG.whiteugali },
  { id: 76, name: 'Brown Ugali',        category: 'Sides', price: 'KES 200', description: 'Wholesome brown ugali — rustic and nutty.',                                          image: IMG.brownugali },
  { id: 77, name: 'Pumpkin Ugali',      category: 'Sides', price: 'KES 200', description: 'Smooth ugali enriched with sweet pumpkin.',                                          image: IMG.pumpkinugali },
  { id: 78, name: 'Seasoned Vegetables',category: 'Sides', price: 'KES 100', description: 'Lightly sautéed seasonal greens with garlic and herbs.',                             image: IMG.veg },
  { id: 79, name: 'Cabbage',            category: 'Sides', price: 'KES 100', description: 'Tender braised cabbage with carrots and onion.',                                     image: IMG.cabbage },
  { id: 80, name: 'Plain Rice',         category: 'Sides', price: 'KES 200', description: 'Fluffy steamed long-grain rice.',                                                    image: IMG.whiterice },
  { id: 81, name: 'Vegetable Rice',     category: 'Sides', price: 'KES 300', description: 'Fragrant rice tossed with peas, carrots and capsicum.',                              image: IMG.vegetablerice },
  { id: 82, name: 'Chapati',            category: 'Sides', price: 'KES 100', description: 'Soft, flaky hand-rolled chapati.',                                                   image: IMG.chapati },
];

const FOOD_CATEGORIES: { label: FoodCategory; icon: React.ReactNode }[] = [
  { label: 'Breakfast',          icon: <Sunrise size={14} /> },
  { label: 'Grills',             icon: <Flame size={14} /> },
  { label: 'Snacks', icon: <Cookie size={14} /> },
  { label: 'Sides',        icon: <Salad size={14} /> },
];

// ─────────────────────────────────────────────────────────────────────────────
// DRINKS MENU DATA
// ─────────────────────────────────────────────────────────────────────────────

const DRINKS_MENU: DrinkItem[] = [
  // BEVERAGES
  { id: 90,  name: 'White Tea',   category: 'Beverages', price: 'KES 200', description: 'Brewed black tea finished with warm milk.'},                                  
  { id: 91,  name: 'Black Tea',   category: 'Beverages', price: 'KES 150', description: 'Freshly brewed black tea — clear and aromatic.'},                             
  { id: 92,  name: 'Masala Tea',  category: 'Beverages', price: 'KES 200', description: 'Spiced milk tea with cardamom, ginger and cinnamon.'},                        
  { id: 93,  name: 'Dawa',        category: 'Beverages', price: 'KES 200', description: 'Warm honey, ginger and lemon — comfort in a cup.'},                           
  { id: 94,  name: 'Hot Chocolate',category: 'Beverages', price: 'KES 200', description: 'Rich, velvety hot chocolate topped with frothed milk.'},                     
  { id: 95,  name: 'White Coffee', category: 'Beverages', price: 'KES 200', description: 'Freshly brewed coffee finished with steamed milk.'},                       
  { id: 96,  name: 'Black Coffee', category: 'Beverages', price: 'KES 150', description: 'Bold, freshly brewed black coffee.'},                                        
  { id: 97,  name: 'Fresh Juice',  category: 'Beverages', price: 'KES 250', description: 'Freshly pressed seasonal fruit juice, chilled.'},                            
  { id: 98,  name: 'Still Water',  category: 'Beverages', price: 'KES 200', description: 'Chilled bottled still mineral water.'},                                      
  { id: 99,  name: 'Delmonte',     category: 'Beverages', price: 'KES 400', description: 'Chilled Delmonte premium fruit juice.'},                                    
  { id: 100, name: 'Soda',         category: 'Beverages', price: 'KES 150', description: 'Your favorite chilled soft drink — Coke, Fanta or Sprite.'},      


  // BEERS
  { id: 200, name: 'Balozi',              category: 'Beers', price: 'KES 350', description: 'Smooth, crisp Balozi lager — served ice cold.' },
  { id: 201, name: 'Black Ice',           category: 'Beers', price: 'KES 350', description: 'Sharp, fruity and ice-cold.' },
  { id: 202, name: "Gordon's Pink / Dry", category: 'Beers', price: 'KES 350', description: 'Refreshing gin-based ready-to-drink — pink or dry.' },
  { id: 203, name: 'Guarana',             category: 'Beers', price: 'KES 350', description: 'Energizing Guarana — bright and crisp.' },
  { id: 204, name: 'Guinness',            category: 'Beers', price: 'KES 350', description: 'The iconic dark Irish stout, smooth and creamy.' },
  { id: 205, name: 'Heineken',            category: 'Beers', price: 'KES 400', description: 'Premium Heineken lager — pale, crisp, balanced.' },
  { id: 206, name: 'Heineken Can',        category: 'Beers', price: 'KES 420', description: 'Premium Heineken in a chilled can.' },
  { id: 207, name: 'Pineapple Punch',     category: 'Beers', price: 'KES 350', description: 'Tropical pineapple punch — refreshing and fruity.' },
  { id: 208, name: 'Snapp',               category: 'Beers', price: 'KES 350', description: 'Light, crisp apple-flavored alcoholic drink.' },
  { id: 209, name: 'Tusker Cider',        category: 'Beers', price: 'KES 350', description: 'Crisp apple notes, perfectly chilled.' },
  { id: 210, name: 'Tusker Lager',        category: 'Beers', price: 'KES 350', description: "Kenya's iconic Tusker Lager — bold and refreshing." },
  { id: 211, name: 'Tusker Malt',         category: 'Beers', price: 'KES 350', description: 'Smooth Tusker Malt with a rich, fuller body.' },
  { id: 212, name: 'White Cap',           category: 'Beers', price: 'KES 350', description: 'Classic White Cap — easy-drinking and balanced.' },
  { id: 213, name: 'Hunters Dry',         category: 'Beers', price: 'KES 370', description: 'Crisp, fresh apple character.' },
  { id: 214, name: 'Desperado',           category: 'Beers', price: 'KES 370', description: 'Tequila-flavored beer — bold and citrusy.' },
  { id: 215, name: 'K.O',                 category: 'Beers', price: 'KES 370', description: 'A smooth, easy-drinking favorite.' },
  { id: 216, name: 'Kingfisher',          category: 'Beers', price: 'KES 370', description: 'Premium lager — clean and crisp.' },
  { id: 217, name: 'Manyatta',            category: 'Beers', price: 'KES 370', description: 'Distinctly local, smooth and refreshing.' },
  { id: 218, name: 'Savanna',             category: 'Beers', price: 'KES 370', description: 'Crisp South African apple cider.' },

  // WHISKEY, COGNAC & BRANDY
  { id: 300, name: 'Jack Daniels 750ml',   category: 'Whiskey, Cognac & Brandy', price: 'KES 5,000',  description: 'Iconic Tennessee whiskey — smooth, oaky, unmistakable.' },
  { id: 301, name: 'Jack Daniels 1L',      category: 'Whiskey, Cognac & Brandy', price: 'KES 6,500',  description: "One full liter of the world's favorite Tennessee whiskey." },
  { id: 302, name: 'JW Black Label 1L',    category: 'Whiskey, Cognac & Brandy', price: 'KES 7,200',  description: '12-year blended Scotch — deep and complex.' },
  { id: 303, name: 'JW Black Label 750ml', category: 'Whiskey, Cognac & Brandy', price: 'KES 6,500',  description: 'Smooth and richly layered.' },
  { id: 304, name: 'JW Double Black',      category: 'Whiskey, Cognac & Brandy', price: 'KES 8,500',  description: 'Intensely smoky and full-bodied.' },
  { id: 305, name: 'JW Red Label',         category: 'Whiskey, Cognac & Brandy', price: 'KES 3,000',  description: 'Bold, vibrant blended Scotch.' },
  { id: 306, name: 'Singleton 12',         category: 'Whiskey, Cognac & Brandy', price: 'KES 7,500',  description: 'Smooth single malt with a sweet finish.' },
  { id: 307, name: 'Chivas Regal 12',      category: 'Whiskey, Cognac & Brandy', price: 'KES 7,000',  description: 'Luxurious, balanced blended Scotch.' },
  { id: 308, name: 'Martell VSOP',         category: 'Whiskey, Cognac & Brandy', price: 'KES 8,000',  description: 'Refined cognac — fruity with toasted oak.' },
  { id: 309, name: 'Remy Martin VSOP',     category: 'Whiskey, Cognac & Brandy', price: 'KES 12,000', description: 'Fine Champagne cognac — elegant and rich.' },
  { id: 310, name: 'Hennessy',             category: 'Whiskey, Cognac & Brandy', price: 'KES 10,000', description: 'Hennessy VS — bold, vibrant and balanced.' },
  { id: 311, name: 'Ballantine 750ml',     category: 'Whiskey, Cognac & Brandy', price: 'KES 3,500',  description: 'Smooth, classic blended Scotch.' },
  { id: 312, name: 'Jameson Black Barrel', category: 'Whiskey, Cognac & Brandy', price: 'KES 7,500',  description: 'Rich, intense Irish whiskey, double-charred.' },
  { id: 313, name: 'Jameson 750ml',        category: 'Whiskey, Cognac & Brandy', price: 'KES 3,600',  description: 'Triple-distilled, smooth and balanced.' },
  { id: 314, name: 'Grants 750ml',         category: 'Whiskey, Cognac & Brandy', price: 'KES 3,000',  description: 'Versatile, easy-drinking blended Scotch.' },
  { id: 315, name: 'Famous Grouse',        category: 'Whiskey, Cognac & Brandy', price: 'KES 3,500',  description: "Scotland's favorite blended whisky." },
  { id: 316, name: 'Vat 69 750ml',         category: 'Whiskey, Cognac & Brandy', price: 'KES 2,600',  description: 'Smooth, lightly smoky blended Scotch.' },
  { id: 317, name: 'Jagermeister',         category: 'Whiskey, Cognac & Brandy', price: 'KES 5,500',  description: 'German herbal liqueur, best served ice cold.' },
  { id: 318, name: 'Viceroy 750ml',        category: 'Whiskey, Cognac & Brandy', price: 'KES 2,700',  description: 'Smooth, full-flavored South African brandy.' },

  // WINES & CREAMS
  { id: 400, name: 'Fragolino Red & White',  category: 'Wines & Creams', price: 'KES 3,200', description: 'Italian Fragolino — sweet, lightly sparkling, strawberry notes.' },
  { id: 401, name: 'Freschello Red & White', category: 'Wines & Creams', price: 'KES 2,500', description: 'Soft, easy-drinking Italian wine.' },
  { id: 402, name: '4th Street White & Red', category: 'Wines & Creams', price: 'KES 2,200', description: "South Africa's favorite — fruity and easy to love." },
  { id: 403, name: 'Amarula 1L',             category: 'Wines & Creams', price: 'KES 3,500', description: 'Smooth marula fruit on cream, 1 liter.' },
  { id: 404, name: 'Amarula 350ml',          category: 'Wines & Creams', price: 'KES 2,000', description: 'Silky and indulgent, 350ml.' },
  { id: 405, name: 'Asconi Red',             category: 'Wines & Creams', price: 'KES 3,000', description: 'Moldovan red — rich and well-rounded.' },
  { id: 406, name: 'Baileys 375ml',          category: 'Wines & Creams', price: 'KES 3,500', description: 'Original Irish Cream — luxuriously smooth.' },
  { id: 407, name: 'Black Bird Red',         category: 'Wines & Creams', price: 'KES 2,600', description: 'Bold, fruity and approachable.' },
  { id: 408, name: 'Four Cousins',           category: 'Wines & Creams', price: 'KES 2,200', description: 'Sweet South African wine — fruit-forward.' },
  { id: 409, name: 'Cellar Cask Red & White',category: 'Wines & Creams', price: 'KES 2,200', description: 'Smooth, everyday South African wine.' },
  { id: 410, name: 'Drostdy Hof Red & White',category: 'Wines & Creams', price: 'KES 2,600', description: 'Elegant South African red or white.' },
  { id: 411, name: 'Nederburg',              category: 'Wines & Creams', price: 'KES 3,000', description: 'Refined, balanced South African winery.' },
  { id: 412, name: 'Robertson White & Red',  category: 'Wines & Creams', price: 'KES 2,600', description: 'Fruity, easy-drinking South African wine.' },
  { id: 413, name: 'Rosso Nobile',           category: 'Wines & Creams', price: 'KES 3,800', description: 'Italian red with chocolate and cherry notes.' },
  { id: 414, name: 'Wine by the Glass',      category: 'Wines & Creams', price: 'KES 400',   description: 'A generous pour of our house red or white.' },

  // TEQUILA, GIN & VODKA
  { id: 500, name: 'Tanqueray 1L',     category: 'Tequila, Gin & Vodka', price: 'KES 7,000', description: 'London Dry Gin — crisp, juniper-forward.' },
  { id: 501, name: 'Gordons 750ml',    category: 'Tequila, Gin & Vodka', price: 'KES 3,000', description: 'London Dry Gin — distinctively crisp.' },
  { id: 502, name: 'Beefeater',        category: 'Tequila, Gin & Vodka', price: 'KES 3,500', description: 'Bold juniper and citrus character.' },
  { id: 503, name: 'Gilbey 750ml',     category: 'Tequila, Gin & Vodka', price: 'KES 2,700', description: 'Smooth, balanced, easy-mixing gin.' },
  { id: 504, name: 'Ciroc',            category: 'Tequila, Gin & Vodka', price: 'KES 7,000', description: 'Ultra-Premium vodka — distilled five times from French grapes.' },
  { id: 505, name: 'Absolut Vodka 1L', category: 'Tequila, Gin & Vodka', price: 'KES 3,500', description: 'Clean, smooth Swedish vodka, 1L.' },
  { id: 506, name: 'Smirnoff 750ml',   category: 'Tequila, Gin & Vodka', price: 'KES 2,700', description: 'Triple-distilled and exceptionally smooth.' },
  { id: 507, name: 'Jose Cuervo 1L',   category: 'Tequila, Gin & Vodka', price: 'KES 4,500', description: "World's most-loved tequila, 1L." },
  { id: 508, name: 'Jose Cuervo 750ml',category: 'Tequila, Gin & Vodka', price: 'KES 4,000', description: 'Smooth, golden Mexican tequila.' },
  { id: 509, name: 'Camino 750ml',     category: 'Tequila, Gin & Vodka', price: 'KES 3,800', description: 'Bright, citrusy and agave-forward tequila.' },
  { id: 510, name: 'Malibu',           category: 'Tequila, Gin & Vodka', price: 'KES 3,000', description: 'Caribbean rum with coconut — sweet and tropical.' },
  { id: 511, name: 'Martini Rosso',    category: 'Tequila, Gin & Vodka', price: 'KES 3,500', description: 'Sweet, herbal and richly aromatic vermouth.' },

  // SHOTS
  { id: 600, name: 'Jose Cuervo  Double', category: 'Shots', price: 'KES 600', description: 'Double tequila shot, salt and lime on the side.' },
  { id: 601, name: 'Jose Cuervo  Single', category: 'Shots', price: 'KES 300', description: 'Single shot of golden Jose Cuervo tequila.' },
  { id: 602, name: 'Tanqueray  Double',   category: 'Shots', price: 'KES 700', description: 'Double shot of crisp London Dry Gin.' },
  { id: 603, name: 'Tanqueray  Single',   category: 'Shots', price: 'KES 350', description: 'Single shot of Tanqueray gin.' },
  { id: 604, name: 'J. Walker  Double',   category: 'Shots', price: 'KES 600', description: 'Double shot of smooth, full-bodied Johnnie Walker.' },
  { id: 605, name: 'J. Walker  Single',   category: 'Shots', price: 'KES 300', description: 'Single shot of Johnnie Walker Scotch.' },
  { id: 606, name: 'Jagermeister  Double',category: 'Shots', price: 'KES 600', description: 'Double shot of ice-cold Jägermeister.' },
  { id: 607, name: 'Jagermeister  Single',category: 'Shots', price: 'KES 300', description: 'Single shot of ice-cold Jägermeister.' },
];

const DRINK_CATEGORIES: { label: DrinkCategory; icon: React.ReactNode }[] = [
  { label: 'Beverages',               icon: <Coffee size={14} /> },
  { label: 'Beers',                   icon: <Beer size={14} /> },
  { label: 'Whiskey, Cognac & Brandy',icon: <GlassWater size={14} /> },
  { label: 'Wines & Creams',          icon: <Wine size={14} /> },
  { label: 'Tequila, Gin & Vodka',    icon: <Leaf size={14} /> },
  { label: 'Shots',                   icon: <Sparkles size={14} /> },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function MenuCard({ name, price, description, image }: { name: string; price: string; description: string; image: string }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <span className="absolute right-3 top-3 z-10 rounded-xl bg-white text-[#800020] px-3 py-1.5 text- font-bold shadow-md text-center leading-relaxed">
          {price}
        </span>
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <UtensilsCrossed size={32} className="text-gray-300" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold leading-tight text-gray-900">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">{description}</p>
      </div>
    </article>
  );
}

function FilterPills<T extends string>({
  categories,
  active,
  onChange,
}: {
  categories: { label: T; icon: React.ReactNode }[];
  active: T;
  onChange: (v: T) => void;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 120 : -120, behavior: 'smooth' });
  };

  return (
    <div className="relative flex items-center">
      {/* Left arrow */}
      {showLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 transition-all"
          style={{ color: '#800020' }}
        >
          ‹
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollBehavior: 'smooth' }}
      >
        {categories.map(({ label, icon }) => {
          const on = active === label;
          return (
            <button
              key={label}
              onClick={() => onChange(label)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                on
                  ? 'border-[#800020] bg-[#800020] text-white shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#800020]/40 hover:text-[#800020]'
              }`}
            >
              <span className={on ? 'text-white' : 'text-[#800020]'}>{icon}</span>
              {label}
            </button>
          );
        })}
      </div>

      {/* Right arrow */}
      {showRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 transition-all"
          style={{ color: '#800020' }}
        >
          ›
        </button>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────

function Landing({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden"
      style={{ background: '#FFFAF7' }}
    >
      {/* Warm top accent line */}
      <div className="w-full h-[3px]"
        style={{ background: 'linear-gradient(to right, #800020, #FF8C00, #800020)' }} />

      {/* Header */}
      <header className="flex items-center justify-between px-8 sm:px-12 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: '#800020' }}>
            <span className="text-[15px] font-black tracking-tighter text-white">5PM</span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
            
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-300">
          
        </span>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">

        {/* Open badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white shadow-sm"
          style={{ border: '1px solid rgba(128,0,32,0.15)' }}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF8C00]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.28em]"
            style={{ color: '#800020' }}>5pm MENU</span>
        </div>

        {/* Heading */}
        <h1
          className="mb-5 text-gray-900"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 800,
            fontSize: 'clamp(2.6rem, 7.5vw, 5rem)',
            lineHeight: 1.1,
          }}
        >
          Where every hour<br />
          tastes like{' '}
          <span style={{ color: '#FF8C00' }}>5PM.</span>
        </h1>

        {/* Warm divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-14" style={{ background: 'linear-gradient(to right, transparent, #800020)' }} />
          <span style={{ color: '#FF8C00', fontSize: '14px' }}>✦</span>
          <div className="h-px w-14" style={{ background: 'linear-gradient(to left, transparent, #800020)' }} />
        </div>

        {/* Subtitle */}
        <p className="mb-12 max-w-[260px] text-sm leading-relaxed text-gray-400">
          Slow-fired meats, hearty classics<br />and a bar built for golden hour.
        </p>

        {/* Buttons */}
        <div className="flex w-full max-w-xs flex-col gap-3 sm:flex-row">
          <button
            onClick={() => onNavigate('food')}
            className="flex flex-1 items-center justify-between rounded-xl px-6 py-4 transition-all hover:opacity-90 shadow-sm"
            style={{ background: '#800020' }}
          >
            <div className="text-left">
              <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/50 mb-0.5">Kitchen</p>
              <p className="text-sm font-bold text-white">Food Menu</p>
            </div>
            <span className="text-white/40">→</span>
          </button>

          <button
            onClick={() => onNavigate('drinks')}
            className="flex flex-1 items-center justify-between rounded-xl px-6 py-4 transition-all hover:opacity-90 bg-white shadow-sm"
            style={{ border: '1.5px solid rgba(77, 12, 28, 0.2)' }}
          >
            <div className="text-left">
              <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-gray-400 mb-0.5">Bar</p>
              <p className="text-sm font-bold" style={{ color: '#800020' }}>Drinks Menu</p>
            </div>
            <span style={{ color: 'rgba(78, 14, 30, 0.3)' }}>→</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-5 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300">Nairobi · Kenya</p>
      </footer>

      {/* Warm bottom accent line */}
      <div className="w-full h-[3px]"
        style={{ background: 'linear-gradient(to right, #800020,rgb(236, 199, 153), #800020)' }} />

    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// FOOD MENU PAGE
// ─────────────────────────────────────────────────────────────────────────────

function FoodMenu({ onNavigate }: { onNavigate: (v: View) => void }) {
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('Breakfast');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FOOD_MENU.filter((item) => {
      if (item.category !== activeCategory) return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    });
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-lg font-extrabold transition-colors hover:opacity-75"
            style={{ color: '#800020' }}
          >
            ← Home
          </button>
          <h1 className="text-xl font-extrabold tracking-tight">
            <span style={{ color: '#800020' }}>5PM</span>
            <span className="text-gray-900"> · Food</span>
          </h1>
          <button
            onClick={() => onNavigate('drinks')}
            className="text-lg font-extrabold transition-colors hover:opacity-75"
            style={{ color: '#800020' }}
          >
            Drinks →
          </button>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-3 sm:px-8">
          <FilterPills
            categories={FOOD_CATEGORIES}
            active={activeCategory}
            onChange={(v) => { setActiveCategory(v); setQuery(''); }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 pb-24 sm:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">The Kitchen</p>
          <h2
            className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Food Menu
          </h2>
        </div>

        <div className="relative mb-5">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu…"
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition-all"
            onFocus={(e) => { e.target.style.borderColor = '#800020'; e.target.style.boxShadow = '0 0 0 3px rgba(128,0,32,0.08)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 p-12 text-center text-gray-400">
            No items match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <MenuCard key={item.id} name={item.name} price={item.price} description={item.description} image={item.image} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRINKS MENU PAGE
// ─────────────────────────────────────────────────────────────────────────────

function DrinksMenu({ onNavigate }: { onNavigate: (v: View) => void }) {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>('Beverages');

  const items = useMemo(
    () => DRINKS_MENU.filter((d) => d.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-lg font-extrabold transition-colors hover:opacity-75"
            style={{ color: '#800020' }}
          >
            ← Home
          </button>
          <h1 className="text-xl font-extrabold tracking-tight">
            <span style={{ color: '#800020' }}>5PM</span>
            <span className="text-gray-900"> · Bar</span>
          </h1>
          <button
            onClick={() => onNavigate('food')}
            className="text-lg font-extrabold transition-colors hover:opacity-75"
            style={{ color: '#800020' }}
          >
            Food →
          </button>
        </div>
        <div className="mx-auto max-w-5xl px-5 pb-3 sm:px-8">
          <FilterPills
            categories={DRINK_CATEGORIES}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </header>

      <section className="relative h-[280px] w-full overflow-hidden sm:h-[360px]">
        <img
          src={DRINKS_HERO_IMAGE}
          alt="The 5PM bar"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">The Bar</p>
          <h2
            className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Drinks Menu
          </h2>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-5 py-8 pb-24 sm:px-8">

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-100">
            {items.map((d) => (
              <li
                key={d.id}
                className="flex items-baseline gap-4 px-5 py-4 transition-colors hover:bg-gray-50 sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">{d.name}</h3>
                    <span className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-gray-200 sm:block" />
                  </div>
                
                </div>
                <span className="shrink-0 font-bold" style={{ color: '#800020' }}>{d.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center text-xs uppercase tracking-[0.25em] text-gray-400">
          Please drink responsibly · 18+
        </p>
      </main>
    </div>
  );
}// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>('landing');
  return (
    <>
      {view === 'landing' && <Landing onNavigate={setView} />}
      {view === 'food'    && <FoodMenu onNavigate={setView} />}
      {view === 'drinks'  && <DrinksMenu onNavigate={setView} />}
    </>
  );
}
