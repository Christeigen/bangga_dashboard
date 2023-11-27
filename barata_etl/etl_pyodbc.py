import pyodbc
import requests
import pandas as pd

# server = 'LAPTOP-UMK073SV' 
# database = 'etl_firebase'
# username = 'your_username'
# password = 'your_password'
# table_name = 'bookData'

# server = '62.72.30.54' 
server = 'https://bangga-evcs.id/'
port = '1433'
database = 'Bangga'
username = 'cloudvps'
password = 'Bangga#12345'
table_name = 'bookData'

# Construct the connection string
# connection_string = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server};DATABASE={database};USER={username};PASSWORD={password};'
connection_string = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server};PORT={port};DATABASE={database};USER={username};PASSWORD={password};Trusted_Connection=yes;TrustServerCertificate=yes'

# Establish a connection
connection = pyodbc.connect(connection_string)

# Create a cursor
cursor = connection.cursor()


# firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/book.json'

# try:
#     response = requests.get(firebase_url)
#     data = response.json()
#     data_list = [
#         {
#             "csId": data.get("csId"),
#             "customerId": data.get("customerId"),
#             "duration": data.get("duration"),
#             "expiredAt": data.get("expiredAt"),
#             "orderDate": data.get("orderDate"),
#             "paymentRequestId": data.get("paymentRequestId"),
#             "socketId": data.get("socketId"),
#             "status": data.get("status"),
#             "totalPrice": data.get("totalPrice")
#         }
#         for data in data.values()
#     ]

#     df = pd.DataFrame(data_list)

# except Exception as e:
#     print(str(e))

# for index, row in df.iterrows():
#     cursor.execute(f"INSERT INTO {table_name} (csId, customerId, duration, expiredAt, orderDate, paymentRequestId, socketId, status, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
#                     row['csId'], row['customerId'], int(row['duration']), int(row['expiredAt']), int(row['orderDate']), row['paymentRequestId'], row['socketId'], int(row['status']), int(row['totalPrice']))

# Commit the changes
# connection.commit()




# QUERY FOR SELECT
cursor.execute("SELECT * FROM bookData")

result = cursor.fetchall()
for row in result:
    print(row)

# Close the cursor and connection
cursor.close()
connection.close()