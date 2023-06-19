## Setup

Open the project in a VSCode DevContainer.

### Front-end Setup

1. Open a new terminal, change the working directory to `frontend` and run `npm install`.
2. Run `ng serve` to begin the front-end development server.

### Back-end Setup

1. Open a new terminal, change the working directory to `backend` and run `python3 -m pip install -r requirements.txt`
2. Run `uvicorn main:app --reload` to begin the back-end development server.

1. Open a third terminal window and run `caddy start`. You should now be able to browse to `localhost:8080` and see the starter app.
