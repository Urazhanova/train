import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageBubble } from '../components/MessageBubble';
import { Loading } from '../components/Loading';

interface DialogPageProps {
  conversationHistory: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onFinish: () => void;
}

export const DialogPage: React.FC<DialogPageProps> = ({
  conversationHistory,
  isLoading,
  onSendMessage,
  onFinish,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const messageCount = conversationHistory.filter((m) => m.role === 'user').length;
  const maxMessages = 8;
  const canFinish = messageCount >= 3; // Минимум 3 сообщения от пользователя

  return (
    <div className="dialog-page">
      <div className="dialog-header">
        <h1>Тренажер обратной связи</h1>
        <p>Диалог с руководителем</p>
        <div className="message-counter">
          Ваши ответы: {messageCount}/{maxMessages}
        </div>
      </div>

      <div className="messages-container">
        {conversationHistory.map((msg, idx) => (
          <MessageBubble key={idx} content={msg.content} sender={msg.role} />
        ))}
        {isLoading && <Loading />}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <textarea
            className="message-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите ваш ответ..."
            disabled={isLoading}
            rows={3}
          />
          <div className="button-group">
            <button
              className="send-button"
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
            {canFinish && (
              <button className="finish-button" onClick={onFinish} disabled={isLoading}>
                Завершить и получить оценку
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
