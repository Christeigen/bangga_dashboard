# Create a list containing up to 500 registration tokens.
# These registration tokens come from the client FCM SDKs.
import firebase_admin
from firebase_admin import credentials, messaging
cred = credentials.Certificate("C:/Users/Geraldus Wilsen/Documents/ProjectBarata/barata_dashboard/barata_backend/core/chargingstation-17519-firebase-adminsdk-oxgx9-71e7688b45.json")
firebase_admin.initialize_app(cred)

def send_notif(registration_tokens, title, body):
    message = messaging.MulticastMessage(
        notification=messaging.Notification(
            title=title,
            body=body
        ),tokens=registration_tokens
    )
    response = messaging.send_multicast(message)
    print('{0} messages were sent successfully'.format(response.success_count))