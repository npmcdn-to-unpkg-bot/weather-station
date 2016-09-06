import simplejson as simplejson
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
import json
from django.views.decorators.csrf import csrf_exempt

from main.models import Station


def index(request):
    stations = Station.objects.all()
    return render(request, "index.html", {'stations': stations})


@csrf_exempt
def add_station(request):
    if request.method == "POST":
        name = request.POST['name']
        address = request.POST['address']
        loc = json.loads(request.POST['loc'])
        station = Station.objects.create(name=name, address=address, location_lat=loc['lat'], location_lng=loc['lng'])
        return JsonResponse({"name": name, "address": address, "lat": loc["lat"], "lng": loc["lng"]})
    return render(request, "index.html")


def show_station(request):
    if request.method == "GET":
        stations = Station.objects.all()
        return JsonResponse(serializers.serialize('json', stations), safe=False)
