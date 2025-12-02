from typing import Dict, List

from fastapi import APIRouter
from schemas import STask, STaskAdd, STaskId
from repository import TaskRepository

router = APIRouter(
    prefix="/tasks",
)


@router.post("")
async def add_task(
    task: STaskAdd,
) -> STaskId:
    task_id = await TaskRepository.add_one(task)
    return {"ok": True, "task_id": task_id}


@router.get("", response_model=Dict[str, List[STask]])
async def get_tasks() -> Dict[str, List[STask]]:
    tasks = await TaskRepository.find_all()
    return {"tasks": tasks}