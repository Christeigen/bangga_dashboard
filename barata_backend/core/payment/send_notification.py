# Create a list containing up to 500 registration tokens.
# These registration tokens come from the client FCM SDKs.
import firebase_admin
from firebase_admin import credentials, messaging
import datetime

cred = credentials.Certificate("D:/Egen/Kuliah/magang/barata_dashboard/barata_backend/core/chargingstation-17519-firebase-adminsdk-oxgx9-71e7688b45.json")
firebase_admin.initialize_app(cred)

def send_notif(registration_tokens, title, body):
    message = messaging.MulticastMessage(
        notification=messaging.Notification(
            title=title,
            body=body
        ),tokens=registration_tokens
    )
    messaging.send_multicast(message)
    log_error_file = "log_error.txt"
   

# Get the current timestamp
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(log_error_file, "a") as new_file:
        new_file.write(f"[{current_time}] SUCCESS - SEND NOTIFICATION \n")