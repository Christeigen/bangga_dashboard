import mysql.connector
from mysql.connector import Error
import requests
import pandas as pd

# firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/book.json'
firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/charging_station.json'
# firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/users/customers.json'
# firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/users/mitra.json'

try:
    response = requests.get(firebase_url)
    data = response.json()

    # columns_with_data_types = 'primaryKey VARCHAR(255), csId VARCHAR(10), customerId VARCHAR(255), duration INT, expiredAt BIGINT, orderDate BIGINT, paymentRequestId VARCHAR(50), socketId VARCHAR(10), status INT, totalPrice INT'
    columns_with_data_types = 'primaryKey VARCHAR(255), csId VARCHAR(10), desc VARCHAR(255), idMitra VARCHAR(255), kabupaten VARCHAR(50), lat VARCHAR(50), location VARCHAR(50), longt VARCHAR(50), name VARCHAR(100), path VARCHAR(255), price INT, provinsi VARCHAR(50), status INT'
    # columns_with_data_types = 'primaryKey VARCHAR(255), fcmToken VARCHAR(255), bookActive VARCHAR(5), customerId VARCHAR(255), email VARCHAR(255), phoneNumber VARCHAR(20), username VARCHAR(50)'
    # columns_with_data_types = 'primaryKey VARCHAR(255), fcmToken VARCHAR(255), email VARCHAR(255), nama VARCHAR(50), phoneNumber VARCHAR(20)'
    columns = [column.split()[0] for column in columns_with_data_types.split(', ')][1:]
    print(columns)

    data_list = [{**{'primaryKey': key}, **{column: data.get(column) for column in columns}} for key, data in data.items()]

    df = pd.DataFrame(data_list)

except Exception as e:
    print(str(e))

print(df)
# print(df.columns)
