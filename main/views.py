import simplejson as simplejson
from django.http import HttpResponse
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
        print address
        loc = json.loads(request.POST['loc'])
        Station.objects.create(name=name, address=address, location_lat=loc['lat'], location_lng=loc['lng'])
        return HttpResponse('Istasyon basariyla kaydedildi.')
    return render(request, "index.html")


def show_station(request):
    if request.method == "GET":
        station = Station.objects.all()
        location_lat = Station.objects.get('location_lat')
        location_lng = Station.objects.get('location_lng')
        print location_lat, location_lng
        return HttpResponse(1)