/*global google, $*/
(function () {
    'use strict';

    window.initMap = function () {
        var location = { lat: 13.682976569464984, lng: -11.467491953581657 };

        var map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 3
        });

        var placeList = $('.list ul');
        var searchInput = $('#searchInput');
        var searchButton = $('#searchButton');
        var listContainer = $('.listContainer');
        var mapContainer = $('#mapContainer');
        var infoWindow = new google.maps.InfoWindow({
            maxWidth: 300
        });
        var markers = [];

        searchButton.click(function () {
            listContainer.css('display', 'inline-block');
            mapContainer.css('padding-left', '20%');
            placeList.empty();
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];
            $.getJSON('http://api.geonames.org/wikipediaSearch?username=bgoldburd&type=json', { q: searchInput.val(), maxRows: 20 }, function (placeData) {
                console.log(placeData);
                var bounds = new google.maps.LatLngBounds();
                infoWindow.close();
                placeData.geonames.forEach(function (place) {
                    $('<li>\n                        <div>' + place.title + '</div>\n                        <img src="' + (place.thumbnailImg || 'images/marker.png') + '" alt="' + place.title + '"/>\n                        <article>' + place.summary + '<br><a target="_blank" href="https://' + place.wikipediaUrl + '">learn more</a></article>\n                    </li>').appendTo(placeList).click(function () {
                        map.panTo({ lat: place.lat, lng: place.lng });
                        map.setZoom(15);
                        infoWindow.close();
                        var article = $(this).find('article');
                        if (article.css('display') === 'none') {
                            article.slideDown('fast');
                        } else {
                            article.slideUp('fast');
                        }
                    });

                    var markerlocation = { lat: place.lat, lng: place.lng };
                    var marker = new google.maps.Marker({
                        position: markerlocation,
                        title: place.title,
                        map: map
                    });

                    marker.addListener('click', function () {
                        map.setZoom(15);
                        map.panTo({ lat: place.lat, lng: place.lng });
                        infoWindow.setContent('<img class="markerImage" src="' + (place.thumbnailImg || 'images/marker.png') + '"/>' + place.summary);
                        infoWindow.open(map, marker);
                    });

                    markers.push(marker);

                    bounds.extend(markerlocation);
                });

                map.fitBounds(bounds);
            });
        });

        searchInput.on('keydown', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                searchButton.click();
            }
        });

        //////from here on, for drawing manager////////////////////////////////////////////////
        var allItems = [];
        var selectedItem = void 0;
        var selectedItemId = void 0;
        var centerControlDiv = document.createElement('div');
        var centerControlDiv2 = document.createElement('div');
        var exitSpan = document.createElement('span');
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER
            },
            circleOptions: {
                editable: true,
                draggable: true
            },
            rectangleOptions: {
                editable: true,
                draggable: true
            },
            polygonOptions: {
                editable: true,
                draggable: true
            },
            polylineOptions: {
                editable: true,
                draggable: true
            },
            markerOptions: {
                draggable: true
            }
        });
        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
            var localStorageId = event.type + Date.now();
            console.log('overlaycomplete:', event.overlay);
            if (event.type === 'marker') {
                localStorage.setItem(localStorageId, JSON.stringify(event.overlay.position));
                addMarkerEditor(event.overlay, localStorageId);
            } else if (event.type === 'circle') {
                localStorage.setItem(localStorageId, JSON.stringify({ radius: event.overlay.radius, center: event.overlay.center }));
                addCircleEditor(event.overlay, localStorageId);
            } else if (event.type === 'rectangle') {
                localStorage.setItem(localStorageId, JSON.stringify(event.overlay.bounds));
                addRectangleEditor(event.overlay, localStorageId);
            } else if (event.type === 'polygon') {
                localStorage.setItem(localStorageId, JSON.stringify(event.overlay.latLngs.j[0].j));
                addPolygonEditor(event.overlay, localStorageId);
            } else if (event.type === 'polyline') {
                localStorage.setItem(localStorageId, JSON.stringify(event.overlay.latLngs.j[0].j));
                addPolylineEditor(event.overlay, localStorageId);
            }
            allItems.push(event.overlay);
            clickToRemoveSelection(event.overlay, localStorageId);
        });

        /////create all items saved in local storage upon startup/////////////////////////////
        var items = Object.keys(localStorage);
        console.log(items);
        items.forEach(function (item) {
            if (item.includes('marker')) {
                var marker = new google.maps.Marker({
                    position: JSON.parse(localStorage[item]),
                    map: map,
                    draggable: true
                });
                addMarkerEditor(marker, item);
                clickToRemoveSelection(marker, item);
                allItems.push(marker);
            } else if (item.includes('circle')) {
                var circle = new google.maps.Circle({
                    map: map,
                    center: JSON.parse(localStorage[item]).center,
                    radius: JSON.parse(localStorage[item]).radius,
                    editable: true,
                    draggable: true
                });
                addCircleEditor(circle, item);
                clickToRemoveSelection(circle, item);
                allItems.push(circle);
            } else if (item.includes('rectangle')) {
                var rectangle = new google.maps.Rectangle({
                    map: map,
                    bounds: JSON.parse(localStorage[item]),
                    editable: true,
                    draggable: true
                });
                addRectangleEditor(rectangle, item);
                clickToRemoveSelection(rectangle, item);
                allItems.push(rectangle);
            } else if (item.includes('polygon')) {
                var polygon = new google.maps.Polygon({
                    map: map,
                    paths: JSON.parse(localStorage[item]),
                    editable: true,
                    draggable: true
                });
                addPolygonEditor(polygon, item);
                clickToRemoveSelection(polygon, item);
                allItems.push(polygon);
            } else if (item.includes('polyline')) {
                var polyline = new google.maps.Polyline({
                    map: map,
                    path: JSON.parse(localStorage[item]),
                    editable: true,
                    draggable: true
                });
                addPolylineEditor(polyline, item);
                clickToRemoveSelection(polyline, item);
                allItems.push(polyline);
            }
        });

        /////functions for saving edits//////////////////////////////////////////////////
        function addMarkerEditor(marker, id) {
            marker.addListener('dragend', function () {
                localStorage[id] = JSON.stringify(marker.getPosition());
            });
        }

        function addCircleEditor(circle, id) {
            circle.addListener('radius_changed', function () {
                localStorage[id] = JSON.stringify({ radius: circle.getRadius(), center: circle.getCenter() });
            });
            circle.addListener('center_changed', function () {
                localStorage[id] = JSON.stringify({ radius: circle.getRadius(), center: circle.getCenter() });
            });
        }

        function addRectangleEditor(rectangle, id) {
            rectangle.addListener('bounds_changed', function () {
                localStorage[id] = JSON.stringify(rectangle.getBounds());
            });
        }

        function addPolygonEditor(polygon, id) {
            polygon.addListener('mousedown', function () {
                var path = polygon.getPath();
                path.addListener('set_at', function () {
                    localStorage[id] = JSON.stringify(polygon.getPath().b);
                });
                path.addListener('remove_at', function () {
                    localStorage[id] = JSON.stringify(polygon.getPath().b);
                });
                path.addListener('insert_at', function () {
                    localStorage[id] = JSON.stringify(polygon.getPath().b);
                });
            });
        }

        function addPolylineEditor(polyline, id) {
            polyline.addListener('mousedown', function () {
                var path = polyline.getPath();
                path.addListener('set_at', function () {
                    localStorage[id] = JSON.stringify(polyline.getPath().b);
                });
                path.addListener('remove_at', function () {
                    localStorage[id] = JSON.stringify(polyline.getPath().b);
                });
                path.addListener('insert_at', function () {
                    localStorage[id] = JSON.stringify(polyline.getPath().b);
                });
            });
        }

        //////function for removing selected item///////////////////////////////////////
        function clickToRemoveSelection(item, id) {
            item.addListener('click', function () {
                centerControlDiv2.style.display = 'block';
                selectedItem = item;
                selectedItemId = id;
            });
        }

        //////for "clear all" button///////////////////////////////////////////
        centerControlDiv.id = 'centerControlDiv';
        new CenterControl(centerControlDiv);
        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

        function CenterControl(controlDiv) {
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to clear all';
            controlDiv.appendChild(controlUI);

            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '24px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = 'Clear All';
            controlUI.appendChild(controlText);

            controlUI.addEventListener('click', function () {
                localStorage.clear();
                allItems.forEach(function (item) {
                    item.setMap(null);
                });
            });
        }

        ////for 'clear selection' button///////////////////////////////////
        centerControlDiv2.id = 'centerControlDiv2';
        exitSpan.innerHTML = 'X';
        exitSpan.id = 'exitSpan';
        exitSpan.title = 'Cancel';
        exitSpan.addEventListener('click', function (event) {
            event.stopPropagation();
            centerControlDiv2.style.display = 'none';
        });
        new CenterControl2(centerControlDiv2);
        centerControlDiv2.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv2);

        function CenterControl2(controlDiv) {
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.borderRadius = '3px';
            controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to clear selection';
            controlDiv.appendChild(controlUI);

            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '24px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.style.display = 'inline-block';
            controlText.innerHTML = 'Clear Selection';
            controlUI.appendChild(controlText);
            controlUI.appendChild(exitSpan);

            controlUI.addEventListener('click', function () {
                selectedItem.setMap(null);
                centerControlDiv2.style.display = 'none';
                localStorage.removeItem(selectedItemId);
            });
        }
    };
})();