import requests
from rest_framework.views import APIView
from rest_framework.response import Response


class BookDataView(APIView):
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
    def get(self, request):
        firebase_url = 'https://charging-station-clone-default-rtdb.firebaseio.com/users/mitra.json'
        try:
            response = requests.get(firebase_url)
            data = response.json()
            transformed_data = [{'key': key, 'data': value} for key, value in data.items()]
            return Response(transformed_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
