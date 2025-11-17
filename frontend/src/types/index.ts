export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface DialogResponse {
  assistant_message: string;
  conversation_history: Message[];
}

export interface FeedbackResponse {
  score: number;
  communication_score: number;
  empathy_score: number;
  clarity_score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface Scenario {
  initial_message: string;
  conversation_history: Message[];
}

export type PageType = 'loading' | 'dialog' | 'feedback';
