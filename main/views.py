from django.shortcuts import render

# Create your views here.
import json
from django.views.decorators.csrf import csrf_exempt
from main.models import Station


def index(request):
    return render(request, "index.html")

@csrf_exempt
def add_station(request):
    if request.method == "POST":
        name = request.POST['name']
        loc = json.loads(request.POST['loc'])
         # TODO: lanet olsun database kayıtları


        return render(request, "index.html")
