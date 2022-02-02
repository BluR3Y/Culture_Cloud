from django.contrib import admin
from .models import Country
from .models import countryBannerImg
from .models import countryBannerVid
# from .models import Food

# Register your models here.

admin.site.register(Country)
admin.site.register(countryBannerImg)
admin.site.register(countryBannerVid)
# admin.site.register(Food)