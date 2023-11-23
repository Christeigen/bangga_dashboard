from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.http import HttpResponse
from .serializers import  PaymentMethodCreateSerializer, CustomerCreateSerializer, PaymentRequestCreateSerializer, NotificationSerializers
from payment import customer
import pyrebase
import json
from datetime import datetime, timezone, timedelta
import random
import string
from payment import send_notification

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
auth = firebase.auth()
database=firebase.database()
callback_key = "DugLgqfRxdgbIVfTnk71GhnIW5Ak4B5NsWFWZjAwRT52AioE"


class PaymentCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomerCreateSerializer(data=request.data)
        if serializer.is_valid():
            user_number = serializer.validated_data['user_number']
            email = serializer.validated_data['email']
            given_names = serializer.validated_data['given_names']
            ref_id = serializer.validated_data['ref_id']

            customers = customer.add_to_xendit(ref_id, given_names, email, user_number)
           
            return Response(json.loads(customers.text), status=customers.status_code)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PaymentMethodCreateView(APIView):
    def post(self, request, *args, **kwargs):

        serializer = PaymentMethodCreateSerializer(data=request.data)
        
        if serializer.is_valid():


            type_wallet = serializer.validated_data['type_wallet']
            customer_id = serializer.validated_data['customer_id']
            user_id = serializer.validated_data['user_id']
            email = serializer.validated_data['email']
            
            allCustomer = database.child("users").child("customers").child(user_id)
            emailDB = allCustomer.child("email").get().val()
            customer_id_db = database.child("users").child("customers").child(user_id).child("customerId").get().val()
            

            
            if (customer_id == customer_id_db):
                payment_method = customer.add_payment_method(customer_id, type_wallet)
            
                return Response(json.loads(payment_method.text), status=payment_method.status_code)
            else :
                log_error_file = "log_error.txt"

# Get the current timestamp
                current_time =datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                with open(log_error_file, "a") as new_file:
                    new_file.write(f"[{current_time}] FAILED - CUSTOMER NOT FOUND! \n")

                not_same = {
                    "error" : "invalid data!",
                }
                return Response(not_same, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PaymentActiveView(APIView):
    def post(self, request, *args, **kwargs):
        if request.headers["X-Callback-Token"] != callback_key:
            not_same = {
                    "error" : "Strict access from another link!",
                }
            log_error_file = "log_error.txt"
   

        # Get the current timestamp
            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            with open(log_error_file, "a") as new_file:
                new_file.write(f"[{current_time}] {0} ACCES DENIED, TOKEN NOT VALID! \n")


            return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
        
        customer.add_pm_to_firebase(request.body)
        return HttpResponse()
    

class PaymentRequestCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PaymentRequestCreateSerializer(data=request.data)
    
        if serializer.is_valid():
            type_wallet = serializer.validated_data['type_wallet']
            customer_id = serializer.validated_data['customer_id']
            amount = serializer.validated_data['amount']
            user_id = serializer.validated_data["user_id"]
            book_id = serializer.validated_data["book_id"]
            cs_id = serializer.validated_data["cs_id"]
            duration = serializer.validated_data["duration"]
            status_book = serializer.validated_data["status"]
            price = serializer.validated_data["price"]

            customer_id_db = database.child("users").child("customers").child(user_id).child("customerId").get().val()

            if (customer_id == customer_id_db):
                pmdb = database.child("payment_method").child(customer_id).child(type_wallet).get().val()
                if pmdb is None:
                    data_error = {
                        "error" : "data not found!"
                    }
                    return Response(data_error, status=status.HTTP_400_BAD_REQUEST)
                customer_payment = customer.add_payment_request(amount, pmdb["paymentMethodId"], customer_id, type_wallet)
              
                customer.add_firebase_payment_request(customer_payment.text, user_id)

                response_json_from_xendit = json.loads(customer_payment.text)

                if "actions" in response_json_from_xendit:
                    payment_request_id = response_json_from_xendit["id"]
                    add_book = customer.add_new_book(book_id, cs_id, user_id, duration, status_book, price, payment_request_id)
                    if add_book : 
                        customer.update_book_active(user_id, book_id)
                        fcm_token_db = database.child("users").child("customers").child(user_id).child("FCMToken").get().val()
                        token = []
                        token.append(fcm_token_db)
                        customer.save_notif_firebase(customer_id, "Selesaikan pembayaran mu!", "Segera bayar dan gunakan charging station!", "waiting")
                        send_notification.send_notif(token, "Selesaikan pembayaran mu!", "Segera bayar dan gunakan charging station!")
                        return Response(json.loads(customer_payment.text), status=customer_payment.status_code)
                    else :
                        log_error_file = "log_error.txt"

                        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                        with open(log_error_file, "a") as new_file:
                            new_file.write(f"[{current_time}] FAILED - FAIL TO ADD NEW BOOK \n")


                        not_same = {
                            "error" : "Failed to add new book!",
                        }
                        return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
                else :
                    log_error_file = "log_error.txt"

# Get the current timestamp
                    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    

                    with open(log_error_file, "a") as new_file:
                        new_file.write(f"[{current_time}] FAILED - FAIL TO ADD NEW PAYMENT \n")
                    not_same = {
                        "error" : "Failed to add new payment!",
                    }
                    return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
            
            else :
                log_error_file = "log_error.txt"

                current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                with open(log_error_file, "a") as new_file:
                    new_file.write(f"[{current_time}] FAILED - CUSTOMER NOT FOUND! \n")

                not_same = {
                    "error" : "invalid data!",
                }
                return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST
                        )
    
class PaymentRequestCreateEMoneyView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PaymentRequestCreateSerializer(data=request.data)
    
        if serializer.is_valid():
            type_wallet = serializer.validated_data['type_wallet']
            customer_id = serializer.validated_data['customer_id']
            amount = serializer.validated_data['amount']
            user_id = serializer.validated_data["user_id"]
            book_id = serializer.validated_data["book_id"]
            cs_id = serializer.validated_data["cs_id"]
            duration = serializer.validated_data["duration"]
            status_book = serializer.validated_data["status"]
            price = serializer.validated_data["price"]

            customer_id_db = database.child("users").child("customers").child(user_id).child("customerId").get().val()

            if (customer_id == customer_id_db):


                
                ewallets = database.child("withdraw").child(user_id).child("totalPrice").get()
                ewalletswd = database.child("withdraw").child(user_id).child("withdraw").get()

                totalPrice = 0
                totalWithdrawAmount = 0

                try :
                    for ewallet in ewallets.each():
                        pricein = database.child("withdraw").child(user_id).child("totalPrice").child(ewallet.key()).child("amount").get().val()
                        is_verify = database.child("withdraw").child(user_id).child("totalPrice").child(ewallet.key()).child("is_verif").get().val()
                        if is_verify == 100 :
                            totalPrice += pricein
                except : 
                    totalPrice = 0

                try :
                    for ewallet in ewalletswd.each():
                        priceout = database.child("withdraw").child(user_id).child("withdraw").child(ewallet.key()).child("amount").get().val()
                        is_verify1 = database.child("withdraw").child(user_id).child("withdraw").child(ewallet.key()).child("is_verif").get().val()
                        if is_verify1 == 100:
                            totalWithdrawAmount += priceout
                except : 
                    totalWithdrawAmount = 0


                saldoewallet = totalPrice - totalWithdrawAmount

                if saldoewallet >= amount : 
                 
                # customer_payment = customer.add_payment_request(amount, pmdb["paymentMethodId"], customer_id, type_wallet)
                    karakter = string.ascii_letters + string.digits  # Kombinasi huruf besar, huruf kecil, dan angka
                    random_string = ''.join(random.choice(karakter) for i in range(10))
                    payment_request_id = random_string
                    customer.add_firebase_payment_request_v2(customer_id, amount, payment_request_id)
                

                    
                    socket_database = database.child("socket").child(cs_id).child("1").child("status").get()
                    status_socket = socket_database.val()
            
                    if(status_socket == 0):
                    # response_json_from_xendit = json.loads(customer_payment.text)
                        add_book = customer.add_new_book(book_id, cs_id, user_id, duration, status_book, price, payment_request_id)
                        if add_book : 
                            customer.update_book_active(user_id, book_id)
                            fcm_token_db = database.child("users").child("customers").child(user_id).child("FCMToken").get().val()
                            token = []
                            token.append(fcm_token_db)
                            customer.save_notif_firebase(customer_id, "Selesaikan pembayaran mu!", "Segera bayar dan gunakan charging station!", "waiting")
                            send_notification.send_notif(token, "Selesaikan pembayaran mu!", "Segera bayar dan gunakan charging station!")

                            hasil = customer.update_status_payment(customer_id, payment_request_id)
                            if hasil :
                                created_at = database.child("book").child(book_id).child("orderDate").get().val()
                                database.child("withdraw").child(user_id).child("withdraw").child(book_id).set({"amount" : price, "createdAt" : created_at, "is_verif" : 100})
                                message_success = {
                                "success" : "success book!",
                                }
                                return Response(message_success, status=status.HTTP_200_OK)
                            else :
                                customer.notif_failed_to_user(customer_id, user_id)
                                not_same = {
                                "error_socket" : "Failed to book because socket already used!",
                                }
                            return Response(not_same, status=status.HTTP_400_BAD_REQUEST)

                            # return Response(json.loads(customer_payment.text), status=customer_payment.status_code)
                        else :
                            log_error_file = "log_error.txt"

                            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                            with open(log_error_file, "a") as new_file:
                                new_file.write(f"[{current_time}] FAILED - FAIL TO ADD NEW BOOK \n")

                            customer.notif_failed_to_user(customer_id, user_id)


                            not_same = {
                                "error" : "Failed to add new book!",
                            }
                            return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
                    else :
                        customer.notif_failed_to_user(customer_id, user_id)
                        not_same = {
                            "error_socket" : "Failed to book because socket already used!"
                        }
                        return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
                else :
                    customer.notif_failed_to_user(customer_id, user_id)
                    not_same = {
                            "error" : "You dont have balance!",
                        }
                    return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
            else :
                log_error_file = "log_error.txt"

                current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                with open(log_error_file, "a") as new_file:
                    new_file.write(f"[{current_time}] FAILED - CUSTOMER NOT FOUND! \n")

                customer.notif_failed_to_user(customer_id, user_id)
                not_same = {
                    "error" : "invalid data!",
                }
                return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
        customer.notif_failed_to_user(customer_id, user_id)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PaymentPaidView(APIView):
    def post(self, request, *args, **kwargs):
        if request.headers["X-Callback-Token"] != callback_key:

            log_error_file = "log_error.txt"

# Get the current timestamp
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            with open(log_error_file, "a") as new_file:
                new_file.write(f"[{current_time}] ACCES DENIED, TOKEN NOT VALID! \n")

            not_same = {
                    "error" : "Strict access from another link!",
                }
            return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
        res_call = json.loads(request.body)
        if(res_call["event"] == "ewallet.capture"):
            hasil = customer.update_status_payment(res_call["data"]["customer_id"], res_call["data"]["id"])
            if hasil :
                return HttpResponse()
            else :
                res = customer.refund_ewallet(res_call["data"]["customer_id"],res_call["data"]["id"])
                return Response(json.loads(res.text), status=res.status_code)
        if(res_call["event"] == "ewallet.void"):
            cust_id = res_call["data"]["customer_id"]
            token_user = customer.get_FCM_token(cust_id)
            token = []
            token.append(token_user)
            send_notification.send_notif(token, "Uang dikembalikan!", "Apabila belum kembali, harap hubungi admin!")
            return HttpResponse()
        
        return HttpResponse()

    
class PaymentMethodGet(APIView):
    def get(self, request, id,*args, **kwargs):
        customer_pm = customer.customer_balance_wallet(id)
        
        return Response(json.loads(customer_pm.text), status=customer_pm.status_code)
    
class NotificationSend(APIView):
    def post(self, request, *args, **kwargs):
        serializers = NotificationSerializers(data = request.data)

        if serializers.is_valid():
            token1 = serializers.validated_data["token"]
            title = serializers.validated_data["title"]
            body = serializers.validated_data["body"]
            reg_token1 = []
            reg_token1.append(token1)
            send_notification.send_notif(reg_token1, title, body)
            res = {
                "success":"notification send!"
            }
            log_error_file = "log_error.txt"

# Get the current timestamp
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            with open(log_error_file, "a") as new_file:
                new_file.write(f"[{current_time}] SUCCESS - SEND NOTIFICATION \n")

            return Response(res, status=status.HTTP_200_OK)
        else :
            log_error_file = "log_error.txt"

# Get the current timestamp
            current_time =datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            with open(log_error_file, "a") as new_file:
                new_file.write(f"[{current_time}] INPUT NOT VALID!\n")
        
        return HttpResponse()
    
class PaymentRequestCallbackView(APIView):
    def post(self, request, *args, **kwargs):
        if request.headers["X-Callback-Token"] != callback_key:
            log_error_file = "log_error.txt"

# Get the current timestamp
            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            with open(log_error_file, "a") as new_file:
                new_file.write(f"[{current_time}] ACCES DENIED, TOKEN NOT VALID! \n")

            not_same = {
                    "error" : "Strict access from another link!",
                }
            return Response(not_same, status=status.HTTP_400_BAD_REQUEST)
    
        return HttpResponse()
