from datetime import timedelta
import pendulum
import tempfile


from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.models import XCom

import pandas as pd
import requests
import json
import os


default_args = {
    'owner':'sen',
    'retries':5,
    'retry_delay':timedelta(minutes=2)
}


def preprocessing(**kwargs):

    firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/book.json'

    try:
        response = requests.get(firebase_url)
        data = response.json()
        data_list = [
            {
                "csId": data.get("csId"),
                "customerId": data.get("customerId"),
                "duration": data.get("duration"),
                "expiredAt": data.get("expiredAt"),
                "orderDate": data.get("orderDate"),
                "paymentRequestId": data.get("paymentRequestId"),
                "socketId": data.get("socketId"),
                "status": data.get("status"),
                "totalPrice": data.get("totalPrice")
            }
            for data in data.values()
        ]

        df = pd.DataFrame(data_list)
        print(df)
        # df.to_csv(file_path, index=False)
        # print("Create dataframe success")

        with tempfile.TemporaryDirectory() as temp_dir:
            # Specify the file path within the temporary directory
            temp_file_path = f"{temp_dir}/temp_df.csv"

            # Save the DataFrame to the temporary file
            df.to_csv(temp_file_path, index=False)

            # Push the temporary file path to an XCom variable
            task_instance = kwargs['ti']
            task_instance.xcom_push(key='temp_file_path', value=temp_file_path)

    except Exception as e:
        print(str(e))


def use_temp_file(**kwargs):
    # Retrieve the temporary file path from the XCom variable
    task_instance = kwargs['ti']
    temp_file_path = task_instance.xcom_pull(task_ids='save_df_to_temp_file', key='temp_file_path')

    data = pd.read_csv('temp_file_path')
    print(data)

    # Your processing logic using the temporary file goes here
    print(f"Using temporary file: {temp_file_path}")


with DAG(
    default_args=default_args,
    dag_id="dag_etl_firebase_mysql",
    description="ETL Firebase to MYSQL",
    start_date=pendulum.datetime(2023, 10, 1, tz="Asia/Jakarta"),
    schedule_interval='@daily'
) as dag:
    task1 = PythonOperator(
        task_id = "preprocessing",
        python_callable = preprocessing
    )
    
    task_use_temp_file = PythonOperator(
        task_id='use_temp_file',
        python_callable=use_temp_file,
    )

    # Set task dependencies
    task1 >> task_use_temp_file
