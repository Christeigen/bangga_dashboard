from django.urls import path
from .views import BookDataView, ChargingStationDataView, CustomersDataView, CustomersDataView, MitraDataView, WithdrawDataView, SendEmailWithAttachment
from . import views

urlpatterns = [
    path('bookdata/', BookDataView.as_view()),
    path('chargingstationdata/', ChargingStationDataView.as_view()),
    path('customerdata/', CustomersDataView.as_view()),
    path('mitradata/', MitraDataView.as_view()),
    path('withdrawdata/', WithdrawDataView.as_view()),
    path('send-email/', SendEmailWithAttachment.as_view(), name='send-email'),
]
