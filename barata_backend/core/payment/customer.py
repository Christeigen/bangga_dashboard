import requests
import base64
import pyrebase
import json
from datetime import datetime, timezone, timedelta
from dateutil import parser, tz
from payment import send_notification
import random
import string
firebaseConfig = {
  "apiKey": "AIzaSyCPEN8m1GiCl9IvHfTuDMH9N3cNTutC3yw",
  "authDomain": "chargingstation-17519.firebaseapp.com",
  "databaseURL": "https://chargingstation-17519-default-rtdb.firebaseio.com",
 "projectId": "chargingstation-17519",
  "storageBucket": "chargingstation-17519.appspot.com",
 "messagingSenderId": "428240652591",
  "appId": "1:428240652591:web:0d91816edfdc3cf65539da",
  "measurementId": "G-JW081KKYJZ"
};


firebase=pyrebase.initialize_app(firebaseConfig)
authe = firebase.auth()
db =firebase.database()

secret_key = 'xnd_development_p4HABJb6wQWfoiBxPv780qwdLFvRk66xG1BHH9IK65iSUpOderLfHtLb7hyh3Z:'
encoded_key = base64.b64encode(secret_key.encode()).decode()

headers = {
    'Authorization': 'Basic ' + encoded_key,
    'Content-Type': 'application/json',
}



def get_FCM_token(cust_id):
    users = db.child("users").child("customers").get()
    id_user = "0"

    for user in users.each():
        user_data = db.child("users").child("customers").child(user.key()).child("customerId").get()
        if(cust_id == user_data.val()):
            id_user = user.key()
            break

    fcm_token_db = db.child("users").child("customers").child(id_user).child("FCMToken").get().val()
    return fcm_token_db

def get_id(cust_id):
    users = db.child("users").child("customers").get()
    id_user = "0"

    for user in users.each():
        user_data = db.child("users").child("customers").child(user.key()).child("customerId").get()
        if(cust_id == user_data.val()):
            id_user = user.key()
            break

    return id_user


def generate_random_string(length):
    # Membuat daftar karakter yang akan digunakan
    characters = string.ascii_letters + string.digits  # huruf kapital, huruf kecil, dan angka
    # Menggabungkan karakter secara acak sebanyak panjang yang diinginkan
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string


def save_notif_firebase(cust_id, title, body, type_notif):
    id = get_id(cust_id)

    x = requests.get('https://timeapi.io/api/Time/current/zone?timeZone=UTC')
    if (x.status_code == 200):
        time_now = json.loads(x.text)
        datetimenowinhere = time_now["dateTime"]
        et_tz = tz.gettz("UTC")
        datetimenowinhere_date = parser.parse(datetimenowinhere)
        id_notif = generate_random_string(10)

        db.child("notification").child(id).child(id_notif).set({
            "title": title,
            "body":body,
            "type":type_notif,
            "isRead":0,
            "createdAt": (datetimenowinhere_date).replace(tzinfo=timezone.utc).timestamp() * 1e3 
        })

def add_to_xendit(ref_id, given_names, email, mobile_number):
    data = {
        "reference_id": ref_id,
        "type": "INDIVIDUAL",
        "individual_detail": {
            "given_names": given_names
        },
        "email": email,
        "mobile_number": mobile_number
    }

    response = requests.post('https://api.xendit.co/customers', headers=headers, json=data)
    return response

def add_to_firebase(customer_data, id_user, username):
    customerJson = json.loads(customer_data)
    id = customerJson['id']
    db.child("user").child(id_user).child("customerId").set(id)


def add_payment_method(customer_id, type_wallet):
    data = {
        "type": "EWALLET",
        "reusability": "MULTIPLE_USE",
        "customer_id": customer_id,
        "country":"ID",
        "ewallet": {
            "channel_code": type_wallet,
            "channel_properties": {
                "success_return_url": "https://redirect.me/goodstuff",
                "failure_return_url": "https://redirect.me/badstuff",
                "cancel_return_url": "https://redirect.me/nostuff"
            }
        }
    }

    response = requests.post('https://api.xendit.co/v2/payment_methods', headers=headers, json=data)
    
    return response

def add_pm_to_firebase(pm_data):
    pm_json = json.loads(pm_data)
    id = pm_json["data"]['id']
    customerId = pm_json["data"]["customer_id"]
    type_e_wallet = pm_json["data"]["ewallet"]["channel_code"]
    data_fb = {
        "paymentMethodId" : id,
        "status": "active"
    }
    db.child("payment_method").child(customerId).child(type_e_wallet).set(data_fb)


def add_payment_request(amount, pm_id, cs_id, type_ewallet):
    panjang_string = 20
    karakter = string.ascii_letters + string.digits  # Kombinasi huruf besar, huruf kecil, dan angka
    random_string = ''.join(random.choice(karakter) for i in range(panjang_string))
    
    
    data = {
        "reference_id" : random_string,
        "amount": amount,
        "currency": "IDR",
        "payment_method_id": pm_id,
        "customer_id": cs_id,
        "checkout_method" : "TOKENIZED_PAYMENT",
       "channel_properties" : 
        {
        "success_redirect_url" : "https://redirect.me/payment"
        }
    }

    response = requests.post('https://api.xendit.co/ewallets/charges', headers=headers, json=data)
    
    
    return response

def add_firebase_payment_request(pr_data, user_id):
    pm_json = json.loads(pr_data)
    id = pm_json['id']
    customerId = pm_json["customer_id"]
    payment_method_id = pm_json["payment_method_id"]
    type_e_wallet = pm_json["channel_code"]
    amount = pm_json["charge_amount"]
    created_at = pm_json["created"]
    action = pm_json["actions"]["mobile_web_checkout_url"]
    dt =  parser.parse(created_at)

# Mengonversi objek datetime ke UNIX timestamp dalam satuan milidetik
    unix_timestamp_ms = int(dt.timestamp() * 1000 + (5 * 60 *  1000))
    data_fb = {
        "paymentMethodId" : payment_method_id,
        "amount": amount,
        "ewallet":type_e_wallet,
        "successDate" : 0,
        "expired_at" : unix_timestamp_ms, 
        "status": 0,
        "action": action
    }
   
    db.child("payment_request").child(customerId).child(id).set(data_fb)


def add_firebase_payment_request_v2(customerId, amount, payment_request_id):
    

    x = requests.get('https://timeapi.io/api/Time/current/zone?timeZone=UTC')
    if (x.status_code == 200):
        time_now = json.loads(x.text)
        datetimenowinhere = time_now["dateTime"]
        et_tz = tz.gettz("UTC")
        datetimenowinhere_date = parser.parse(datetimenowinhere)
        timestampcreatedat = datetimenowinhere_date + timedelta(minutes=5) 
        expired_at = (timestampcreatedat).replace(tzinfo=timezone.utc).timestamp() * 1e3
   
        data_fb = {
            "paymentMethodId" : "0",
            "amount": amount,
            "ewallet":"E-BANGGA",
            "successDate" : 0,
            "expired_at" : expired_at, 
            "status": 0,
            "action": "0"
        }
    
        db.child("payment_request").child(customerId).child(payment_request_id).set(data_fb)

def customer_balance_wallet(id):
    response = requests.get(f'https://api.xendit.co/v2/payment_methods/{id}', headers=headers)
    return response

def add_new_book(book_id, cs_id, user_id, duration, status, price, payment_request_id):

    x = requests.get('https://timeapi.io/api/Time/current/zone?timeZone=UTC')
    if (x.status_code == 200):
        time_now = json.loads(x.text)
        datetimenowinhere = time_now["dateTime"]
        datetimenowinhere_date = parser.parse(datetimenowinhere)
        timestampcreatedat = datetimenowinhere_date + timedelta(minutes=5) 

        order_date = (datetimenowinhere_date).replace(tzinfo=timezone.utc).timestamp() * 1e3

        expired_at = (timestampcreatedat).replace(tzinfo=timezone.utc).timestamp() * 1e3

        data_book = {
        "csId" : cs_id,
        "customerId" : user_id,
        "duration" : duration, 
        "status" : status, 
        "totalPrice"  : price,
        "paymentRequestId":payment_request_id,
        "socketId" : "1",
        "orderDate" : order_date,
        "expiredAt" : expired_at
        }

        db.child("book").child(book_id).set(data_book)
        return True
    else :
        return False

def update_book_active(user_id, book_id):
    db.child("users").child("customers").child(user_id).update({"bookActive":book_id})


def update_status_payment(cust_id, id):
    users = db.child("users").child("customers").get()
    user_book = "0"
    id_user = "0"

    for user in users.each():
        user_data = db.child("users").child("customers").child(user.key()).child("customerId").get()
        if(cust_id == user_data.val()):
            book = db.child("users").child("customers").child(user.key()).child("bookActive").get()
            id_user = user.key()
            user_book = book.val()
            break
    book_db = db.child("book").child(user_book).child("csId").get()
    csId = book_db.val()
    socket_db = db.child("socket").child(csId).child("1").child("status").get()
    mitra_id = db.child("charging_station").child(csId).child("idMitra").get().val()
    status_socket = socket_db.val()
    if(status_socket == 0):
      x = requests.get('https://timeapi.io/api/Time/current/zone?timeZone=UTC')
      if (x.status_code == 200):
          time_now = json.loads(x.text)
          datetimenowinhere = time_now["dateTime"]
          duration = db.child("book").child(user_book).child("duration").get()
          totalPrice = db.child("book").child(user_book).child("totalPrice").get()
          datetimenowinhere_date = parser.parse(datetimenowinhere)
          timestampcreatedat = datetimenowinhere_date + timedelta(minutes=30) 
          if user_book != "0":
                db.child("socket").child(csId).child("1").update({"bookActive":user_book, "createdAt":(datetimenowinhere_date).replace(tzinfo=timezone.utc).timestamp() * 1e3 , "expiredAt": (timestampcreatedat).replace(tzinfo=timezone.utc).timestamp() * 1e3 ,"status": 100})

                db.child("payment_request").child(cust_id).child(id).update({"status" : 100, "successDate": (datetimenowinhere_date).replace(tzinfo=timezone.utc).timestamp() * 1e3 })
                
                db.child("book").child(user_book).update({"socketId":"1", "expiredAt": (timestampcreatedat).replace(tzinfo=timezone.utc).timestamp() * 1e3 ,"status": 100})

                db.child("withdraw").child(mitra_id).child("totalPrice").child(user_book).set(totalPrice.val())

                fcm_token_db = db.child("users").child("customers").child(id_user).child("FCMToken").get().val()
                fcm_token_db_mitra = db.child("users").child("mitra").child(mitra_id).child("FCMToken").get().val()
                token = []
                token1 = []
                token.append(fcm_token_db)
                token1.append(fcm_token_db_mitra)
                save_notif_firebase(cust_id, "Pembayaran sukses!", "Segera scan qr untuk melakukan pengisian!", "success")
                send_notification.send_notif(token, "Pembayaran sukses!", "Segera scan qr untuk melakukan pengisian!")
                send_notification.send_notif(token1, "Charging Station dipesan!!", "Cek aplikasi untuk memantau pengisian!")
                return True
          else :
                log_error_file = "log_error.txt"

# Get the current timestamp
                current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                with open(log_error_file, "a") as new_file:
                    new_file.write(f"[{current_time}] FAILED - USER BOOK HAVE 0 VALUE \n")
                return False
      else :
          log_error_file = "log_error.txt"

# Get the current timestamp
          current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

          with open(log_error_file, "a") as new_file:
            new_file.write(f"[{current_time}] FAILED - TIMESTAMP ERROR \n")
    
          return False
    else :
        log_error_file = "log_error.txt"
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        with open(log_error_file, "a") as new_file:
            new_file.write(f"[{current_time}] FAILED - SOCKET HAVE BOOK ACTIVE! \n")

        return False
        
      
def refund_ewallet(cust_id, id):
    users = db.child("users").child("customers").get()
    user_book = "0"
    id_user = "0"

    for user in users.each():
        user_data = db.child("users").child("customers").child(user.key()).child("customerId").get()
        if(cust_id == user_data.val()):
            book = db.child("users").child("customers").child(user.key()).child("bookActive").get()
            user_book = book.val()
            id_user = user.key()
            break

    db.child("users").child("customers").child(id_user).update({"bookActive":"0"})
    book_db = db.child("book").child(user_book).child("csId").get()
    csId = book_db.val()
    mitra_id = db.child("charging_station").child(csId).child("idMitra").get().val()

    response = requests.post(f'https://api.xendit.co/ewallets/charges/{id}/void', headers=headers)
    if(response.status_code == 200):
        db.child("payment_request").child(cust_id).child(id).update({"status" : 500})

        if user_book != "0":
            db.child("book").child(user_book).update({"socketId":"1","status": 500})
            db.child("withdraw").child(mitra_id).child("totalPrice").child(user_book).set(0)

        fcm_token_db = db.child("users").child("customers").child(id_user).child("FCMToken").get().val()
        token = []
        token.append(fcm_token_db)
        save_notif_firebase(cust_id, "Pemesanan gagal!", "Charging Station terisi, uang akan dikembalikan!", "expired")
        send_notification.send_notif(token, "Pemesanan gagal!", "Charging Station terisi, uang akan dikembalikan!")
        return response
    else :
        db.child("payment_request").child(cust_id).child(id).update({"status" : 1000})
        db.child("withdraw").child(mitra_id).child("totalPrice").child(user_book).set(0)
        db.child("book").child(user_book).update({"socketId":"1","status": 500})
        fcm_token_db = db.child("users").child("customers").child(id_user).child("FCMToken").get().val()
        token = []
        token.append(fcm_token_db)
        save_notif_firebase(cust_id, "Pengembalian uang gagal!", "Harap tunggu sebentar!", "expired")
        send_notification.send_notif(token, "Pengembalian uang gagal!", "Harap tunggu sebentar!")
        return response
    
def notif_failed_to_user(cust_id, id_user):
    fcm_token_db = db.child("users").child("customers").child(id_user).child("FCMToken").get().val()
    token = []
    token.append(fcm_token_db)
    save_notif_firebase(cust_id, "Pemesanan gagal!", "Charging Station terisi, uang akan dikembalikan!", "expired")
    send_notification.send_notif(token, "Pemesanan gagal!", "Charging Station terisi, uang akan dikembalikan!")
    
def refund_ewallet_v2(cust_id, id):
    users = db.child("users").child("customers").get()
    user_book = "0"
    id_user = "0"

    for user in users.each():
        user_data = db.child("users").child("customers").child(user.key()).child("customerId").get()
        if(cust_id == user_data.val()):
            book = db.child("users").child("customers").child(user.key()).child("bookActive").get()
            user_book = book.val()
            id_user = user.key()
            break

    db.child("users").child("customers").child(id_user).update({"bookActive":"0"})
    book_db = db.child("book").child(user_book).child("csId").get()
    csId = book_db.val()
    mitra_id = db.child("charging_station").child(csId).child("idMitra").get().val()

    db.child("payment_request").child(cust_id).child(id).update({"status" : 500})

    if user_book != "0":
        db.child("book").child(user_book).update({"socketId":"1","status": 500})
        db.child("withdraw").child(mitra_id).child("totalPrice").child(user_book).set(0)

    fcm_token_db = db.child("users").child("customers").child(id_user).child("FCMToken").get().val()
    token = []
    token.append(fcm_token_db)
    save_notif_firebase(cust_id, "Pemesanan gagal!", "Charging Station terisi, uang akan dikembalikan!", "expired")
    send_notification.send_notif(token, "Pemesanan gagal!", "Charging Station terisi, uang akan dikembalikan!")