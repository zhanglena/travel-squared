from fastapi import APIRouter, Depends
from queries.reviews import (
    ReviewQueries,
    ReviewIn,
    ReviewOut,
    ReviewOutComplete,
)
import string
from authenticator import authenticator
from datetime import date


router = APIRouter()


@router.get(
    "/api/reviews/{state}/{city}",
    response_model=list[ReviewOutComplete]
)
def get_all_reviews(
    state: str,
    city: str,
    repo: ReviewQueries = Depends(),
):
    city = string.capwords(city)
    return repo.get_all_reviews(state, city)


@router.post("/api/reviews/", response_model=ReviewOut)
def create_review(
    review: ReviewIn,
    repo: ReviewQueries = Depends(),
    account_data: dict = Depends(
            authenticator.get_current_account_data
        ),
):
    added_by = account_data["id"]
    created_at = date.today()
    return repo.create_review(review, added_by, created_at)


@router.get(
    "/api/accounts/{username}/reviews/",
    response_model=list[ReviewOutComplete]
)
def get_all_reviews_for_username(
    username: str,
    repo: ReviewQueries = Depends(),
):
    return repo.get_all_reviews_for_username(username)


@router.get(
    "/api/venues/{venue_id}/reviews/",
    response_model=list[ReviewOutComplete]
)
def get_all_reviews_for_venue(
    venue_id: int,
    repo: ReviewQueries = Depends(),
):
    return repo.get_all_reviews_for_venue(venue_id)


# @router.get(
#     "/api/venues/{venue_id}/{review_id}/",
#     response_model=ReviewOutComplete
# )
# def get_one_review_for_venue(
#     venue_id: int,
#     review_id: int,
#     repo: ReviewQueries = Depends(),
# ):
#     return repo.get_one_review_for_venue(venue_id, review_id)


# @router.delete(
    # "/api/venues/{venue_id}/{review_id}",
    # response_model=ReviewOut
# )
# def delete_review(
#     review_id: int,
#     repo: ReviewQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ) -> bool:
#     if account_data['is_admin'] == True:
#         return repo.delete_review(review_id)
