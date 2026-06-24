from fastapi import APIRouter, HTTPException
from typing import List
from models import Agent
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/api/agents", tags=["agents"])

# MongoDB connection
mongo_url: str = os.environ.get('MONGO_URL', '')
client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sales_dashboard')]


@router.get("", response_model=List[Agent])
async def get_agents() -> List[Agent]:
    """Get all agents"""
    agents = await db.agents.find({}, {"_id": 0}).to_list(1000)
    return agents


@router.patch("/{agent_id}/status")
async def toggle_agent_status(agent_id: str, status: str) -> dict:
    """Toggle agent status (ativo/pausado)"""
    result = await db.agents.update_one(
        {"id": agent_id},
        {"$set": {"status": status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    return {"message": f"Agent status updated to {status}", "status": status}


@router.post("/{agent_id}/run")
async def run_agent(agent_id: str) -> dict:
    """Execute an agent (mock implementation)"""
    # This would trigger actual AI agent execution in production
    result = await db.agents.update_one(
        {"id": agent_id},
        {"$set": {"last_run": "agora"}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    return {"message": "Agent execution started", "agent_id": agent_id}


@router.post("/seed")
async def seed_agents() -> dict:
    """Seed initial agents data"""
    agents = [
        {
            "id": "1",
            "name": "Agente SDR",
            "type": "sdr",
            "description": "Qualifica leads automaticamente e agenda reuniões",
            "status": "ativo",
            "tasks": 45,
            "success_rate": 78,
            "last_run": "2 horas atrás"
        },
        {
            "id": "2",
            "name": "Gerador de Propostas",
            "type": "proposta",
            "description": "Cria propostas comerciais personalizadas",
            "status": "ativo",
            "tasks": 23,
            "success_rate": 92,
            "last_run": "30 min atrás"
        },
        {
            "id": "3",
            "name": "Assistente de Follow-up",
            "type": "followup",
            "description": "Gerencia follow-ups e mantém leads engajados",
            "status": "pausado",
            "tasks": 67,
            "success_rate": 85,
            "last_run": "1 dia atrás"
        },
        {
            "id": "4",
            "name": "Analisador de Leads",
            "type": "analise",
            "description": "Analisa e pontua leads baseado em critérios",
            "status": "ativo",
            "tasks": 156,
            "success_rate": 88,
            "last_run": "5 min atrás"
        }
    ]
    
    # Clear existing and insert new
    await db.agents.delete_many({})
    await db.agents.insert_many(agents)
    
    return {"message": "Agents seeded successfully", "count": len(agents)}
