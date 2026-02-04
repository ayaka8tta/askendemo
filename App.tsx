
import React, { useState, useEffect, useCallback } from 'react';
import { Category, Recipe, ScreenState, SurveyAnswers } from './types';
import { RECIPES, COLORS } from './constants';
import { Heart, ChevronLeft, ChevronRight, Share2, Info, Menu, X, Home } from 'lucide-react';

// Components
const Header: React.FC<{ onHome: () => void; onFavorites: () => void }> = ({ onHome, onFavorites }) => (
  <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
      <div className="w-8 h-8 rounded-full bg-[#7DB432] flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#7DB432]/30"></div>
        </div>
      </div>
      <h1 className="font-bold text-xl text-[#7DB432]">あすけん</h1>
    </div>
    <div className="flex items-center gap-4">
      <button onClick={onFavorites} className="text-gray-500 hover:text-[#7DB432]">
        <Heart size={24} />
      </button>
      <button className="text-gray-500">
        <Menu size={24} />
      </button>
    </div>
  </header>
);

const SurveyScreen: React.FC<{ onComplete: (answers: SurveyAnswers) => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({
    hasApp: null,
    frequency: '',
    duration: '',
    concern: ''
  });

  const questions = [
    {
      key: 'hasApp',
      label: 'あすけんアプリをお持ちですか？',
      options: [
        { label: 'はい', value: true },
        { label: 'いいえ', value: false }
      ]
    },
    {
      key: 'frequency',
      label: 'あすけんはどれくらい使っていますか？',
      options: ['毎日', '週に数回', 'たまに', '使っていない']
    },
    {
      key: 'duration',
      label: '食事の記録はどれくらい続いていますか？',
      options: ['始めたばかり', '1ヶ月未満', '1ヶ月〜半年', '半年以上']
    },
    {
      key: 'concern',
      label: '食事でいま一番悩んでいることはどれですか？',
      options: ['ダイエット', '筋肉をつけたい', '健康維持', '肌荒れ・美容']
    }
  ];

  const handleSelect = (val: any) => {
    const q = questions[step];
    setAnswers(prev => ({ ...prev, [q.key]: val }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({ ...answers, [q.key]: val });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto h-[calc(100vh-64px)] flex flex-col justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-50">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-[#F0F7E6] text-[#7DB432] rounded-full px-4 py-1 text-sm font-bold flex items-center gap-1">
            <Info size={14} /> 簡易アンケート ({step + 1}/{questions.length})
          </div>
        </div>
        <h2 className="text-xl font-bold text-center mb-8 leading-relaxed">
          あなたに合ったレシピを出すための<br/>簡単アンケートです🔍
        </h2>

        <div className="space-y-4">
          {questions[step].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(typeof opt === 'string' ? opt : opt.value)}
              className="w-full py-4 px-6 rounded-full border-2 border-gray-100 hover:border-[#7DB432] hover:bg-green-50 transition-all text-center font-medium text-lg text-gray-700"
            >
              {typeof opt === 'string' ? opt : opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SelectScreen: React.FC<{ onSelect: (category: Category) => void }> = ({ onSelect }) => {
  return (
    <div className="p-6 max-w-md mx-auto flex flex-col items-center gap-8 py-12">
      <div className="relative text-center">
        <div className="w-24 h-24 rounded-full bg-[#7DB432] mx-auto mb-4 flex items-center justify-center text-white text-4xl overflow-hidden border-4 border-white shadow-lg">
          <img src="https://picsum.photos/seed/avatar/200/200" alt="avatar" className="object-cover w-full h-full" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 tracking-wider">
          今日の食事は<br/><span className="text-[#7DB432]">なににする？</span>
        </h2>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={() => onSelect('heavy')}
          className="w-full group bg-[#333] hover:bg-black text-white p-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="block font-bold text-xl">しっかり食べたい</span>
              <span className="text-gray-400 text-sm">→ 肉、ご飯、麺</span>
            </div>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => onSelect('moderate')}
          className="w-full group bg-white border-2 border-[#7DB432] text-[#333] p-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="block font-bold text-xl">ほどよく食べたい</span>
              <span className="text-gray-600 text-sm">→ 魚、野菜</span>
            </div>
            <ChevronRight className="group-hover:translate-x-1 transition-transform text-[#7DB432]" />
          </div>
        </button>

        <button
          onClick={() => onSelect('light')}
          className="w-full group bg-white border-2 border-gray-200 text-[#333] p-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="block font-bold text-xl">軽く済ませたい</span>
              <span className="text-gray-600 text-sm">→ 汁物</span>
            </div>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      <button className="text-gray-400 font-medium underline mt-4">
        レシピ一覧
      </button>
    </div>
  );
};

const GachaScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center p-8 text-center bg-[#7DB432]">
      <div className="relative">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center animate-bounce shadow-2xl overflow-hidden border-8 border-white/30">
           <div className="text-6xl">🥘</div>
        </div>
        <div className="mt-8 text-white">
          <h2 className="text-2xl font-black mb-2 animate-pulse">レシピを選び中...</h2>
          <p className="opacity-80">あなたにぴったりの健康メニューを<br/>探しています</p>
        </div>
      </div>
    </div>
  );
};

const ResultScreen: React.FC<{
  recipe: Recipe;
  isLiked: boolean;
  onLike: () => void;
  onDetails: () => void;
  onRedo: () => void;
}> = ({ recipe, isLiked, onLike, onDetails, onRedo }) => {
  return (
    <div className="p-4 max-w-md mx-auto flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="text-center py-2">
        <h2 className="text-[#7DB432] font-black text-xl tracking-tight">
          今日のレシピは…
        </h2>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <div className="flex gap-2 mb-3 flex-wrap">
            {recipe.tags.map(tag => (
              <span key={tag} className="text-xs font-bold text-[#7DB432] bg-green-50 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-black text-gray-800 mb-6 leading-snug">
            {recipe.title}
          </h3>

          <div className="flex gap-4 items-center">
            <button
              onClick={onLike}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full border-2 transition-all font-bold ${
                isLiked ? 'bg-red-50 border-red-500 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              いいね！
            </button>
            <button
              onClick={onDetails}
              className="flex-[1.5] bg-[#333] text-white py-3 rounded-full font-bold shadow-lg hover:bg-black transition-colors"
            >
              レシピ詳細
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onRedo}
        className="text-gray-400 font-bold py-4 hover:text-[#7DB432] transition-colors"
      >
        もう一度ガチャを回す
      </button>
    </div>
  );
};

const DetailsScreen: React.FC<{ recipe: Recipe; onBack: () => void }> = ({ recipe, onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 bg-white/90 backdrop-blur px-4 py-4 flex items-center justify-between z-10">
        <button onClick={onBack} className="text-gray-600"><ChevronLeft size={28} /></button>
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full bg-[#7DB432] flex items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-full"></div>
           </div>
           <span className="font-bold text-gray-800">あすけん</span>
        </div>
        <button className="text-gray-600"><Share2 size={24} /></button>
      </div>

      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />

      <div className="p-6">
        <h2 className="text-2xl font-black mb-4">{recipe.title}</h2>

        <div className="grid grid-cols-4 gap-2 mb-8 bg-gray-50 p-4 rounded-2xl text-center">
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">エネルギー</div>
            <div className="font-black text-[#7DB432]">{recipe.calories}kcal</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">たんぱく質</div>
            <div className="font-black text-[#7DB432]">{recipe.protein}g</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">脂質</div>
            <div className="font-black text-[#7DB432]">{recipe.fat}g</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">炭水化物</div>
            <div className="font-black text-[#7DB432]">{recipe.carbs}g</div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-black text-xl mb-4 border-l-4 border-[#7DB432] pl-3">材料</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h3 className="font-black text-xl mb-4 border-l-4 border-[#7DB432] pl-3">作り方</h3>
          <ol className="space-y-6">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7DB432] text-white flex items-center justify-center font-bold text-xs mt-1">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-green-50 rounded-3xl p-6 border border-green-100 mb-8">
           <div className="flex gap-4 items-start">
              <div className="w-20 h-28 bg-white rounded border border-gray-200 flex-shrink-0 flex items-center justify-center p-2">
                 <img src="https://picsum.photos/seed/book/100/150" alt="Book" className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">📖 このレシピが載っている本</h4>
                <p className="text-xs text-gray-600 mb-3">あすけん公式 やせた人の冷蔵庫、これ入ってます！ あすけん栄養士のおすすめ！最強やせ食材で10分ごはん</p>
                <button className="bg-white border border-[#7DB432] text-[#7DB432] px-3 py-1 rounded-full text-xs font-bold">
                  Amazonで購入
                </button>
              </div>
           </div>
        </div>

        <div className="bg-[#7DB432] rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-black mb-2">あすけんで食事を記録しよう！</h3>
          <p className="text-sm opacity-90 mb-6">AI栄養士があなたの食事にアドバイス。<br/>まずは無料でダウンロード！</p>
          <button className="bg-white text-[#7DB432] px-8 py-4 rounded-full font-black shadow-xl">
            アプリをダウンロード
          </button>
        </div>
      </div>
    </div>
  );
};

const FavoritesScreen: React.FC<{
  favorites: Recipe[];
  onSelect: (recipe: Recipe) => void;
  onBack: () => void;
}> = ({ favorites, onSelect, onBack }) => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-gray-600"><ChevronLeft size={28} /></button>
        <h2 className="text-2xl font-black text-gray-800">お気に入りレシピ</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
           <Heart size={48} className="mx-auto mb-4 opacity-20" />
           <p>お気に入りのレシピはまだありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => onSelect(recipe)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer"
            >
              <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover" />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="text-xs font-bold text-gray-800 line-clamp-2 mb-2 leading-tight">
                  {recipe.title}
                </h3>
                <div className="text-[10px] text-[#7DB432] font-bold">
                  {recipe.tags[0]}
                </div>
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
  const [surveyDone, setSurveyDone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('moderate');
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Check if survey was done previously (simulated)
  useEffect(() => {
    const saved = localStorage.getItem('asken_survey_done');
    if (saved) {
      setSurveyDone(true);
      setScreen('SELECT');
    }
  }, []);

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    console.log('Survey answers:', answers);
    setSurveyDone(true);
    localStorage.setItem('asken_survey_done', 'true');
    setScreen('SELECT');
  };

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setScreen('GACHA');
  };

  const handleGachaFinish = () => {
    const filtered = RECIPES.filter(r => r.category === selectedCategory);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentRecipe(random);
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

  return (
    <div className="min-h-screen pb-10">
      {screen !== 'DETAILS' && (
        <Header
          onHome={() => setScreen(surveyDone ? 'SELECT' : 'SURVEY')}
          onFavorites={() => setScreen('FAVORITES')}
        />
      )}

      <main>
        {screen === 'SURVEY' && <SurveyScreen onComplete={handleSurveyComplete} />}

        {screen === 'SELECT' && <SelectScreen onSelect={handleCategorySelect} />}

        {screen === 'GACHA' && <GachaScreen onFinish={handleGachaFinish} />}

        {screen === 'RESULT' && currentRecipe && (
          <ResultScreen
            recipe={currentRecipe}
            isLiked={isLiked}
            onLike={() => toggleFavorite(currentRecipe)}
            onDetails={() => setScreen('DETAILS')}
            onRedo={() => setScreen('SELECT')}
          />
        )}

        {screen === 'DETAILS' && currentRecipe && (
          <DetailsScreen recipe={currentRecipe} onBack={() => setScreen('RESULT')} />
        )}

        {screen === 'FAVORITES' && (
          <FavoritesScreen
            favorites={favorites}
            onSelect={(r) => {
              setCurrentRecipe(r);
              setScreen('DETAILS');
            }}
            onBack={() => setScreen(surveyDone ? 'SELECT' : 'SURVEY')}
          />
        )}
      </main>

      {/* Persistent Bottom Tab (Mockup style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2 px-4 z-50 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => setScreen('SELECT')} className={`flex flex-col items-center gap-1 ${screen === 'SELECT' ? 'text-[#7DB432]' : 'text-gray-400'}`}>
          <Home size={20} />
          <span className="text-[10px] font-bold">ホーム</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Menu size={20} />
          <span className="text-[10px] font-bold">メニュー</span>
        </button>
        <button onClick={() => setScreen('FAVORITES')} className={`flex flex-col items-center gap-1 ${screen === 'FAVORITES' ? 'text-[#7DB432]' : 'text-gray-400'}`}>
          <Heart size={20} />
          <span className="text-[10px] font-bold">お気に入り</span>
        </button>
      </nav>
    </div>
  );
}
