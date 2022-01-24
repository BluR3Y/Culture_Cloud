from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return render(request, 'culture_cloud/index.html')

def topsection(request):
    return render(request, 'culture_cloud/topsection.html')