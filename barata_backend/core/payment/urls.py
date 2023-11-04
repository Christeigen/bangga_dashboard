from django.urls import path
from .views import PaymentCreateView, PaymentMethodCreateView, PaymentActiveView, PaymentRequestCreateView, PaymentPaidView, PaymentMethodGet, NotificationSend, PaymentRequestCallbackView
from . import views

urlpatterns = [
    path('payment/create-customer/', PaymentCreateView.as_view(), name='customer-create'),
    path('payment/create-payment/', PaymentMethodCreateView.as_view(), name='payment-create'),
    path('payment/active/', PaymentActiveView.as_view(), name = "payment-active"),
    path('payment/create-payment-request/', PaymentRequestCreateView.as_view(), name = "payment-request"),
    path('payment/create-payment-request/success', PaymentPaidView.as_view(), name = "payment-request-success"),
    path('payment/get-payment-method/<id>', PaymentMethodGet.as_view(), name = "payment-method-get"),
    path('notification/send',NotificationSend.as_view(), name="send-notif" ),
    path('refund/success',PaymentRequestCallbackView.as_view(), name="success_payment" ),
    path('refund/failed',PaymentRequestCallbackView.as_view(), name="failed_payment" )
]
