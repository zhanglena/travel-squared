import json
from fastapi.testclient import TestClient
from main import app
from queries.requests import RequestQueries
from authenticator import authenticator

client = TestClient(app)


def getaccountdatamock():
    return {"id": 1, "username": "lena"}


class RequestQueriesMock:
    def get_all(self):
        return []

    def create(self, request, requester, created_at):
        response = {
            "id": 1,
            "requester": 1,
            "txt": "string",
            "created_at": "2022-12-12",
        }
        response.update(request)
        return response


def test_list_request():

    app.dependency_overrides[RequestQueries] = RequestQueriesMock

    response = client.get("/api/requests/")

    assert response.status_code == 200
    assert response.json() == []

    app.dependency_overrides = {}


def test_create_request():
    app.dependency_overrides[RequestQueries] = RequestQueriesMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = getaccountdatamock
    request = {"txt": "need recommendations"}

    response = client.post("/api/requests/", json.dumps(request))

    assert response.status_code == 200
    assert response.json()["txt"] == "need recommendations"
    assert response.json()["id"] == 1
