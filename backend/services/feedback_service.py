# Make sure to use the 'app.' prefix
from db.database import get_db
from db.models import Feedback
from fastapi import Depends, APIRouter, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/upload_feedback")
async def record_feedback(
    audio: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not audio.content_type or not audio.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=400,
            detail="please upload an audio file"
        )

    audio_data = await audio.read()

    if not audio_data:
        raise HTTPException(
            status_code=400,
            detail="the audio file is empty"
        )

    new_data = Feedback(
        voice_recording=audio_data
    )
    
    db.add(new_data)
    db.commit()
    db.refresh(new_data)

    return {
        "message": "audio uploaded successfully",
        "feedback_id": new_data.id
    }