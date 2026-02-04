
import { Recipe } from './types';

export const COLORS = {
  primary: '#7DB432', // Asken Green
  secondary: '#FF9500', // Accent orange
  background: '#F7F9F2',
  text: '#333333'
};

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: '豚もも肉とシーフードのトマトシチュー',
    category: 'moderate',
    description: 'たんぱく質不足を解消する、旨味たっぷりのヘルシーシチュー。',
    image: 'https://picsum.photos/seed/stew/600/400',
    ingredients: ['豚もも肉 100g', 'シーフードミックス 100g', '玉ねぎ 1/2個', 'トマト缶 200g', 'ブロッコリー 少量'],
    instructions: [
      'フライパンにオリーブ油を引いて、中火にかけ、玉ねぎ、ブロッコリー、しめじを入れて蓋をする。',
      '玉ねぎが透き通ってきたら、5cmくらいにカットした豚もも肉を広げてのせ、シーフードミックス、トマト水煮を入れて蓋をし、火が通るまで加熱する。',
      '塩胡椒で味を整え、ひと煮立ちさせる。器に盛り、仕上げに粉チーズをふる。'
    ],
    calories: 285,
    protein: 24.5,
    fat: 8.2,
    carbs: 12.1,
    tags: ['#たんぱく質不足解消', '#低カロリー']
  },
  {
    id: '2',
    title: 'ガッツリ！スタミナ豚キムチ丼',
    category: 'heavy',
    description: '肉とご飯でしっかり食べたい時の一品。発酵食品のキムチで代謝アップ！',
    image: 'https://picsum.photos/seed/pork/600/400',
    ingredients: ['豚バラ肉 150g', 'キムチ 80g', 'ごはん 200g', '温泉卵 1個', 'ニラ 少量'],
    instructions: ['豚肉を炒める', 'キムチを加えてさらに炒める', 'ごはんにのせて卵をトッピング'],
    calories: 650,
    protein: 22.0,
    fat: 35.0,
    carbs: 75.0,
    tags: ['#肉', '#ご飯', '#スタミナ']
  },
  {
    id: '3',
    title: '胃腸にやさしい基本のベジスープ',
    category: 'light',
    description: '野菜の甘みが溶け出した、夜遅くても安心のスープ。',
    image: 'https://picsum.photos/seed/soup/600/400',
    ingredients: ['キャベツ 2枚', '人参 1/4本', 'コンソメ 1個', '水 400ml'],
    instructions: ['野菜を1cm角に切る', '水とコンソメで煮込む', '塩で味を整える'],
    calories: 45,
    protein: 1.2,
    fat: 0.1,
    carbs: 8.5,
    tags: ['#野菜を摂りたい', '#低脂質']
  },
  {
    id: '4',
    title: 'やわらか鶏ささみのピカタ',
    category: 'moderate',
    description: '卵の衣でふんわり焼き上げた、高タンパクなメインおかず。',
    image: 'https://picsum.photos/seed/chicken/600/400',
    ingredients: ['鶏ささみ 3本', '卵 1個', '粉チーズ 大さじ1', '小麦粉 適量'],
    instructions: ['ささみを叩いて薄くする', '粉をまぶし、卵液（チーズ入り）にくぐらせる', '弱火で両面焼く'],
    calories: 210,
    protein: 28.0,
    fat: 9.5,
    carbs: 3.2,
    tags: ['#たんぱく質不足解消', '#筋トレ飯']
  },
  {
    id: '5',
    title: 'ねぎと生姜の豆乳スープ',
    category: 'light',
    description: '体が芯から温まる、食物繊維たっぷりの豆乳スープ。',
    image: 'https://picsum.photos/seed/soymilk/600/400',
    ingredients: ['無調整豆乳 200ml', '長ねぎ 1/2本', '生姜 1片', 'きのこ類 適量'],
    instructions: ['ねぎと生姜を刻む', '豆乳以外の材料を煮る', '最後に豆乳を加えて温める'],
    calories: 120,
    protein: 7.5,
    fat: 5.0,
    carbs: 10.2,
    tags: ['#食物繊維をとる', '#冷え性対策']
  }
];
