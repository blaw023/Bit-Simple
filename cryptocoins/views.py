from rest_framework.viewsets import ModelViewSet
from cryptocoins.models import CryptoCoinInformation
from cryptocoins.serializers import CoinSerializer
import logging
import sys

logging.basicConfig(filename="sample.log", level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")
logger = logging.getLogger("logger")


class CryptocurrencyDataViewSet(ModelViewSet):
    try:
        queryset = CryptoCoinInformation.objects.values()
        serializer_class = CoinSerializer
        logger.info(serializer_class.data)
        logger.addHandler(logging.StreamHandler(sys.stdout))
    except Exception as e:
        sys.stdout.write(e)
        logger.addHandler(logging.StreamHandler(sys.stdout))


