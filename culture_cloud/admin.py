from django.contrib import admin
from .models import Country
from .models import Food

# Register your models here.

admin.site.register(Country)
admin.site.register(Food)