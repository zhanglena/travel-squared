# from fastapi.testclient import TestClient
# from main import app
# from queries.accounts import AccountQueries


# client = TestClient(app)


# class AccountQueriesMock:
#     def get_all_accounts(self):
#         return []

#     def create_account(self, user, hashed_password):
#         response = {}
#         response.update(user)
#         return response


# def test_list_users():
#     app.dependency_overrides[AccountQueries] = AccountQueriesMock

#     response = client.get("/api/users/")

#     assert response.status_code == 200
#     assert response.json() == {[]}

#     app.dependency_overrides = {}
