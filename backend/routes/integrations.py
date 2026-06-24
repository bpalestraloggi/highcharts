from fastapi import APIRouter, HTTPException
from typing import List
from models import Integration, IntegrationUpdate
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/api/integrations", tags=["integrations"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sales_dashboard')]


@router.get("", response_model=List[Integration])
async def get_integrations():
    """Get all integrations"""
    integrations = await db.integrations.find({}, {"_id": 0}).to_list(1000)
    return integrations


@router.patch("/{integration_id}")
async def update_integration(integration_id: str, update: IntegrationUpdate):
    """Update integration settings"""
    update_data = update.model_dump(exclude_unset=True)
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    result = await db.integrations.update_one(
        {"id": integration_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Integration not found")
    
    return {"message": "Integration updated successfully"}


@router.post("/{integration_id}/test")
async def test_integration(integration_id: str):
    """Test integration connection (mock implementation)"""
    # This would actually test the integration in production
    integration = await db.integrations.find_one({"id": integration_id}, {"_id": 0})
    
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    
    if not integration.get("connected"):
        raise HTTPException(status_code=400, detail="Integration is not connected")
    
    return {
        "message": f"Connection to {integration['name']} successful",
        "status": "connected"
    }


@router.post("/seed")
async def seed_integrations():
    """Seed initial integrations data"""
    integrations = [
        {
            "id": "monday",
            "name": "Monday.com",
            "description": "Sincronize tarefas e projetos automaticamente",
            "connected": True,
            "logo": "📊",
            "config": {"apiKey": "****", "workspace": "sales-team"}
        },
        {
            "id": "email",
            "name": "Email (SMTP)",
            "description": "Envie propostas e follow-ups por email",
            "connected": True,
            "logo": "📧",
            "config": {"host": "smtp.gmail.com", "port": "587"}
        },
        {
            "id": "calendar",
            "name": "Google Calendar",
            "description": "Agende reuniões automaticamente",
            "connected": False,
            "logo": "📅",
            "config": {}
        },
        {
            "id": "crm",
            "name": "CRM Personalizado",
            "description": "Integre com seu CRM existente",
            "connected": False,
            "logo": "💼",
            "config": {}
        }
    ]
    
    # Clear existing and insert new
    await db.integrations.delete_many({})
    await db.integrations.insert_many(integrations)
    
    return {"message": "Integrations seeded successfully", "count": len(integrations)}
