from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv
from services.groq_service import GroqService
from services.evaluator import FeedbackEvaluator

load_dotenv()

app = FastAPI(title="Feedback Trainer API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
groq_service = GroqService(api_key=os.getenv("GROQ_API_KEY"))
evaluator = FeedbackEvaluator()


# Data models
class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class DialogRequest(BaseModel):
    user_message: str
    conversation_history: List[Message]


class DialogResponse(BaseModel):
    assistant_message: str
    conversation_history: List[Message]


class FeedbackRequest(BaseModel):
    conversation_history: List[Message]


class FeedbackResponse(BaseModel):
    score: float  # 0-100
    communication_score: float
    empathy_score: float
    clarity_score: float
    feedback: str
    strengths: List[str]
    improvements: List[str]


# Endpoints
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Feedback Trainer API is running"}


@app.post("/api/dialog", response_model=DialogResponse)
async def chat(request: DialogRequest):
    """Process user message and get assistant response"""
    try:
        # Get response from Groq
        assistant_response = groq_service.get_feedback_response(
            user_message=request.user_message,
            conversation_history=request.conversation_history
        )

        # Update conversation history
        new_history = request.conversation_history.copy()
        new_history.append(Message(role="user", content=request.user_message))
        new_history.append(Message(role="assistant", content=assistant_response))

        return DialogResponse(
            assistant_message=assistant_response,
            conversation_history=new_history
        )
    except Exception as e:
        print(f"Dialog endpoint error: {str(e)}")
        return DialogResponse(
            assistant_message="Извините, произошла ошибка. Попробуйте ещё раз.",
            conversation_history=request.conversation_history
        )


@app.post("/api/evaluate", response_model=FeedbackResponse)
async def evaluate_conversation(request: FeedbackRequest):
    """Evaluate the entire conversation and provide feedback"""
    try:
        feedback = evaluator.evaluate(request.conversation_history)
        return feedback
    except Exception as e:
        return {
            "error": str(e),
            "score": 0,
            "feedback": "Ошибка при оценке диалога"
        }


@app.get("/api/init-scenario")
async def init_scenario():
    """Initialize a new feedback scenario"""
    scenario = groq_service.get_initial_scenario()
    return scenario


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
