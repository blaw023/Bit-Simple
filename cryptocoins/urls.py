from django.urls import path

from .views import CryptocurrencyDataViewSet

urlpatterns = [
    path('', CryptocurrencyDataViewSet.as_view({'get': 'list'}))
]