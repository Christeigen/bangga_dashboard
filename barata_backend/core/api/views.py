import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from .serializers import EmailAttachmentSerializer, PaymentCreateSerializer, PaymentRequestSerializer
from rest_framework.permissions import IsAuthenticated


class BookDataView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/book.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            return Response(transformed_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class ChargingStationDataView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/charging_station.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [
                {'key': str(index), 'data': item}
                for index, item in enumerate(data)
            ]
            return Response(transformed_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class CustomersDataView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/users/customers.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            return Response(transformed_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class MitraDataView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/users/mitra.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            return Response(transformed_data)
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


class PaymentCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PaymentCreateSerializer(data=request.data)
        if serializer.is_valid():

            user_number = serializer.validated_data['user_number']
            type = serializer.validated_data['type']

            print(user_number,type)
            return Response({"message": f"Payment using {type} with {user_number} is being created"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PaymentRequestView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PaymentRequestSerializer(data=request.data)
        if serializer.is_valid():

            payment_method_id = serializer.validated_data['payment_method_id']
            amount = serializer.validated_data['amount']

            return Response({"message": f"Payment {payment_method_id} amounting to {amount} has been successfully requested"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


