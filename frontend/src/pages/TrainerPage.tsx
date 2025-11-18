import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Message, FeedbackResponse, PageType } from '../types';
import { DialogPage } from './DialogPage';
import { FeedbackPage } from './FeedbackPage';
import { Loading } from '../components/Loading';

export const TrainerPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<PageType>('loading');
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [isWaitingForBackend, setIsWaitingForBackend] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenarioData, setScenarioData] = useState<any>(null);

  // Set background on mount
  useEffect(() => {
    document.body.classList.add('trainer-page');
    return () => {
      document.body.classList.remove('trainer-page');
    };
  }, []);

  // Initialize the app
  useEffect(() => {
    const init = async () => {
      try {
        // Check if backend is running
        const isHealthy = await apiService.checkHealth();
        if (!isHealthy) {
          setError('Сервер недоступен. Пожалуйста, запустите backend на http://localhost:8888');
          return;
        }

        // Initialize the scenario
        const scenario = await apiService.initDialog();
        setScenarioData(scenario);
        setConversationHistory(scenario.conversation_history || []);
        setPage('dialog');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка инициализации');
        console.error('Initialization error:', err);
      }
    };

    init();
  }, []);

  const handleSendMessage = async (message: string) => {
    setError(null);

    try {
      // Step 1: Add user message to history and show it immediately
      const updatedHistoryWithUserMessage: Message[] = [
        ...conversationHistory,
        { role: 'user', content: message }
      ];
      setConversationHistory(updatedHistoryWithUserMessage);

      // Step 2: Send request to backend (send original history, backend will add user message)
      setIsWaitingForBackend(true);
      const response = await apiService.sendMessage(message, conversationHistory);
      setIsWaitingForBackend(false);

      // Step 3: Show typing indicator for 2 seconds
      setShowTypingIndicator(true);

      // Step 4: After 2 seconds, show Darina's response
      setTimeout(() => {
        setConversationHistory(response.conversation_history);
        setShowTypingIndicator(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при отправке сообщения');
      setIsWaitingForBackend(false);
      setShowTypingIndicator(false);
    }
  };

  const handleFinish = async () => {
    setIsEvaluating(true);
    setError(null);

    try {
      const feedbackResult = await apiService.evaluateConversation(conversationHistory);
      setFeedback(feedbackResult);
      setPage('feedback');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при оценке диалога');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRestart = () => {
    setConversationHistory([]);
    setFeedback(null);
    setError(null);
    setIsWaitingForBackend(false);
    setShowTypingIndicator(false);
    setIsEvaluating(false);
    setPage('loading');
    window.location.reload();
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (error) {
    return (
      <div className="error-page">
        <h1>Ошибка</h1>
        <p>{error}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => window.location.reload()}>Перезагрузить</button>
          <button onClick={handleBackHome}>На главную</button>
        </div>
      </div>
    );
  }

  if (page === 'loading') {
    return <Loading />;
  }

  if (page === 'dialog') {
    return (
      <DialogPage
        conversationHistory={conversationHistory}
        isWaitingForBackend={isWaitingForBackend}
        showTypingIndicator={showTypingIndicator}
        onSendMessage={handleSendMessage}
        onFinish={handleFinish}
        characterInfo={scenarioData?.character_info}
        situation={scenarioData?.situation}
        initialMessage={scenarioData?.initial_message}
      />
    );
  }

  if (page === 'feedback' && feedback) {
    return <FeedbackPage feedback={feedback} onRestart={handleRestart} />;
  }

  return <Loading />;
};
