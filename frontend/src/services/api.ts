import axios from 'axios';
import { Message, DialogResponse, FeedbackResponse, Scenario } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Check if backend is running
  async checkHealth(): Promise<boolean> {
    try {
      await api.get('/health');
      return true;
    } catch {
      return false;
    }
  },

  // Initialize a new scenario
  async initDialog(): Promise<Scenario> {
    try {
      const response = await api.get('/api/init-scenario');
      return response.data;
    } catch (error) {
      console.error('Error initializing dialog:', error);
      throw new Error('Не удалось инициализировать сценарий');
    }
  },

  // Send a message and get response
  async sendMessage(
    userMessage: string,
    conversationHistory: Message[]
  ): Promise<DialogResponse> {
    try {
      const response = await api.post('/api/dialog', {
        user_message: userMessage,
        conversation_history: conversationHistory,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Ошибка при отправке сообщения');
    }
  },

  // Evaluate the entire conversation
  async evaluateConversation(
    conversationHistory: Message[]
  ): Promise<FeedbackResponse> {
    try {
      const response = await api.post('/api/evaluate', {
        conversation_history: conversationHistory,
      });
      return response.data;
    } catch (error) {
      console.error('Error evaluating conversation:', error);
      throw new Error('Ошибка при оценке диалога');
    }
  },
};
