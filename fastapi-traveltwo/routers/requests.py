from fastapi import APIRouter, Depends
from typing import Optional, Union
from queries.requests import (
    Error,
    RequestIn,
    RequestQueries,
    RequestOut,
    RequestOutWithUsername,
    CommentIn,
    CommentOut,
    CommentQueries,
    CommentOutWithUsername,
)
from authenticator import authenticator
from datetime import date


router = APIRouter()


@router.post("/api/requests/", response_model=Union[RequestOut, Error])
def create_request(
    request: RequestIn,
    repo: RequestQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    requester = account_data["id"]
    created_at = date.today()
    return repo.create(request, requester, created_at)


@router.get("/api/requests/", response_model=list[RequestOutWithUsername])
def get_all(
    repo: RequestQueries = Depends(),
):
    return repo.get_all()


@router.get(
    "/api/accounts/{username}/requests/",
    response_model=list[RequestOutWithUsername]
)
def get_all_request_for_username(
    username: str,
    repo: RequestQueries = Depends(),
):
    return repo.get_all_request_for_username(username)


@router.put(
    "/api/requests/{request_id}/", response_model=Union[RequestOut, Error]
)
def update_request(
    request_id: int,
    vacation: RequestIn,
    repo: RequestQueries = Depends(),
) -> Union[Error, RequestOut]:
    return repo.update(request_id, vacation)


@router.get("/api/requests/{request_id}/", response_model=Optional[RequestOut])
def get_one_request(
    request_id: int,
    repo: RequestQueries = Depends(),
) -> RequestOut:
    requests = repo.get_one(request_id)
    return requests


@router.post("/api/comments/", response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    repo: CommentQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    commenter = account_data["id"]
    created_at = date.today()
    return repo.create(comment, commenter, created_at)


@router.get(
    "/api/requests/{request_id}/comments/",
    response_model=Union[list[CommentOutWithUsername], Error],
)
def get_all_comments_for_one_request(
    request_id: int,
    repo: CommentQueries = Depends(),
):
    return repo.get_all(request_id)


# @router.put(
    # "/api/comments/{comment_id}/",
    # response_model=Union[CommentOut, Error]
# )
# def update_comment(
#     comment_id: int,
#     comment: CommentIn,
#     repo: CommentQueries = Depends(),
# ) -> Union[Error, CommentOut]:
#     return repo.update(comment_id, comment)


# @router.delete(
    # "/api/comments/{comment_id}/",
    # response_model=bool
# )
# def delete_comment(
#     comment_id: int,
#     repo: CommentQueries = Depends(),
# ) -> bool:
#     return repo.delete(comment_id)


# @router.get(
    # "/api/comments/{comment_id}/",
    # response_model=CommentOutWithUsername
# )
# def get_one(
#     comments_id: int,
#     response: Response,
#     repo: CommentQueries = Depends(),
# ) -> CommentOutWithUsername:
#     comments = repo.get_one(comments_id)
#     if comments is None:
#         response.status_code = 404
#     return comments


# @router.delete("/api/requests/{request_id}/", response_model=bool)
# def delete_request(
#     request_id: int,
#     repo: RequestQueries = Depends(),
# ) -> bool:
#     return repo.delete(request_id)
