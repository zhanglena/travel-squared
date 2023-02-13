steps = [
    [
        # Create table
        """
        CREATE TABLE categories (
            id SERIAL PRIMARY KEY NOT NULL,
            category_name VARCHAR(30) NOT NULL UNIQUE
        );
        """,
        # Drop table
        """
        DROP TABLE categories
        """,
    ]
]
