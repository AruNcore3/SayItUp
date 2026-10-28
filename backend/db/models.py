from db.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import LargeBinary,Integer,String

class Feedback(Base):
    __tablename__ = "feedback"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    voice_recording: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)
    audio_transcribe: Mapped[str] = mapped_column(String, nullable=True)