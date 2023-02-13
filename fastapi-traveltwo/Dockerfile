FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY authenticator.py authenticator.py


# Copy all of the directories that contain your application
# code
COPY migrations migrations
COPY queries queries
COPY routers routers
COPY tests tests

RUN pip install -r requirements.txt
CMD python -m migrations up && uvicorn main:app --reload --host 0.0.0.0
