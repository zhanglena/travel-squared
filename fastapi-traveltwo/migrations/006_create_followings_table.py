steps = [
    [
        # Create table
        """
        CREATE TABLE followings (
            id SERIAL UNIQUE PRIMARY KEY,
            user_following INTEGER REFERENCES accounts("id") ON DELETE CASCADE,
            user_followed INTEGER REFERENCES accounts("id") ON DELETE CASCADE
        );
        """,
        # Drop table
        """
        DROP TABLE followings
        """
    ]
]
