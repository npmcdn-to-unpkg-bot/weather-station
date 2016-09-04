$(document).ready(function () {
    /***************** Navbar-Collapse ******************/

    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    /***************** Page Scroll ******************/

    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    /***************** Scroll Spy ******************/

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    /***************** Owl Carousel ******************/

    $("#owl-hero").owlCarousel({

        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "fadeUp",
        autoPlay: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

    });


    /***************** Full Width Slide ******************/

    var slideHeight = $(window).height();

    $('#owl-hero .item').css('height', slideHeight);

    $(window).resize(function () {
        $('#owl-hero .item').css('height', slideHeight);
    });
    /***************** Owl Carousel Testimonials ******************/

    $("#owl-testi").owlCarousel({

        navigation: false, // Show next and prev buttons
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "backSlide",
        autoPlay: true

    });
    /***************** Countdown ******************/

    $('#fun-facts').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({
                    Counter: 0
                }).animate({
                    Counter: $this.text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });
    /***************** Leaflet Map ******************/
    mymap = L.map('mapid');
    mymap.setView([38.925533, 34.866287], 6);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);




    /***************** Google Map ******************/
   /* function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(39.92757, -83.160207),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
*/
    /***************** Wow.js ******************/
    
    new WOW().init();
    
    /***************** Preloader ******************/
    
    var preloader = $('.preloader');
    $(window).load(function () {
        preloader.remove();
    });
})

function initMap() {
    autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('findbox')));

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged()
{
    var place = autocomplete.getPlace();
    if (place.geometry)
    {

        // TODO: lanet olsun
        var loc = place.geometry.location.toJSON();
        mymap.setView([loc['lat'], loc['lng']], 8);
        mymarker = L.marker([loc['lat'], loc['lng']], {
            draggable: true
        }).addTo(mymap);
    }
    else
    {
        document.getElementById('findbox').placeholder = 'Enter a city';
    }
}

function saveStation()
{
    var name = document.getElementById('name').value;
    var myloc = JSON.stringify(mymarker.getLatLng());
    $.post("add_station", {name: name, loc: myloc}, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });


}

//function searchMap()
//{
//    var text = document.getElementById("findbox").value;
//    $.get( "https://maps.googleapis.com/maps/api/geocode/json?address=" + text +
//    "&key=AIzaSyCQ1tBlod1TyQojVsixkQTTRjSfgyR_6WU", function( data ) {
//        alert(JSON.stringify(data['results'][0]['geometry']['location']));
//    });
//}