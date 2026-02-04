
export type Category = 'heavy' | 'moderate' | 'light';

export interface Recipe {
  id: string;
  title: string;
  category: Category;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  tags: string[];
}

export type ScreenState = 'SURVEY' | 'SELECT' | 'GACHA' | 'RESULT' | 'FAVORITES' | 'DETAILS';

export interface SurveyAnswers {
  hasApp: boolean | null;
  frequency: string;
  duration: string;
  concern: string;
}
