import mysql.connector
from mysql.connector import Error
import requests
import pandas as pd

def create_connection(db_params):
    try:
        connection = mysql.connector.connect(**db_params)
        return connection
    except Error as e:
        print("Error connecting to MySQL:", e)
        return None
   
def create_table(cursor, table_name):

    if table_name == "bookData":
        columns = 'primaryKey VARCHAR(255), csId VARCHAR(10), customerId VARCHAR(255), duration INT, expiredAt BIGINT, orderDate BIGINT, paymentRequestId VARCHAR(50), socketId VARCHAR(10), status INT, totalPrice INT'
    elif table_name == "chargingstationData":
        columns = 'primaryKey VARCHAR(255), csId VARCHAR(10), desc VARCHAR(255), idMitra VARCHAR(255), kabupaten VARCHAR(50), lat VARCHAR(50), location VARCHAR(255), longt VARCHAR(50), name VARCHAR(100), path VARCHAR(255), price INT, provinsi VARCHAR(50), status INT'
    elif table_name == "customersData":
        columns = 'primaryKey VARCHAR(255), fcmToken VARCHAR(255), bookActive VARCHAR(5), customerId VARCHAR(255), email VARCHAR(255), phoneNumber VARCHAR(20), username VARCHAR(50)'
    elif table_name == "mitraData":
        columns = 'primaryKey VARCHAR(255), fcmToken VARCHAR(255), email VARCHAR(255), nama VARCHAR(50), phoneNumber VARCHAR(20)'

    create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns})"
    cursor.execute(create_table_query)

    columns_name = [column.split()[0] for column in columns.split(', ')]
    return columns_name


def insert_data(cursor, table_name, data):
    # Check if the record with the primary key already exists
    check_query = f"SELECT * FROM {table_name} WHERE primaryKey = %s"
    cursor.execute(check_query, (data["primaryKey"],))
    existing_record = cursor.fetchone()

    if existing_record:
        # If the record exists, update it
        update_query = f"UPDATE {table_name} SET {', '.join([f'{column} = %s' for column in data.keys()])} WHERE primaryKey = %s"
        cursor.execute(update_query, tuple(data.values()) + (data["primaryKey"],))
        # print(f"{data['primaryKey']} is already in table {table_name}")
    else:
        # If the record does not exist, insert it
        insert_query = f"INSERT INTO {table_name} VALUES ({', '.join(['%s'] * len(data))})"
        cursor.execute(insert_query, tuple(data.values()))
        print(f"{data['primaryKey']} is inserted to table {table_name}")

# Firebase URL
firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com'

# MySQL connection parameters
db_params = {'host': 'localhost', 'database': 'bangga', 'user': 'bangga', 'password': 'Bangga#12345'}

# Define tables for each database
tables = {
    'book': 'bookData',
    'charging_station': 'chargingstationData',
    'users/customers': 'customersData',
    'users/mitra': 'mitraData',
}

try:
    # Establish a connection to the MySQL server
    connection = create_connection(db_params)

    # Check if the connection is successful
    if connection and connection.is_connected():
        db_info = connection.get_server_info()
        print(f"Connected to MySQL Server version for {db_params['database']}:", db_info)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        for table_url, table_name in tables.items():
            # Check if the table exists and create it if not
            columns = create_table(cursor, table_name)

            # Continue with your existing code to fetch and insert data from Firebase
            response = requests.get(f"{firebase_url}/{table_url}.json")
            data = response.json()
            data_list = [{**{'primaryKey': key}, **{column: data.get(column) for column in columns[1:]}} for key, data in data.items()]

            df = pd.DataFrame(data_list)

            print(df.head())

            for index, row in df.iterrows():
                data_dict = {column: row[column] for column in columns}
                insert_data(cursor, table_name, data_dict)

            # Commit the changes to the database
            connection.commit()
            print(f"Done insert/update data into the {table_name} table.")


except Error as e:
    print(f"Error for {db_params['database']}:", e)

except Exception as e:
    print(f"Exception for {db_params['database']}:", str(e))

finally:
    # Close the cursor and connection in the finally block to ensure it happens regardless of success or failure
    if 'connection' in locals() and connection.is_connected():
        cursor.close()
        connection.close()
        print(f"MySQL connection for {db_params['database']} is closed")
