import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from '../types';
import { MessageBubble } from '../components/MessageBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { Loading } from '../components/Loading';

interface DialogPageProps {
  conversationHistory: Message[];
  isWaitingForBackend: boolean;
  showTypingIndicator: boolean;
  onSendMessage: (message: string) => void;
  onFinish: () => void;
  characterInfo?: {
    name: string;
    age: number;
    position: string;
    tenure: string;
    strengths: string;
    challenges: string;
  };
  situation?: string;
  initialMessage?: string;
}

export const DialogPage: React.FC<DialogPageProps> = ({
  conversationHistory,
  isWaitingForBackend,
  showTypingIndicator,
  onSendMessage,
  onFinish,
  characterInfo,
  situation,
  initialMessage,
}) => {
  const navigate = useNavigate();
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
        <div className="header-top">
          <div>
            <h1>Тренажер обратной связи</h1>
            <p>Практикуйте навыки обратной связи с сотрудником</p>
          </div>
          <button className="back-button" onClick={() => navigate('/')}>
            ← На главную
          </button>
        </div>
        <div className="message-counter">
          Ваши ответы: {messageCount}/{maxMessages}
        </div>
      </div>

      {characterInfo && (
        <div className="character-info-section">
          <div className="character-card">
            <div className="character-header">
              <h2>👩‍💼 {characterInfo.name}</h2>
              <p className="character-subtitle">{characterInfo.age} лет • {characterInfo.position}</p>
            </div>

            <div className="character-details">
              <div className="detail-item">
                <span className="label">В компании:</span>
                <span className="value">{characterInfo.tenure}</span>
              </div>
              <div className="detail-item">
                <span className="label">Сильные стороны:</span>
                <span className="value">{characterInfo.strengths}</span>
              </div>
              <div className="detail-item">
                <span className="label">Вызовы:</span>
                <span className="value">{characterInfo.challenges}</span>
              </div>
            </div>

            {situation && (
              <div className="situation-text">
                {situation.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            )}

            {initialMessage && (
              <div className="initial-message-hint">
                <p className="hint-label">💬 Начните разговор, дав Дарине обратную связь:</p>
                <p className="hint-text">"{initialMessage}"</p>
                <p className="hint-note">Или сформулируйте свой вариант для открытия диалога...</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="messages-container">
        {conversationHistory.map((msg, idx) => (
          <MessageBubble key={idx} content={msg.content} sender={msg.role} />
        ))}
        {showTypingIndicator && <TypingIndicator />}
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
            disabled={isWaitingForBackend}
            rows={3}
          />
          <div className="button-group">
            <button
              className="send-button"
              onClick={handleSend}
              disabled={isWaitingForBackend || !inputValue.trim()}
            >
              {isWaitingForBackend ? 'Отправка...' : 'Отправить'}
            </button>
            {canFinish && (
              <button className="finish-button" onClick={onFinish} disabled={isWaitingForBackend || showTypingIndicator}>
                Завершить и получить оценку
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
