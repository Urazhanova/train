from typing import List, Dict, Any
from groq import Groq
import os
import json


class FeedbackEvaluator:
    """Service for evaluating user communication during feedback scenario"""

    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.3-70b-versatile"

    def evaluate(self, conversation_history: List[Dict[str, str]]) -> Dict[str, Any]:
        """Evaluate the entire conversation"""

        # Build conversation text
        conversation_text = self._build_conversation_text(conversation_history)

        # Get evaluation from Groq
        evaluation_prompt = """Оцени диалог между руководителем и сотрудником по критериям:

1. **Открытость** (0-100): готовность слушать критику и принимать обратную связь
2. **Эмпатия** (0-100): проявление понимания позиции собеседника
3. **Ясность** (0-100): четкость выражения своих мыслей и вопросов
4. **Конструктивность** (0-100): предложение решений, конкретные вопросы

Диалог:
{}

Ответь в формате JSON:
{{
  "openness_score": <число>,
  "empathy_score": <число>,
  "clarity_score": <число>,
  "constructiveness_score": <число>,
  "overall_score": <число (среднее)>,
  "strengths": ["сильная сторона 1", "сильная сторона 2"],
  "improvements": ["область для развития 1", "область для развития 2"],
  "general_feedback": "Общая оценка диалога на 1-2 предложения"
}}

Оценивай реально, но справедливо. Напомни, что это демо-тренажер.""".format(conversation_text)

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "user",
                        "content": evaluation_prompt
                    }
                ],
                temperature=0.3,
                max_tokens=800,
            )

            # Parse response
            response_text = response.choices[0].message.content

            # Try to extract JSON
            try:
                # Find JSON in response
                json_start = response_text.find('{')
                json_end = response_text.rfind('}') + 1
                if json_start >= 0 and json_end > json_start:
                    json_str = response_text[json_start:json_end]
                    evaluation_data = json.loads(json_str)
                else:
                    evaluation_data = self._create_default_evaluation()
            except json.JSONDecodeError:
                print(f"Failed to parse JSON: {response_text}")
                evaluation_data = self._create_default_evaluation()

            # Format response
            return {
                "score": evaluation_data.get("overall_score", 50),
                "communication_score": evaluation_data.get("openness_score", 50),
                "empathy_score": evaluation_data.get("empathy_score", 50),
                "clarity_score": evaluation_data.get("clarity_score", 50),
                "feedback": evaluation_data.get("general_feedback", "Спасибо за участие в тренажёре!"),
                "strengths": evaluation_data.get("strengths", ["Хорошее начало"]),
                "improvements": evaluation_data.get("improvements", ["Продолжай развиваться"])
            }

        except Exception as e:
            print(f"Evaluation error: {str(e)}")
            return self._create_default_evaluation()

    def _build_conversation_text(self, conversation_history: List[Dict[str, str]]) -> str:
        """Convert conversation history to formatted text"""
        text = ""
        for msg in conversation_history:
            # Handle both Pydantic objects and dicts
            role_val = msg.role if hasattr(msg, 'role') else msg["role"]
            content_val = msg.content if hasattr(msg, 'content') else msg['content']
            role = "Руководитель:" if role_val == "assistant" else "Сотрудник:"
            text += f"\n{role}\n{content_val}\n"
        return text

    def _create_default_evaluation(self) -> Dict[str, Any]:
        """Create default evaluation when API fails"""
        return {
            "score": 60,
            "communication_score": 60,
            "empathy_score": 60,
            "clarity_score": 60,
            "feedback": "Спасибо за участие в тренажёре обратной связи!",
            "strengths": ["Активное участие в диалоге"],
            "improvements": ["Можно развивать навык слушания"]
        }
