import React, { useEffect, useState } from 'react';
import { apiService } from './services/api';
import { Message, FeedbackResponse, PageType } from './types';
import { DialogPage } from './pages/DialogPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { Loading } from './components/Loading';

const App: React.FC = () => {
  const [page, setPage] = useState<PageType>('loading');
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenarioData, setScenarioData] = useState<any>(null);

  // Initialize the app
  useEffect(() => {
    const init = async () => {
      try {
        // Check if backend is running
        const isHealthy = await apiService.checkHealth();
        if (!isHealthy) {
          setError('Сервер недоступен. Пожалуйста, запустите backend на http://localhost:8000');
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
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.sendMessage(message, conversationHistory);
      setConversationHistory(response.conversation_history);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при отправке сообщения');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const feedbackResult = await apiService.evaluateConversation(conversationHistory);
      setFeedback(feedbackResult);
      setPage('feedback');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при оценке диалога');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setConversationHistory([]);
    setFeedback(null);
    setError(null);
    setPage('loading');
    window.location.reload();
  };

  if (error) {
    return (
      <div className="error-page">
        <h1>Ошибка</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Перезагрузить</button>
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
        isLoading={isLoading}
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

export default App;
