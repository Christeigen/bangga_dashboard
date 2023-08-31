from rest_framework import serializers

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

class PaymentCreateSerializer(serializers.Serializer):
    type = serializers.CharField(max_length=20)
    user_number = serializers.CharField(max_length=20)

    
class PaymentRequestSerializer(serializers.Serializer):
    payment_method_id = serializers.CharField(max_length=20)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

