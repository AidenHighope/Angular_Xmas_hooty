export interface RootObject {
  count: number;
  quizzes: Quiz[];
}

export interface Quiz {
  _id: string;
  question: string;
  answer: string;
  badAnswers: string[];
  category: string;
  difficulty: string;
}
