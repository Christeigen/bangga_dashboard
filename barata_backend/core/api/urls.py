from django.urls import path
from .views import BookDataView, ChargingStationDataView, CustomersDataView, CustomersDataView, MitraDataView, SendEmailWithAttachment, PaymentCreateView, PaymentRequestView
from . import views

urlpatterns = [
    path('', BookDataView.as_view()),
    path('bookdata/', BookDataView.as_view()),
    path('chargingstationdata/', ChargingStationDataView.as_view()),
    path('customerdata/', CustomersDataView.as_view()),
    path('mitradata/', MitraDataView.as_view()),
    path('send-email/', SendEmailWithAttachment.as_view(), name='send-email'),
    path('payment/create/', PaymentCreateView.as_view(), name='payment-create'),
    path('payment/request/', PaymentRequestView.as_view(), name='payment-request'),
]
