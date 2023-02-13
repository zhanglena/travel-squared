from fastapi import APIRouter, Depends, Response, Request
from typing import Optional
from typing import Union
import string
from queries.venues import (
    VenueIn,
    VenueOut,
    VenueInUpdate,
    VenueCompleteOut,
    VenueRepository,
    Error,
    CategoryIn,
    CategoryOut,
    CategoryRepository,
)
from authenticator import authenticator

router = APIRouter()


# Admin
@router.post("/api/categories/", response_model=CategoryOut)
def create_category(
    category: CategoryIn,
    repo: CategoryRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data["is_admin"] is True:
        return repo.create(category)


# User
@router.get("/api/categories/", response_model=list[CategoryOut])
def get_all_categories(
    repo: CategoryRepository = Depends(),
):
    return repo.get_all_categories()


# User
@router.post("/api/venues/", response_model=VenueOut)
def create_venues(
    venue: VenueIn,
    request: Request,
    response: Response,
    repo: VenueRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    added_by = account_data["id"]
    approved = False
    return repo.create(venue, added_by, approved)


# Admin and Maybe User
@router.get("/api/venues/{venue_id}", response_model=Optional[VenueOut])
def get_one_venue(
    venue_id: int,
    response: Response,
    repo: VenueRepository = Depends(),
) -> VenueOut:
    venue = repo.get_one_venue(venue_id)
    if venue is None:
        response.status_code = 404
    return venue


# Admin to approve venues
@router.get("/api/venues/unapproved/", response_model=list[VenueOut])
def get_unapproved_venues(
    repo: VenueRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data["is_admin"] is True:
        return repo.get_unapproved()


# Admin
@router.get("/api/venues/", response_model=list[VenueOut])
def get_all(
    repo: VenueRepository = Depends(),
):
    return repo.get_all()


# User
@router.get(
    "/api/venues/{state}/{city}", response_model=list[VenueCompleteOut]
)
def get_all_approved(
    state: str,
    city: str,
    repo: VenueRepository = Depends(),
):
    city = string.capwords(city)
    return repo.get_all_complete(state, city)


# Admin to approve venues
@router.put("/api/venues/{venue_id}", response_model=Union[VenueOut, Error])
def update_venue(
    venue_id: int,
    venue: VenueInUpdate,
    repo: VenueRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, VenueOut]:
    if account_data["is_admin"] is True:
        return repo.update(venue_id, venue)


# Admin to delete venues
@router.delete("/api/venues/{venue_id}")
def delete_venue(
    venue_id: int,
    repo: VenueRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account_data["is_admin"] is True:
        return repo.delete(venue_id)
