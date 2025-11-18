from groq import Groq
from typing import List, Dict, Any


class GroqService:
    """Service for handling Groq API interactions"""

    def __init__(self, api_key: str):
        self.client = Groq(api_key=api_key)
        self.model = "llama-3.3-70b-versatile"

        # System prompt for the manager feedback scenario
        self.system_prompt = """Ты опытный руководитель, который даёт конструктивную обратную связь своему сотруднику.

Сценарий: Сотрудник выполнил проект, но были какие-то проблемы с коммуникацией в команде.
Твоя задача: дать обратную связь в конструктивной, эмпатичной форме.

Правила:
1. Будь профессиональным, но дружелюбным
2. Начни с признания хорошей работы
3. Объясни проблему конкретно
4. Предложи решение или совет
5. Заверши позитивной ноткой
6. Ответы должны быть на русском языке
7. Ответы должны быть коротко (2-3 предложения максимум)

Не давай сразу всю обратную связь - ведите диалог естественным образом."""

    def get_initial_scenario(self) -> str:
        """Get the initial message to start the scenario"""
        return """Привет! Спасибо, что нашёл время. Мне хотелось бы обсудить проект, над которым ты работал.

У меня есть несколько наблюдений, которые я хочу обсудить с тобой. Готов ли ты выслушать?"""

    def get_feedback_response(self, user_message: str, conversation_history: List[Dict[str, str]]) -> str:
        """Get manager's response to user message"""

        # Prepare messages for API
        messages = []

        # Add conversation history
        for msg in conversation_history:
            messages.append({
                "role": msg.role,
                "content": msg.content
            })

        # Add current user message
        messages.append({
            "role": "user",
            "content": user_message
        })

        try:
            # Add system prompt as first message
            messages.insert(0, {
                "role": "system",
                "content": self.system_prompt
            })

            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=300,
            )

            return response.choices[0].message.content
        except Exception as e:
            print(f"Groq API error: {str(e)}")
            raise


class DialogueScenarios:
    """Predefined scenarios for feedback conversations"""

    SCENARIOS = {
        "manager_feedback": {
            "title": "Руководитель даёт обратную связь",
            "description": "Сотрудник выполнил проект, но была слабая коммуникация в команде",
            "initial_message": """Привет! Спасибо, что нашёл время. Мне хотелось бы обсудить проект, над которым ты работал.

У меня есть несколько наблюдений. Готов ли ты их выслушать?""",
            "target_duration": 6,  # messages
        }
    }

    @classmethod
    def get_scenario(cls, scenario_key: str) -> Dict[str, Any]:
        return cls.SCENARIOS.get(scenario_key)
