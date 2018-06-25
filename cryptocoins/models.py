from django.db import models


class CryptoCoinInformation(models.Model):
    id = models.IntegerField()
    rank = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=50)
    market_cap = models.BigIntegerField(20)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    volume_24hr = models.BigIntegerField(20)
    change_1hr = models.DecimalField(max_digits=10, decimal_places=2)
    change_24hr = models.DecimalField(max_digits=10, decimal_places=2)
    currency_detail = models.TextField()
    coin_newsFeed = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.name

    class Meta:
        managed = False
        db_table = 'crypto_coin_information'


