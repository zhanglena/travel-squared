# from fastapi.testclient import TestClient
# from main import app
# from queries.reviews import ReviewQueries


# client = TestClient(app)


# def getaccountdatamock():
#     return {"id": 1, "username": "sarah"}


# class ReviewQueriesMock:
#     def get_all_reviews(self, state, city):
#         return []


# def test_list_request():

#     app.dependency_overrides[ReviewQueries] = ReviewQueriesMock

#     response = client.get("/api/reviews/{state}/{city}/")

#     assert response.status_code == 200
#     assert response.json() == []

#     app.dependency_overrides = {}
