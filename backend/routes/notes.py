from fastapi import APIRouter, HTTPException
from typing import List
from models import Note, NoteCreate
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/api/notes", tags=["notes"])

# MongoDB connection
mongo_url: str = os.environ.get('MONGO_URL', '')
client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sales_dashboard')]


@router.get("", response_model=List[Note])
async def get_notes() -> List[Note]:
    """Get all notes"""
    notes = await db.notes.find({}, {"_id": 0}).to_list(1000)
    
    # Convert datetime strings back to datetime objects if needed
    for note in notes:
        if isinstance(note.get('created_at'), str):
            note['created_at'] = datetime.fromisoformat(note['created_at'])
    
    return notes


@router.post("", response_model=Note)
async def create_note(note_input: NoteCreate) -> Note:
    """Create a new note"""
    note_dict = note_input.model_dump()
    note = Note(**note_dict)
    
    # Convert to dict and serialize datetime
    doc = note.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.notes.insert_one(doc)
    return note


@router.delete("/{note_id}")
async def delete_note(note_id: str) -> dict:
    """Delete a note"""
    result = await db.notes.delete_one({"id": note_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return {"message": "Note deleted"}
