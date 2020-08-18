# Version 1

import psycopg2
import psycopg2.extras

try:
    connection = psycopg2.connect(user = "postgres",
                                  password = "password",
                                  host = "localhost",
                                  port = "5432",
                                  dbname = "gtd")

except:
    print("Connection failed")

cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
# print(connection.get_dsn_parameters())

# cursor.execute("""SELECT datname from pg_database""")
# rows = cursor.fetchall()
# print("\nShow me the databases:\n")
# for row in rows:
#     print("   ", row[0])

cursor.execute("""Select * from main where country_txt = 'Mexico' """)
rows = cursor.fetchall()
print("Rows:")
counter = 0
for row in rows:
    print(row['iyear'])
    # counter += 1
    # if(counter>10):break