from rest_framework import serializers
from api.models import BookData, ChargingStationData, CustomersData, MitraData

class MultipleEmailField(serializers.Field):
    def to_internal_value(self, data):
        if isinstance(data, list):
            return data
        elif isinstance(data, str):
            return [email.strip() for email in data.split(',') if email.strip()]
        raise serializers.ValidationError("Invalid value")

    def to_representation(self, value):
        if isinstance(value, list):
            return ', '.join(value)
        return value

class EmailAttachmentSerializer(serializers.Serializer):
    to = MultipleEmailField()
    subject = serializers.CharField(max_length=200)
    message = serializers.CharField()
    attachment = serializers.FileField(required=False)

class BookDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=BookData
        fields=('primaryKey','csId','customerId','duration','expiredAt','orderDate' ,'paymentRequestId','socketId'  ,'status','totalPrice')
        
class ChargingStationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=ChargingStationData
        fields=('primaryKey','csId','desc','idMitra' ,'kabupaten','lat','location','longt','name','path','price','provinsi','status')

class CustomersDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomersData
        fields=('primaryKey','fcmToken','bookActive','customerId','email', 'phoneNumber','username')

class MitraDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=MitraData
        fields=('primaryKey','fcmToken','email', 'nama','phoneNumber')


