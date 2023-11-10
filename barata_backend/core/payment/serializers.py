from rest_framework import serializers


class CustomerCreateSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    user_number = serializers.CharField(max_length=20)
    ref_id = serializers.CharField(max_length=100)
    given_names = serializers.CharField(max_length=20)

class PaymentMethodCreateSerializer(serializers.Serializer):
    type_wallet = serializers.CharField(max_length=20)
    customer_id = serializers.CharField(max_length=100)
    user_id = serializers.CharField(max_length=100)
    username = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)

class PaymentRequestCreateSerializer(serializers.Serializer):
    type_wallet = serializers.CharField(max_length=20)
    customer_id = serializers.CharField(max_length=100)
    amount = serializers.IntegerField(min_value = 0)
    user_id = serializers.CharField(max_length=100)
    book_id = serializers.CharField(max_length=100)
    cs_id = serializers.CharField(max_length=100)
    duration = serializers.IntegerField(min_value = 0)
    status = serializers.IntegerField()
    price = serializers.IntegerField(min_value = 0)

class NotificationSerializers(serializers.Serializer):
    token = serializers.CharField(max_length= 1000)
    title = serializers.CharField(max_length=200)
    body = serializers.CharField(max_length = 1000)

    