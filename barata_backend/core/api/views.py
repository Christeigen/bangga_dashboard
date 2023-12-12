import requests
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from .models import BookData, ChargingStationData, CustomersData, MitraData
from .serializers import EmailAttachmentSerializer,  BookDataSerializer,  ChargingStationDataSerializer, CustomersDataSerializer, MitraDataSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
import pyrebase
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())

# ==== API FROM MYSQL DB ====

# uncomment permission_classes = [IsAuthenticated] to enable JWT

class BookDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            bookData = BookData.objects.all()
            bookData_serializer= BookDataSerializer(bookData,many=True)
            return JsonResponse(bookData_serializer.data,safe=False)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class ChargingStationDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            chargingstationData = ChargingStationData.objects.all()
            chargingstationData_serializer= ChargingStationDataSerializer(chargingstationData,many=True)
            return JsonResponse(chargingstationData_serializer.data,safe=False)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
        
class CustomersDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            customersData = CustomersData.objects.all()
            customersData_serializer= CustomersDataSerializer(customersData,many=True)
            return JsonResponse(customersData_serializer.data,safe=False)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class MitraDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            mitraData = MitraData.objects.all()
            mitraData_serializer= MitraDataSerializer(mitraData,many=True)
            return JsonResponse(mitraData_serializer.data,safe=False)
        except Exception as e:
            return Response({'error': str(e)}, status=500)


# ==== API FROM FIREBASE ====
# uncomment permission_classes = [IsAuthenticated] to enable JWT

# class BookDataView(APIView):
#     # permission_classes = [IsAuthenticated]
#     def get(self, request):
#         firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/book.json'
#         try:
#             response = requests.get(firebase_url)
#             data = response.json()
#             transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
#             for i in range(len(transformed_data)):
#                 transformed_data[i]["data"]["orderDate"] = datetime.utcfromtimestamp(transformed_data[i]["data"]["orderDate"]/1000).strftime('%Y/%m/%d %H:%M:%S')
#                 transformed_data[i]["data"]["expiredAt"] = datetime.utcfromtimestamp(transformed_data[i]["data"]["expiredAt"]/1000).strftime('%Y/%m/%d %H:%M:%S')
#             return Response(transformed_data)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)
        
# class ChargingStationDataView(APIView):
#     # permission_classes = [IsAuthenticated]
#     def get(self, request):
#         firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/charging_station.json'
#         try:
#             response = requests.get(firebase_url)
#             data = response.json()
#             transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
#             return Response(transformed_data)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)
        
        
# class CustomersDataView(APIView):
#     # permission_classes = [IsAuthenticated]
#     def get(self, request):
#         firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/users/customers.json'
#         try:
#             response = requests.get(firebase_url)
#             data = response.json()
#             transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
#             return Response(transformed_data)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)
        
# class MitraDataView(APIView):
#     # permission_classes = [IsAuthenticated]
#     def get(self, request):
#         firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/users/mitra.json'
#         try:
#             response = requests.get(firebase_url)
#             data = response.json()
#             transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
#             return Response(transformed_data)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)
        
class WithdrawDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/withdraw.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            withdrawData = []
            for i in range(len(transformed_data)):
                try:
                    priceData = transformed_data[i]["data"]["totalPrice"]
                    withdraw = transformed_data[i]["data"]["withdraw"]
                    for key in priceData.keys():
                        transformed_data[i]["data"]["totalPrice"][key]["createdAt"] = datetime.utcfromtimestamp(transformed_data[i]["data"]["totalPrice"][key]["createdAt"]/1000).strftime('%Y/%m/%d %H:%M:%S')
                    for key in withdraw.keys():
                        transformed_data[i]["data"]["withdraw"][key]["createdAt"] = datetime.utcfromtimestamp(transformed_data[i]["data"]["withdraw"][key]["createdAt"]/1000).strftime('%Y/%m/%d %H:%M:%S')
                    withdrawData.append(transformed_data[i])
                except:
                    pass
            return Response(withdrawData)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
firebaseConfig = {
  "apiKey": os.environ["firebase"],
  "authDomain": "chargingstation-17519.firebaseapp.com",
  "projectId": "chargingstation-17519",
  "databaseURL" : "https://chargingstation-17519-default-rtdb.firebaseio.com/",
  "storageBucket": "chargingstation-17519.appspot.com",
  "messagingSenderId": "428240652591",
  "appId": "1:428240652591:android:336a586a8741c2095539da"
}

firebase = pyrebase.initialize_app(firebaseConfig)
authe = firebase.auth()
database = firebase.database()

class UpdateVerificationStatus(APIView):

    def post(self, request):

        customer_id = request.data.get('customer_id')  
        withdraw_id = request.data.get('withdraw_id')
        verif_status = request.data.get('verif_status')

        print(customer_id, withdraw_id, verif_status)


        try:
            ref = database.child('withdraw').child(customer_id).child('totalPrice').child(withdraw_id)
            ref.update({'is_verif': int(verif_status)})
            return Response("Update Success")
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
 

# ==== SEND EMAIL ====
class SendEmailWithAttachment(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EmailAttachmentSerializer(data=request.data)
        if serializer.is_valid():
            to = serializer.validated_data['to']   
            # recipients = [email.strip() for email in to]
            subject = serializer.validated_data['subject']
            message = serializer.validated_data['message']
            attachment = serializer.validated_data.get('attachment')
            print(to,subject,attachment)

            email = EmailMessage(subject, message, to=to)
            if attachment:
                email.attach(attachment.name, attachment.read(), attachment.content_type)

            try:
                email.send()
                return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
