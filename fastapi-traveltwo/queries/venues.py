from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class CategoryIn(BaseModel):
    category_name: str


class CategoryOut(BaseModel):
    id: int
    category_name: str


class VenueIn(BaseModel):
    venue_name: str
    num_and_street: str
    city: str
    state: str
    zip: str
    category_id: int
    description_text: str


class VenueInUpdate(BaseModel):
    venue_name: str
    num_and_street: str
    city: str
    state: str
    zip: str
    category_id: int
    description_text: str
    added_by: int


class VenueOut(BaseModel):
    id: int
    venue_name: str
    num_and_street: str
    city: str
    state: str
    zip: str
    category_id: int
    description_text: str
    added_by: int
    approved: bool


class VenueCompleteOut(BaseModel):
    id: int
    venue_name: str
    num_and_street: str
    city: str
    state: str
    zip: str
    category_id: int
    category_name: str
    description_text: str
    added_by_user_id: int
    added_by_username: str
    added_by_fullname: str
    added_by_avatar: str | None
    added_by_is_admin: bool
    approved: bool


class CategoryRepository:
    # Admin
    def create(self, category: CategoryIn) -> CategoryOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO categories (category_name)
                    VALUES (%s)
                    RETURNING id, category_name
                    """,
                    [category.category_name],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    # User
    def get_all_categories(self) -> list[CategoryOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM categories
                    ORDER BY id
                    """
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results


class VenueRepository:
    # User
    def create(
        self, venue: VenueIn, added_by: int, approved: bool
    ) -> VenueOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO venues
                        (
                            venue_name,
                            num_and_street,
                            city,
                            state,
                            zip,
                            category_id,
                            description_text,
                            added_by,
                            approved
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id,
                            venue_name,
                            num_and_street,
                            city,
                            state,
                            zip,
                            category_id,
                            description_text,
                            added_by,
                            approved;
                    """,
                    [
                        venue.venue_name,
                        venue.num_and_street,
                        venue.city,
                        venue.state,
                        venue.zip,
                        venue.category_id,
                        venue.description_text,
                        added_by,
                        approved,
                    ],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    # Admin
    def delete(self, venue_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                            DELETE FROM venues
                            WHERE id = %s
                            """,
                        [venue_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    # Admin
    def update(
        self,
        venue_id: int,
        venue: VenueInUpdate
    ) -> Union[VenueOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE venues
                        SET venue_name = %s
                          , num_and_street = %s
                          , city = %s
                          , state = %s
                          , zip = %s
                          , category_id = %s
                          , description_text = %s
                          , added_by = %s
                          , approved = %s
                        WHERE id = %s
                        """,
                        [
                            venue.venue_name,
                            venue.num_and_street,
                            venue.city,
                            venue.state,
                            venue.zip,
                            venue.category_id,
                            venue.description_text,
                            venue.added_by,
                            True,
                            venue_id,
                        ],
                    )
                    return self.venue_in_to_out(venue_id, venue)
        except Exception:
            return {"message": "Could not update that venue"}

    # Admin and Maybe User
    def get_one_venue(self, venue_id: int) -> Optional[VenueOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                            venue_name,
                            num_and_street,
                            city,
                            state,
                            zip,
                            category_id,
                            description_text,
                            added_by,
                            approved
                        FROM venues
                        WHERE id = %s
                        """,
                        [venue_id],
                    )
                    record = None
                    row = db.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                    return record
        except Exception:
            return {"message": "Could not get that venue"}

    # Admin
    def get_all(self) -> list[VenueOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM venues v
                    ORDER BY venue_name
                    """
                )
                try:
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
                except Exception:
                    return {"message": "Could not get all Venues"}

    # Admin
    def get_unapproved(self) -> list[VenueOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM venues v
                    WHERE v.approved = false
                    ORDER BY venue_name
                    """
                )
                try:
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
                except Exception:
                    return {"message": "Could not get all Venues"}

    # User kept at all, even unapproved, venues for now
    def get_all_complete(
        self, state: str, city: str
    ) -> list[VenueCompleteOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT v.id,
                            v.venue_name,
                            v.num_and_street,
                            v.city,
                            v.state,
                            v.zip,
                            c.id AS category_id,
                            c.category_name AS category_name,
                            v.description_text,
                            a.id AS added_by_user_id,
                            a.username AS added_by_username,
                            a.full_name AS added_by_fullname,
                            a.avatar AS added_by_avatar,
                            a.is_admin AS added_by_is_admin,
                            v.approved
                    FROM venues v
                    INNER JOIN categories c
                        ON (c.id = v.category_id)
                    INNER JOIN accounts a
                        ON (a.id = v.added_by)
                    WHERE v.state = %s AND v.city = %s AND v.approved = True
                    ORDER BY venue_name
                    """,
                    [state, city],
                )
                try:
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
                except Exception:
                    return {"message": "Could not get all Venues"}

    # Helper for update
    def venue_in_to_out(self, id: int, venue: VenueIn):
        old_data = venue.dict()
        return VenueOut(id=id, **old_data, approved=True)

    # def record_to_venue_out(self, record):
    #     return VenueOut(
    #         id=record[0],
    #         name=record[1],
    #         from_date=record[2],
    #         to_date=record[3],
    #         thoughts=record[4],
    #     )
