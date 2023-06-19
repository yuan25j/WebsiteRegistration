from fastapi import FastAPI, HTTPException
from user import User
import storage
import os
from checkin import Checkin, CheckinRequest
app = FastAPI()
from static_files import StaticFileMiddleware

@app.get("/api/registrations")
def get_registrations() -> list[User]:
    return storage.get_registrations()
   

@app.post("/api/registrations")
def new_registration(user: User) -> User:
    try:
        return storage.create_registration(user)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))




@app.get("/api/checkin")
def get_checkins() -> list[Checkin]:
    return storage.get_checkins()

    
@app.post("/api/checkin")
def create_checkin(checkinRequest: CheckinRequest) -> Checkin:
    try:
        return storage.create_checkin(checkinRequest.pid)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

    
@app.post("/api/reset")
def reset() -> str:
    """Development-only route for resetting storage module and adding fake user and checkin."""
    if "MODE" in os.environ and os.environ["MODE"] == "production":
        raise HTTPException(status_code=404, detail="Not Found")
    else:
        storage.reset()
        storage.create_registration(User(pid=710453084, first_name="Kris", last_name="Jordan"))
        storage.create_checkin(710453084)
        storage.create_registration(User(pid=730458275, first_name="John", last_name="Yuan"))
        storage.create_checkin(730458275)
        return "OK"
  

@app.delete("/api/registrations/{pid}")
def delete(pid: int):
    try:
        storage.delete_user(pid)
        return "OK"
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
 
app.mount("/", StaticFileMiddleware("../static", "index.html"))  