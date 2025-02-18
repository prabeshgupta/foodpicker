import React, { useState, useMemo } from 'react';
import { UtensilsCrossed, Search, Sparkles, Sun, Moon } from 'lucide-react';

type MealType = 'Breakfast' | 'Launch' | 'Snacks' | 'Dinner';

const mealOptions: Record<MealType, string[]> = {
  Breakfast: [
    'Hot Water', 'Sattu', 'Milk Sattu', 'Milk', 'Almonds', 'Green Tea', 'Black Tea',
    'Lemon Tea', 'Milk Tea', 'Coffee', 'Milk Coffee', 'Apple', 'Banana', 'Donut',
    'Milk Tea & Biscuit', 'Milk Tea & Donut', 'Milk Tea & Bread', 'Milk Tea & Puff',
    'Black Tea & Biscuit', 'Black Tea & Donut', 'Black Tea & Bread', 'Black Tea & Puff',
    'Milk & Kellog Chocos', 'Bread & Jam', 'Boiled Egg', 'Boiled Egg & Chana'
  ],
  Launch: [
    'Dal, Bhat & Saag', 'Dal, Bhat & Tarkari', 
    'Dal, Bhat, Saag & Cucumber/Carrot/Radish',
    'Dal, Bhat, Tarkari & Cucumber/Carrot/Radish', 
    'Dal, Bhat, Saag & Curd',
    'Dal, Bhat, Tarkari & Curd', 
    'Dal, Bhat, Saag & Achar', 
    'Dal, Bhat, Tarkari & Achar',
    'Dal, Bhat, Saag & Ghee', 
    'Dal, Bhat, Tarkari & Ghee', 
    'Dal, Bhat, Saag & Egg',
    'Dal, Bhat, Tarkari & Egg', 
    'Bhat & Tarkari',
    'Bhat, Tarkari & Cucumber/Carrot/Radish',
    'Bhat, Tarkari & Achar',
    'Bhat, Tarkari & Egg',
    'Bhat, Tarkari & Ghee',
    'Dal, Bhat, Saag & Papad',
    'Dal, Bhat, Tarkari & Papad',
    'Bhat, Tarkari & Papad',
    'Bhat & Chicken Gravy',
    'Dal, Bhat & Chicken Choila',
    'Dal, Bhat & Chicken Roast',
    'Dal, Bhat & Fish Fry',
    'Bhat & Fish Gravy',
    'Dal, Bhat & Fish Choila',
    'Bhat & Goat Gravy',
    'Bhat, Chicken Gravy & Bitten Rice',
    'Dal, Bhat, Chicken Choila & Bitten Rice',
    'Bhat, Fish Gravy & Bitten Rice',
    'Dal, Bhat, Fish Choila & Bitten Rice',
    'Bhat, Goat Gravy & Bitten Rice',
    'Bhat, Goat Gravy & Ghee',
    'Bhat & Kwati',
    'Bhat & Goat Leg Soup',
    'Milk & Bhat'
  ],
  Snacks: [
    'Sattu', 'Juice', 'Pizza', 'MoMo', 'MoMo & Naan', 'Burger', 'Sausage',
    'Burger & Sausage', 'Pasta', 'Almonds', 'Peanuts', 'Fruits', 'Sell Roti',
    'Bitten Rice & Dalmod', 'Bitten Rice, Egg & Bhatmas', 'Chicken Roast',
    'Chicken Choila', 'Bitten Rice & Chicken Roast', 'Bitten Rice & Chicken Choila',
    'Bitten Rice, Chicken Roast & Dalmod', 'Bitten Rice, Chicken Choila & Dalmod',
    'Bitten Rice & Goat Gravy', 'Bitten Rice & Fish Choila', 'Curd & Bitten Rice',
    'Bitten Rice, Chicken Roast & Mohi/Juice', 'Bitten Rice, Chicken Choila & Mohi/Juice',
    'Samosa', 'Chocolate', 'Cake', 'Sweats', 'Fried Rice', 'Chowmein', 'Chatpate',
    'Panipuri', 'Chop Pakauda', 'Noodles', 'Bitten Rice & Noodles', 'Cooked Noodles',
    'Black Tea', 'Lemon Tea', 'Milk Tea', 'Coffee', 'Milk Coffee'
  ],
  Dinner: [
    'Roti & Achar', 'Roti & Tarkari', 'Egg Biryani', 'Kheer & Roti & Tarkari',
    'Pasta', 'Momo & Naan', 'Dal, Bhat & Saag', 'Dal, Bhat & Tarkari',
    'Dal, Bhat, Saag & Cucumber/Carrot/Radish', 'Dal, Bhat, Tarkari & Cucumber/Carrot/Radish',
    'Dal, Bhat, Saag & Curd', 'Dal, Bhat, Tarkari & Curd', 'Dal, Bhat, Saag & Achar',
    'Dal, Bhat, Tarkari & Achar', 'Dal, Bhat, Saag & Ghee', 'Dal, Bhat, Tarkari & Ghee',
    'Dal, Bhat, Saag & Egg', 'Dal, Bhat, Tarkari & Egg', 'Bhat & Tarkari',
    'Bhat, Tarkari & Cucumber/Carrot/Radish', 'Bhat, Tarkari & Achar', 'Bhat, Tarkari & Egg',
    'Bhat, Tarkari & Ghee', 'Dal, Bhat, Saag & Papad', 'Dal, Bhat, Tarkari & Papad',
    'Bhat & Chicken Gravy', 'Dal, Bhat & Chicken Choila', 'Dal, Bhat & Fish Fry',
    'Bhat & Fish Gravy', 'Dal, Bhat & Fish Choila', 'Bhat & Goat Gravy',
    'Bhat, Chicken Gravy & Bitten Rice', 'Dal, Bhat, Chicken Choila & Bitten Rice',
    'Bhat, Fish Gravy & Bitten Rice', 'Dal, Bhat, Fish Choila & Bitten Rice',
    'Bhat, Goat Gravy & Bitten Rice', 'Bhat, Goat Gravy & Ghee', 'Bhat & Kwati',
    'Bhat & Goat Leg Soup', 'Milk & Bhat'
  ]
};

function App() {
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [randomMeal, setRandomMeal] = useState<string | null>(null);

  const filteredOptions = useMemo(() => {
    if (!selectedMeal) return [];
    return mealOptions[selectedMeal].filter(option =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedMeal, searchQuery]);

  const getRandomMeal = () => {
    if (!selectedMeal) return;
    const randomIndex = Math.floor(Math.random() * mealOptions[selectedMeal].length);
    setRandomMeal(mealOptions[selectedMeal][randomIndex]);
  };

  return (
    <div 
      className={`min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : ''
      }`}
      style={{
        backgroundImage: isDarkMode 
          ? 'none'
          : 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=2070")',
      }}
    >
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-yellow-400" />
            )}
          </button>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <UtensilsCrossed className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
            Food Picker
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Discover your perfect meal for any time of the day
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {(['Breakfast', 'Launch', 'Snacks', 'Dinner'] as MealType[]).map((meal) => (
            <button
              key={meal}
              onClick={() => {
                setSelectedMeal(meal);
                setRandomMeal(null);
                setSearchQuery('');
              }}
              className={`
                py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base
                ${selectedMeal === meal
                  ? 'bg-yellow-400 text-gray-900 shadow-lg transform scale-105'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                }
              `}
            >
              {meal}
            </button>
          ))}
        </div>

        {selectedMeal && (
          <div className={`rounded-lg p-4 sm:p-6 shadow-xl transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white bg-opacity-95'
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className={`text-xl sm:text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {selectedMeal} Options
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search meals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <button
                  onClick={getRandomMeal}
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Random</span>
                </button>
              </div>
            </div>

            {randomMeal && (
              <div className="mb-6 p-4 bg-yellow-400 rounded-lg text-gray-900 font-semibold animate-fade-in">
                🎲 Random Suggestion: {randomMeal}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 sm:p-3 rounded-lg transition-all duration-300 text-sm sm:text-base hover:transform hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>

            {filteredOptions.length === 0 && (
              <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No meals found matching your search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;