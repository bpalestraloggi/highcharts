from fastapi import APIRouter, HTTPException
from typing import List
from models import Proposal, ProposalCreate
from datetime import datetime, timedelta
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/api/proposals", tags=["proposals"])

# MongoDB connection
mongo_url: str = os.environ.get('MONGO_URL', '')
client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sales_dashboard')]


@router.get("", response_model=List[Proposal])
async def get_proposals() -> List[Proposal]:
    """Get all proposals"""
    proposals = await db.proposals.find({}, {"_id": 0}).to_list(1000)
    
    # Convert datetime strings back to datetime objects if needed
    for proposal in proposals:
        if isinstance(proposal.get('created_at'), str):
            proposal['created_at'] = datetime.fromisoformat(proposal['created_at'])
    
    return proposals


@router.post("", response_model=Proposal)
async def create_proposal(proposal_input: ProposalCreate) -> Proposal:
    """Create a new proposal"""
    # Get the next proposal ID
    last_proposal = await db.proposals.find_one({}, sort=[("id", -1)])
    next_id = (last_proposal["id"] + 1) if last_proposal else 1525
    
    proposal_dict = proposal_input.model_dump()
    proposal_dict["id"] = next_id
    proposal_dict["status"] = "rascunho"
    
    proposal = Proposal(**proposal_dict)
    
    # Convert to dict and serialize datetime
    doc = proposal.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.proposals.insert_one(doc)
    return proposal


@router.post("/generate-ai")
async def generate_proposal_with_ai() -> Proposal:
    """Generate a proposal using AI (mock implementation)"""
    # This would use actual AI to generate proposals in production
    
    # Get the next proposal ID
    last_proposal = await db.proposals.find_one({}, sort=[("id", -1)])
    next_id = (last_proposal["id"] + 1) if last_proposal else 1525
    
    new_proposal = Proposal(
        id=next_id,
        client="Novo Cliente",
        value=95000.0,
        status="rascunho",
        created_by="Agente SDR",
        date=datetime.utcnow().strftime("%Y-%m-%d"),
        valid_until=(datetime.utcnow() + timedelta(days=14)).strftime("%Y-%m-%d")
    )
    
    doc = new_proposal.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.proposals.insert_one(doc)
    return new_proposal


@router.patch("/{proposal_id}/status")
async def update_proposal_status(proposal_id: int, status: str) -> dict:
    """Update proposal status"""
    result = await db.proposals.update_one(
        {"id": proposal_id},
        {"$set": {"status": status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Proposal not found")
    
    return {"message": "Proposal status updated", "status": status}
