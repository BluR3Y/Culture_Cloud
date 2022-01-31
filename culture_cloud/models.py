# from datetime import date
import datetime
from time import timezone
from django.db import models

# Create your models here.

# class Question(models.Model):
#     question_text = models.CharField(max_length=200)
#     pub_date = models.DateTimeField('date published')
#     def __str__(self):
#         return self.question_text
#     def __was_published_recently(self):
#         return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
    
# class Choice(models.Model):
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     choice_text = models.CharField(max_length=200)
#     votes = models.IntegerField(default=0)
#     def __str__(self):
#         return self.choice_text

class Country(models.Model):
    country_name = models.CharField(max_length=100)
    country_location = models.CharField(max_length=100)
    country_flag = models.ImageField(upload_to='culture_cloud/countryFlags/')
    country_description = models.CharField(max_length=200)
    country_population = models.IntegerField(default=0)
    
    def __str__(self):
        return self.country_name
    
class Food(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    food_name = models.CharField(max_length=100)
    food_description = models.CharField(max_length=200)
    food_type = models.CharField(max_length=50)
    
    def __str__(self):
        return self.food_name
    
class User(models.Model):
    user_name = models.CharField(max_length=50)
    user_email = models.CharField(max_length=50)
    user_password = models.CharField(max_length=50)
    
    def __str__(self):
        return self.user_name
    
# class Inventions(models.Model):
#     country = models.ForeignKey(Country, on_delete=models.CASCADE)
#     invention_name = models.CharField(max_length=200)
#     date_invented = models.DateField('date invented')
#     invention_description = models.CharField(max_length=200)

#     def __str__(self):
#         return self.invention_name
    
    