import requests
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from .serializers import EmailAttachmentSerializer, PaymentCreateSerializer, PaymentRequestSerializer
from rest_framework.permissions import IsAuthenticated

# uncomment permission_classes = [IsAuthenticated] to enable JWT

class BookDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/book.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            for i in range(len(transformed_data)):
                transformed_data[i]["data"]["orderDate"] = datetime.utcfromtimestamp(transformed_data[i]["data"]["orderDate"]/1000).strftime('%Y/%m/%d %H:%M:%S')
                transformed_data[i]["data"]["expiredAt"] = datetime.utcfromtimestamp(transformed_data[i]["data"]["expiredAt"]/1000).strftime('%Y/%m/%d %H:%M:%S')
            return Response(transformed_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class ChargingStationDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/charging_station.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            return Response(transformed_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
        
class CustomersDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/users/customers.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            return Response(transformed_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class MitraDataView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://chargingstation-17519-default-rtdb.firebaseio.com/users/mitra.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            return Response(transformed_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
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


# import requests
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.core.mail import EmailMessage
# from .serializers import EmailAttachmentSerializer, PaymentCreateSerializer, PaymentRequestSerializer


# class BookDataView(APIView):
#     def get(self, request):
#         firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/book.json'
#         try:
#             response = requests.get(firebase_url)
#             data = response.json()
#             transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
#             return Response(transformed_data)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)
        
# class ChargingStationDataView(APIView):
#     def get(self, request):
#         firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/charging_station.json'
#         try:
#             response = requests.get(firebase_url)
#             data = response.json()
#             transformed_data = [
#                 {'key': str(index), 'data': item}
#                 for index, item in enumerate(data)
#             ]
#             return Response(transformed_data)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)
        
# class CustomersDataView(APIView):
#     def get(self, request):
#         firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/users/customers.json'
#         try:
#             response = requests.get(firebase_url)
#             data = response.json()
#             transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
#             return Response(transformed_data)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)
        
# class MitraDataView(APIView):
#     def get(self, request):
#         firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/users/mitra.json'
#         try:
#             response = requests.get(firebase_url)
#             data = response.json()
#             transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
#             return Response(transformed_data)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)

# class SendEmailWithAttachment(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = EmailAttachmentSerializer(data=request.data)
#         if serializer.is_valid():
#             to = serializer.validated_data['to']   
#             # recipients = [email.strip() for email in to]
#             subject = serializer.validated_data['subject']
#             message = serializer.validated_data['message']
#             attachment = serializer.validated_data.get('attachment')
#             print(to,subject,attachment)

#             email = EmailMessage(subject, message, to=to)
#             if attachment:
#                 email.attach(attachment.name, attachment.read(), attachment.content_type)

#             try:
#                 email.send()
#                 return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
#             except Exception as e:
#                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
