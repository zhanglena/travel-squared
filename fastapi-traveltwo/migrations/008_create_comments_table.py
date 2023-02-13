steps = [
    [
        # Create table
        """
        CREATE TABLE comments (
            id SERIAL UNIQUE PRIMARY KEY,
            request_id INTEGER REFERENCES requests("id") ON DELETE CASCADE,
            commenter INTEGER REFERENCES accounts("id") ON DELETE CASCADE,
            txt TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        """,
        # Drop table
        """
        DROP TABLE comments
        """
    ]
]
