from fastapi import APIRouter, HTTPException
from typing import List
from models import Task, TaskCreate
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

# MongoDB connection
mongo_url: str = os.environ.get('MONGO_URL', '')
client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sales_dashboard')]


@router.get("", response_model=List[Task])
async def get_tasks() -> List[Task]:
    """Get all tasks"""
    tasks = await db.tasks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert datetime strings back to datetime objects if needed
    for task in tasks:
        if isinstance(task.get('created_at'), str):
            task['created_at'] = datetime.fromisoformat(task['created_at'])
    
    return tasks


@router.post("", response_model=Task)
async def create_task(task_input: TaskCreate) -> Task:
    """Create a new task"""
    task_dict = task_input.model_dump()
    task = Task(**task_dict)
    
    # Convert to dict and serialize datetime
    doc = task.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.tasks.insert_one(doc)
    return task


@router.patch("/{task_id}/status")
async def update_task_status(task_id: str, status: str) -> dict:
    """Update task status"""
    result = await db.tasks.update_one(
        {"id": task_id},
        {"$set": {"status": status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": "Task status updated", "status": status}


@router.delete("/{task_id}")
async def delete_task(task_id: str) -> dict:
    """Delete a task"""
    result = await db.tasks.delete_one({"id": task_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": "Task deleted"}


@router.post("/sync-monday")
async def sync_monday() -> dict:
    """Sync tasks with Monday.com (mock implementation)"""
    # This would integrate with Monday.com API in production
    return {"message": "Tasks synced with Monday.com", "synced_count": 5}
