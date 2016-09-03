from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, "index.html")


def add_station(request):
    if request.method == "POST":
        name = request.POST['name']
