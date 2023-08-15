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
