from turtle import pos
from django.shortcuts import render
# from django.http import HttpResponse

from django.http import JsonResponse
import json

from culture_cloud.models import Country
from culture_cloud.models import User


# Create your views here.

def index(request):
    return render(request, 'culture_cloud/index.html')

def signup(request):
    return render(request, 'culture_cloud/signup.html')

def signin(request):
    return render(request, 'culture_cloud/signin.html')

def cultureInfo(request):
    testCountry = Country.objects.get(country_name__contains="The United")
    testImgs = testCountry.countrybannerimg_set.all()
    testVids = testCountry.countrybannervid_set.all()
    print(testImgs)
    return render(request, 'culture_cloud/cultureInfo.html', {'country': testCountry, 'bannerImgs': testImgs, 'bannerVids': testVids})

# def searchCulture(request,searchInput):
#     possible = Country.objects.filter(country_name__contains=searchInput)
#     print(possible)
    
#     return render(request, 'culture_cloud/searchCulture.html', {'seachInput': searchInput,'seachResults': possible})



def createUser(request):
    userData = json.loads(request.body)
    userForm = userData['userForm']

    try:
        newUser = User.objects.get(user_email=userForm['email'])
    except User.DoesNotExist:
        newUser = None
    
    if(newUser == None):
        newUser = User(user_name=userForm['username'], user_email=userForm['email'],user_password=userForm['password'])
        newUser.save()
        return JsonResponse({'status':'success'})
    else:
        return JsonResponse({'status':'failed','reason':'emailTaken'})


def signinUser(request):
    userData = json.loads(request.body)
    userForm = userData['userForm']
    inputType = userForm['inputType']
    
    if(inputType == "username"):
        userObj = User.objects.filter(user_name=userForm['primaryInput'])
        
        if(not userObj):
            return JsonResponse({'status':'failed', 'reason':'userDNE'})
        
        userObj = userObj.filter(user_password=userForm['password'])
        
        if(not userObj):
            return JsonResponse({'status':'failed', 'reason':'invalidPword'})
        
        userObj = userObj[0]
        
        return JsonResponse({'status':'success', 'user_id':userObj.id, 'user_name':userObj.user_name})
    else:
        userObj = User.objects.filter(user_email=userForm['primaryInput'])
        
        if(not userObj):
            return JsonResponse({'status':'failed', 'reason':'userDNE'})
        
        userObj = userObj.filter(user_password=userForm['password'])
        
        if(not userObj):
            return JsonResponse({'status':'failed', 'reason':'invalidPword'})
        
        userObj = userObj[0]
        
        return JsonResponse({'status':'success', 'user_id':userObj.id, 'user_name':userObj.user_name})

# def createUser(request):      function that when gets called via post reads the data passed to it
#     data = json.loads(request.body)
#     form1 = data['form']
#     form2 = data['form2']
#     print(form2['lName'])
    
#     return JsonResponse({'lol':'keke'})
 
