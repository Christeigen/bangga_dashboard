import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())


customer_id = "PxS3xnhfSidrrfRt4gMwbs0KV7B2"
withdraw_id = "Big6jsP"
verif_status =  1000

# cred = credentials.Certificate("C:/Users/Geraldus Wilsen/Documents/ProjectBarata/barata_dashboard/barata_backend/core/chargingstation-17519-firebase-adminsdk-oxgx9-71e7688b45.json")
# firebase_admin.initialize_app(cred, {'databaseURL':'https://chargingstation-17519-default-rtdb.firebaseio.com/'})
# ref = db.reference('withdraw').child(customer_id).child('totalPrice').child(withdraw_id)
# ref.update({
#     'is_verif':verif_status
# })


firebaseConfig = {
  "apiKey": os.environ["firebase"],
  "authDomain": "chargingstation-17519.firebaseapp.com",
  "projectId": "chargingstation-17519",
  "databaseURL" : "https://chargingstation-17519-default-rtdb.firebaseio.com/",
  "storageBucket": "chargingstation-17519.appspot.com",
  "messagingSenderId": "428240652591",
  "appId": "1:428240652591:android:336a586a8741c2095539da"
}

import pyrebase

firebase = pyrebase.initialize_app(firebaseConfig)
authe = firebase.auth()
database = firebase.database()

ref = database.child('withdraw').child(customer_id).child('totalPrice').child(withdraw_id)
ref.update({
    'is_verif':verif_status
})