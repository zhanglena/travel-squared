steps = [
    [
        # Create table
        """
        CREATE TABLE reviews_loved (
            id SERIAL UNIQUE PRIMARY KEY,
            review_id INTEGER REFERENCES reviews("id") ON DELETE CASCADE,
            loved_by INTEGER REFERENCES accounts("id") ON DELETE CASCADE
        );
        """,
        # Drop table
        """
        DROP TABLE reviews_loved
        """
    ]
]
