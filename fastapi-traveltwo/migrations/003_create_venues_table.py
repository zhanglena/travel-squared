steps = [
    [
        # Create table
        """
        CREATE TABLE venues (
            id SERIAL UNIQUE PRIMARY KEY,
            venue_name VARCHAR(200) NOT NULL,
            num_and_street TEXT NOT NULL UNIQUE,
            city TEXT NOT NULL,
            state VARCHAR(2) NOT NULL,
            zip VARCHAR(5) NOT NULL,
            category_id INTEGER REFERENCES categories("id") ON DELETE SET NULL,
            description_text VARCHAR(2000) NOT NULL,
            added_by INTEGER REFERENCES accounts("id") ON DELETE SET NULL,
            approved BOOLEAN DEFAULT false
        );
        """,
        # Drop table
        """
        DROP TABLE venues
        """
    ]
]
