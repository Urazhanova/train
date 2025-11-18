import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetDemo = () => {
    navigate('/trainer');
  };

  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>Feedback Trainer</h1>
          </div>
          <nav className="nav">
            <a href="#features" className="nav-link">Возможности</a>
            <a href="#about" className="nav-link">О тренажере</a>
            <button className="cta-button" onClick={handleGetDemo}>
              Получить демо
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">
              Научитесь давать конструктивную обратную связь
            </h2>
            <p className="hero-subtitle">
              Практикуйтесь в реальных сценариях с AI-персонажами и получайте мгновенную обратную связь
            </p>
            <button className="hero-button" onClick={handleGetDemo}>
              Начать тренировку
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Почему Feedback Trainer?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-персонажи</h3>
              <p>Взаимодействуйте с реалистичными виртуальными персонажами, которые реагируют как настоящие люди</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Подробная оценка</h3>
              <p>Получайте детальный анализ ваших навыков по 4 ключевым метрикам: открытость, эмпатия, ясность, конструктивность</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Мгновенная обратная связь</h3>
              <p>Узнайте свои сильные стороны и области развития сразу после завершения тренировки</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Бесконечная практика</h3>
              <p>Тренируйтесь столько раз, сколько вам нужно, чтобы овладеть навыком</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Доступно везде</h3>
              <p>Используйте на любом устройстве, в любое время, из любого места</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Структурированное обучение</h3>
              <p>Следуйте структурированным сценариям, разработанным для максимального обучения</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="how-it-works">
        <div className="container">
          <h2 className="section-title">Как это работает</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Выберите сценарий</h3>
              <p>Начните с реального сценария общения, который часто встречается в работе</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Взаимодействуйте с персонажем</h3>
              <p>Проведите естественный диалог с виртуальным персонажом на основе AI</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Получите оценку</h3>
              <p>Система анализирует вашу коммуникацию и выдает подробный отчет</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Улучшайтесь</h3>
              <p>Используйте рекомендации для совершенствования своих навыков</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Чему вы научитесь</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="check-mark">✓</span>
              <span>Давать конструктивную критику без обидных слов</span>
            </div>
            <div className="benefit-item">
              <span className="check-mark">✓</span>
              <span>Слушать активно и сопереживать сотруднику</span>
            </div>
            <div className="benefit-item">
              <span className="check-mark">✓</span>
              <span>Четко выражать свои мысли и ожидания</span>
            </div>
            <div className="benefit-item">
              <span className="check-mark">✓</span>
              <span>Создавать план действий совместно с другим человеком</span>
            </div>
            <div className="benefit-item">
              <span className="check-mark">✓</span>
              <span>Справляться с защитными реакциями</span>
            </div>
            <div className="benefit-item">
              <span className="check-mark">✓</span>
              <span>Находить баланс между критикой и поддержкой</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Готовы улучшить свои навыки коммуникации?</h2>
            <p>Начните бесплатный тренинг прямо сейчас</p>
            <button className="cta-button-large" onClick={handleGetDemo}>
              Получить демо
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Feedback Trainer. Все права защищены.</p>
          <div className="footer-links">
            <a href="#privacy">Политика конфиденциальности</a>
            <a href="#terms">Условия использования</a>
            <a href="#contact">Связаться</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
