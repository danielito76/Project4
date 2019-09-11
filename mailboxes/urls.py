from django.urls import path
from .views import MailBoxListView, MailBoxDetailView, UserProfileView, RentalAgreementListView, RentalAgreementDetailView, MessageView


urlpatterns = [
    path('mailboxes/', MailBoxListView.as_view(), name='mailboxes-list'),
    path('mailboxes/<int:pk>', MailBoxDetailView.as_view(), name='mailboxes-details'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('rental_agreements/', RentalAgreementListView.as_view(), name='rental_agreements-list'),
    path('rental_agreements/<int:pk>', RentalAgreementDetailView.as_view(), name='rental_agreements-details'),
    path('message/', MessageView.as_view(), name='message'),
]
