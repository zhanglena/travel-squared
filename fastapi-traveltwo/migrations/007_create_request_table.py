steps = [
    [
        # Create table
        """
        CREATE TABLE requests (
            id SERIAL UNIQUE PRIMARY KEY,
            requester INTEGER REFERENCES accounts("id") ON DELETE CASCADE,
            txt TEXT NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        );
        """,
        # Drop table
        """
        DROP TABLE requests
        """
    ]
]
