from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
import uuid


class Task(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    priority: str = "media"  # alta, media, baixa
    status: str = "pendente"  # pendente, em-progresso, concluida
    due_date: Optional[str] = None
    monday_sync: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "media"
    due_date: Optional[str] = None


class Note(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    category: str = "Geral"
    date: str = Field(default_factory=lambda: datetime.utcnow().strftime("%Y-%m-%d"))
    created_at: datetime = Field(default_factory=datetime.utcnow)


class NoteCreate(BaseModel):
    title: str
    content: str
    category: str = "Geral"


class Agent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # sdr, proposta, followup, analise
    description: str
    status: str = "ativo"  # ativo, pausado
    tasks: int = 0
    success_rate: int = 0
    last_run: Optional[str] = None


class Proposal(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: int
    client: str
    value: float
    status: str = "rascunho"  # rascunho, enviada, negociacao, aprovada, rejeitada
    created_by: str = "Manual"
    date: str = Field(default_factory=lambda: datetime.utcnow().strftime("%Y-%m-%d"))
    valid_until: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ProposalCreate(BaseModel):
    client: str
    value: float
    valid_until: str
    created_by: str = "Agente SDR"


class Integration(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    description: str
    connected: bool = False
    logo: str
    config: dict = {}


class IntegrationUpdate(BaseModel):
    connected: Optional[bool] = None
    config: Optional[dict] = None
