
from app.database import get_db_connection


def main():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT
                        current_database(),
                        current_user,
                        COUNT(*)
                    FROM information_schema.tables
                    WHERE table_schema = 'public'
                      AND table_type = 'BASE TABLE'
                """)

                database, user, table_count = cur.fetchone()

                print("Database connection successful!")
                print(f"Database: {database}")
                print(f"User: {user}")
                print(f"Tables: {table_count}")

    except Exception as exc:
        print("Database connection failed.")
        print(f"Error: {exc}")


if __name__ == "__main__":
    main()
