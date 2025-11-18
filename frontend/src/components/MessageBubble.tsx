import React from 'react';

interface MessageBubbleProps {
  content: string;
  sender: 'user' | 'assistant';
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ content, sender }) => {
  const isManager = sender === 'assistant';

  return (
    <div className={`message-bubble ${isManager ? 'manager' : 'employee'}`}>
      <div className="message-header">
        {isManager ? '👩‍💼 Дарина' : '👤 Вы'}
      </div>
      <p className="message-content">{content}</p>
    </div>
  );
};
