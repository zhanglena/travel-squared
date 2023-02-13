from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    full_name: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    hashed_password: str
    avatar: str | None
    is_admin: bool


class AccountOutConfidential(BaseModel):
    id: int
    username: str
    full_name: str
    avatar: str | None
    is_admin: bool


class AccountsOutConfidential(BaseModel):
    accounts: list[AccountOutConfidential]


class AccountQueries:
    def get_all_accounts(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        username,
                        full_name,
                        avatar,
                        is_admin
                    FROM accounts
                    ORDER BY username;
                """
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results

    def get_another_account(
        self,
        account_id: int
    ):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        username,
                        full_name,
                        avatar,
                        is_admin
                    FROM accounts
                    WHERE id = %s
                    """,
                    [account_id],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    # Used by authenticator
    def get_auth_account(self, username: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        username,
                        full_name,
                        email,
                        hashed_password,
                        avatar,
                        is_admin
                    FROM accounts
                    WHERE username = %s;
                """,
                    [username],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def create_account(
        self,
        account: AccountIn,
        hashed_password: str,
        avatar: str,
        is_admin: bool,
    ) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO accounts
                        (
                            username,
                            full_name,
                            email,
                            hashed_password,
                            avatar,
                            is_admin
                        )
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id,
                        username,
                        full_name,
                        email,
                        hashed_password,
                        avatar,
                        is_admin;
                    """,
                    [
                        account.username,
                        account.full_name,
                        account.email,
                        hashed_password,
                        avatar,
                        is_admin,
                    ],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def delete_account(self, account_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM accounts
                    WHERE id = %s
                    """,
                    [account_id],
                )

    # def update_account(self, account_id, data):
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             params = [
    #                 data.username,
    #                 data.full_name,
    #                 data.password,
    #                 data.avatar,
    #                 account_id
    #             ]
    #             cur.execute(
    #                 """
    #                 UPDATE accounts
    #                 SET first = %s
    #                   , last = %s
    #                   , avatar = %s
    #                   , email = %s
    #                   , username = %s
    #                 WHERE id = %s
    #                 RETURNING id, first, last, avatar, email, username
    #                 """,
    #                 params,
    #             )
    #             record = None
    #             row = cur.fetchone()
    #             if row is not None:
    #                 record = {}
    #                 for i, column in enumerate(cur.description):
    #                     record[column.name] = row[i]
    #             return record

    def search_accounts(self, keyword: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        username,
                        full_name,
                        avatar,
                        is_admin
                    FROM accounts
                    ORDER BY username;
                    """
                )
                results = []
                # Take the results and filter with the keyword
                # here instead of inside the DB query (hotfix)
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    searched = record["username"].lower()
                    if searched.startswith(keyword.lower()):
                        results.append(record)
                return results
