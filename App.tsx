
import React, { useState, useEffect } from 'react';
import { Category, Recipe, ScreenState } from './types';
import { RECIPES } from './constants';
import { Heart, ChevronLeft, Share2, Info, Home } from 'lucide-react';

// Helpers for Daily Limit
const SELECTION_KEY = 'asken_last_selection_date';
const RECIPE_ID_KEY = 'asken_last_recipe_id';

const getTodayString = () => new Date().toISOString().split('T')[0];

const Header: React.FC<{ onHome: () => void; showHome?: boolean }> = ({ onHome, showHome = true }) => (
  <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
      <div className="w-8 h-8 rounded-full bg-[#7DB432] flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#7DB432]/30"></div>
        </div>
      </div>
      <h1 className="font-bold text-lg text-[#7DB432]">今日のおまかせレシピ</h1>
    </div>
    {showHome && (
      <button onClick={onHome} className="text-gray-400 hover:text-[#7DB432]">
        <Home size={24} />
      </button>
    )}
  </header>
);

const SurveyScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="p-6 max-w-md mx-auto h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-50 w-full">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#7DB432]">
            <Info size={40} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
          あなたに合ったレシピを出すための<br />簡単アンケートです🔍
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          今の気分に合わせて、AI栄養士が<br />最適な健康メニューを提案します。
        </p>
        <button
          onClick={onComplete}
          className="w-full bg-[#7DB432] text-white py-4 rounded-full font-black text-lg shadow-lg shadow-green-100 active:scale-95 transition-all"
        >
          進む
        </button>
      </div>
    </div>
  );
};

const SelectScreen: React.FC<{ 
  onSelect: (category: Category) => void; 
  onFavorites: () => void;
  alreadyDone: boolean;
  onShowLastResult: () => void;
}> = ({ onSelect, onFavorites, alreadyDone, onShowLastResult }) => {
  return (
    <div className="p-6 max-w-md mx-auto flex flex-col items-center gap-8 py-8">
      <div className="text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4 bg-gray-100">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="avatar" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 leading-snug">
          今日の食事は<br /><span className="text-[#7DB432]">なににする？</span>
        </h2>
      </div>

      <div className="w-full space-y-4">
        {alreadyDone ? (
          <button
            onClick={onShowLastResult}
            className="w-full bg-[#7DB432] text-white py-5 px-6 rounded-full shadow-md font-bold text-lg active:bg-[#6a9a2a] transition-colors"
          >
            本日のレシピを見る
          </button>
        ) : (
          <>
            <button
              onClick={() => onSelect('heavy')}
              className="w-full bg-[#333333] text-white py-5 px-6 rounded-full shadow-md font-bold text-lg active:bg-black transition-colors"
            >
              しっかり食べたい
            </button>
            <button
              onClick={() => onSelect('moderate')}
              className="w-full bg-[#333333] text-white py-5 px-6 rounded-full shadow-md font-bold text-lg active:bg-black transition-colors"
            >
              ほどよく食べたい
            </button>
            <button
              onClick={() => onSelect('light')}
              className="w-full bg-[#333333] text-white py-5 px-6 rounded-full shadow-md font-bold text-lg active:bg-black transition-colors"
            >
              軽く済ませたい
            </button>
          </>
        )}
        <button
          onClick={onFavorites}
          className="w-full bg-[#BDBDBD] text-white py-5 px-6 rounded-full shadow-md font-bold text-lg active:bg-gray-500 transition-colors mt-4"
        >
          お気に入り一覧
        </button>
      </div>
    </div>
  );
};

const LoadingScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 bg-[#7DB432] text-white text-center">
      <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center animate-pulse mb-8 border-4 border-white/30">
        <div className="text-7xl animate-bounce">🍳</div>
      </div>
      <h2 className="text-2xl font-black mb-2 italic tracking-widest">SELECTING...</h2>
      <p className="opacity-90 font-medium">1日1回限定！<br />あなたにぴったりの健康レシピを<br />選んでいます</p>
    </div>
  );
};

const ResultScreen: React.FC<{
  recipe: Recipe;
  isLiked: boolean;
  onLike: () => void;
  onGoToFavorites: () => void;
}> = ({ recipe, isLiked, onLike, onGoToFavorites }) => {
  const handleExternalLink = () => {
    window.open('https://more.asken.jp/', '_blank');
  };

  return (
    <div className="p-4 max-w-md mx-auto animate-in fade-in duration-500">
      <div className="text-left mb-4">
        <h2 className="text-gray-800 font-bold text-xl">今日のレシピは…</h2>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <div className="text-[#7DB432] text-xs font-bold mb-2">
            {recipe.category === 'heavy' ? '肉・米のおかず' : recipe.category === 'moderate' ? '魚・野菜のおかず' : '汁物・ヘルシー'}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-8 leading-tight">
            {recipe.title}
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                <Heart 
                  size={28} 
                  className={isLiked ? "text-red-500" : "text-gray-300"} 
                  fill={isLiked ? "currentColor" : "none"} 
                />
              </div>
              <button
                onClick={onLike}
                className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                  isLiked 
                  ? 'bg-red-50 text-red-500 border border-red-200' 
                  : 'bg-gray-100 text-gray-500 border border-gray-200'
                }`}
              >
                いいね！
              </button>
            </div>
            
            <button
              onClick={handleExternalLink}
              className="w-full bg-[#333333] text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:bg-black transition-colors"
            >
              レシピ詳細
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onGoToFavorites}
        className="w-full bg-gray-50 text-[#7DB432] border border-green-100 rounded-2xl font-bold py-5 mt-6 hover:bg-green-50 transition-colors shadow-sm"
      >
        お気に入りレシピ一覧へ
      </button>
      
      <p className="text-center text-xs text-gray-400 mt-6 font-medium">
        ※おまかせレシピは1日1回までです。<br />明日また新しいレシピに出会えます。
      </p>
    </div>
  );
};

const FavoritesScreen: React.FC<{
  favorites: Recipe[];
  onSelect: (recipe: Recipe) => void;
  onBack: () => void;
}> = ({ favorites, onSelect, onBack }) => {
  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-gray-400"><ChevronLeft size={30} /></button>
        <h2 className="text-2xl font-black text-gray-800">お気に入りレシピ</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-24 text-gray-300">
          <Heart size={64} className="mx-auto mb-6 opacity-10" />
          <p className="font-bold text-gray-400">お気に入りはまだありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {favorites.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => onSelect(recipe)}
              className="flex flex-col gap-2 cursor-pointer group"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm">
                  <Heart size={14} fill="currentColor" />
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#7DB432] mb-0.5">
                  {recipe.tags[0]}
                </div>
                <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">
                  {recipe.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('SURVEY');
  const [selectedCategory, setSelectedCategory] = useState<Category>('moderate');
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [alreadyDoneToday, setAlreadyDoneToday] = useState(false);

  useEffect(() => {
    // Check daily limit and favorites
    const lastDate = localStorage.getItem(SELECTION_KEY);
    const lastId = localStorage.getItem(RECIPE_ID_KEY);
    const today = getTodayString();

    if (lastDate === today && lastId) {
      setAlreadyDoneToday(true);
      const found = RECIPES.find(r => r.id === lastId);
      if (found) setCurrentRecipe(found);
    }
    
    // Check if survey was done
    const surveyDone = localStorage.getItem('asken_survey_done');
    if (surveyDone) {
      setScreen('SELECT');
    }
  }, []);

  const handleSurveyComplete = () => {
    localStorage.setItem('asken_survey_done', 'true');
    setScreen('SELECT');
  };

  const handleCategorySelect = (cat: Category) => {
    if (alreadyDoneToday) return; 
    setSelectedCategory(cat);
    setScreen('GACHA'); // Internally still use GACHA screen state for loading
  };

  const handleSelectionFinish = () => {
    const filtered = RECIPES.filter(r => r.category === selectedCategory);
    const random = filtered[Math.floor(Math.random() * filtered.length)] || RECIPES[0];
    
    // Save daily limit
    const today = getTodayString();
    localStorage.setItem(SELECTION_KEY, today);
    localStorage.setItem(RECIPE_ID_KEY, random.id);
    
    setCurrentRecipe(random);
    setAlreadyDoneToday(true);
    setScreen('RESULT');
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === recipe.id);
      if (exists) return prev.filter(f => f.id !== recipe.id);
      return [...prev, recipe];
    });
  };

  const isLiked = currentRecipe ? favorites.some(f => f.id === currentRecipe.id) : false;

  const handleHome = () => {
    setScreen('SELECT');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {screen !== 'GACHA' && screen !== 'SURVEY' && (
        <Header onHome={handleHome} />
      )}

      <main>
        {screen === 'SURVEY' && <SurveyScreen onComplete={handleSurveyComplete} />}

        {screen === 'SELECT' && (
          <SelectScreen 
            onSelect={handleCategorySelect} 
            onFavorites={() => setScreen('FAVORITES')} 
            alreadyDone={alreadyDoneToday}
            onShowLastResult={() => setScreen('RESULT')}
          />
        )}

        {screen === 'GACHA' && <LoadingScreen onFinish={handleSelectionFinish} />}

        {screen === 'RESULT' && currentRecipe && (
          <ResultScreen
            recipe={currentRecipe}
            isLiked={isLiked}
            onLike={() => toggleFavorite(currentRecipe)}
            onGoToFavorites={() => setScreen('FAVORITES')}
          />
        )}

        {screen === 'FAVORITES' && (
          <FavoritesScreen
            favorites={favorites}
            onSelect={(r) => {
              window.open('https://more.asken.jp/', '_blank');
            }}
            onBack={handleHome}
          />
        )}
      </main>

      {/* Persistent Footer Logo Branding */}
      <footer className="py-8 flex flex-col items-center gap-2 opacity-20">
        <div className="w-10 h-10 rounded-full bg-[#7DB432] flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-full"></div>
        </div>
        <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">ASKEN Inc.</p>
      </footer>
    </div>
  );
}
