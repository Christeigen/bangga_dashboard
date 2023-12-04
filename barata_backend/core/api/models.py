from django.db import models

class BookData(models.Model):
    class Meta:
        db_table = 'bookdata'
    primaryKey = models.CharField(max_length = 255, primary_key=True)
    csId = models.CharField(max_length = 10)
    customerId = models.CharField(max_length = 255)
    duration = models.IntegerField()
    expiredAt = models.BigIntegerField()
    orderDate = models.BigIntegerField() 
    paymentRequestId = models.CharField(max_length = 50)
    socketId = models.CharField(max_length = 10) 
    status = models.IntegerField()
    totalPrice = models.IntegerField()

class ChargingStationData(models.Model):
    class Meta:
        db_table = 'chargingstationdata'
    primaryKey = models.CharField(max_length = 255, primary_key=True)
    csId = models.CharField(max_length = 10)
    desc = models.CharField(max_length = 255)
    idMitra = models.CharField(max_length = 255) 
    kabupaten = models.CharField(max_length = 50)
    lat = models.CharField(max_length = 50)
    location = models.CharField(max_length = 255)
    longt = models.CharField(max_length = 50)
    name = models.CharField(max_length = 100)
    path = models.CharField(max_length = 255)
    price = models.IntegerField()
    provinsi = models.CharField(max_length = 50)
    status = models.IntegerField()

class CustomersData(models.Model):
    class Meta:
        db_table = 'customersdata'
    primaryKey = models.CharField(max_length = 255, primary_key=True)
    fcmToken = models.CharField(max_length = 255)
    bookActive = models.CharField(max_length = 5)
    customerId = models.CharField(max_length = 255)
    email = models.CharField(max_length = 255)
    phoneNumber = models.CharField(max_length = 20)
    username = models.CharField(max_length = 50)

class MitraData(models.Model):
    class Meta:
        db_table = 'mitradata'
    primaryKey = models.CharField(max_length = 255, primary_key=True)
    fcmToken = models.CharField(max_length = 255)
    email = models.CharField(max_length = 255)
    nama = models.CharField(max_length = 50)
    phoneNumber = models.CharField(max_length = 20)
