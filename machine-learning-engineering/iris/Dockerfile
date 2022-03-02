FROM python:3.7-slim-buster

RUN apt-get update && apt-get install -y python3-dev build-essential pipenv jq

WORKDIR /usr/src/iris

RUN mkdir -p /usr/src/iris

COPY . .

RUN jq -r '.default | to_entries[] | .key + .value.version' Pipfile.lock > requirements.txt

RUN pip3 install -r requirements.txt

CMD ["gunicorn", "app:app", "-w", "4", "-b", ":8080", "-k", "uvicorn.workers.UvicornWorker"]
