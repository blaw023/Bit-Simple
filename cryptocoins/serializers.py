from rest_framework import serializers
from cryptocoins.models import CryptoCoinInformation


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoCoinInformation
        fields = ('rank', 'name', 'symbol',
                          'market_cap', 'price', 'volume_24hr',
                          'change_1hr', 'change_24hr', 'currency_detail',
                          'coin_newsFeed'
                  )


