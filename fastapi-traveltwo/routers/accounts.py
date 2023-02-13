# from queries.sessions import SessionQueries
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from libgravatar import Gravatar, sanitize_email
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountOutConfidential,
    AccountsOutConfidential,
    AccountQueries,
)

router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


# User finding a lot of users
@router.get("/api/accounts/", response_model=AccountsOutConfidential)
def get_all_accounts(repo: AccountQueries = Depends()):
    return {
        "accounts": repo.get_all_accounts()
    }


# User finding another user
@router.get(
    "/api/accounts/users/{account_id}", response_model=AccountOutConfidential
)
def get_another_account(
    account_id: int, response: Response, repo: AccountQueries = Depends()
):
    account = repo.get_another_account(account_id)
    if account is None:
        response.status_code = 404
    return account


@router.post("/api/accounts/", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    gravatar_email = sanitize_email(info.email)
    g_holder = Gravatar(gravatar_email)
    avatar = g_holder.get_image()
    # Hardcoded logic for username based admin:
    is_admin = False
    admin_accounts = ["muhammad", "lena", "sarah", "rosario", "admin"]
    if info.username in admin_accounts:
        is_admin = True
    try:
        account = accounts.create_account(
            info, hashed_password, avatar, is_admin
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        ) from exc
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


# Returns current user's info for Redux
@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.delete("/api/accounts/{account_id}")
def delete_account(
    account_id: int,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data['is_admin'] is True:
        repo.delete_account(account_id)
        return True


@router.get(
    "/api/accounts/search/{keyword}",
    response_model=AccountsOutConfidential
)
def get_accounts_keyword(
    keyword: str,
    repo: AccountQueries = Depends()
):
    return {
        "accounts": repo.search_accounts(keyword)
    }
