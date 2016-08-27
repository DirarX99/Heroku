var map;
var infoWindow;
var markers = [];
var towers = [];
var DBtowers = [];
var markerTower;
var marker;
var myLatlng;
var myLatlng2;
var LatLng2;
var test;
var Latlng2;
var towerCircle;
var radT1;
var radT2;
var nearest;
var distarray=[];
var namedis = {};
var heatMapData=[];
var poly;
//---------------------------------------------------------------------------------------------------------

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var plocation = document.getElementById("location");
	plocation.innerHTML = latitude + " , " + longitude + "</br>";

	showMap(position.coords);

	var markerlatlng = new google.maps.LatLng(latitude, longitude);
	createMarker(markerlatlng);
	
	

}

//----------------------------------------------------------------------------------------------------------
function showMap(coords) {
	var googleLatLong = new google.maps.LatLng(coords.latitude, coords.longitude);

	var mapOptions = {
		
		zoom: 9,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.TERRAIN


	};

	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	infoWindow = new google.maps.InfoWindow();

	google.maps.event.addListener(map, "click", function (event) {
		var latitude = event.latLng.lat();
		var longitude = event.latLng.lng();

		var pLocation = document.getElementById("location");

		pLocation.innerHTML = latitude + "," + longitude;


		if (markers.length > 0) {
			console.log("marker already created !,You can't add another one !");
		} else {
			createMarker(event.latLng);
			map.panTo(event.latLng);
			nearestTower();
		}



	});

	radT1 = 10000;
	radT2 = 5000;
	
	createMainTower();
//*************************************
	  downloadUrl("genxml.php", function(data) {
        var xml = data.responseXML;
        var xmarkers = xml.documentElement.getElementsByTagName("marker");
        for (var i = 0; i < xmarkers.length; i++) {
          var name = xmarkers[i].getAttribute("nom");
          var gouvernorat = xmarkers[i].getAttribute("gouvernorat");
          var delegation = xmarkers[i].getAttribute("delegation");
          var point = new google.maps.LatLng(
              parseFloat(xmarkers[i].getAttribute("latitude")),
              parseFloat(xmarkers[i].getAttribute("longitude")));
          var html = "<b> Antenne: " + name + "</b></br><b> Gouvernorat: " + gouvernorat + "</br><b> Delegation: " + delegation + "</b>" ;
        // var icon = customIcons[type] || {};
         var markerTower = new google.maps.Marker({
          map: map,
           position: point,
           icon: "hide.png",
		  title: name	 
			});
			//createTowerMarker(point, radT1);
			//console.log("DB marker created!");
			DBtowers.push(markerTower);
			heatMapData.push(point);
			//console.log("number of towers: "+DBtowers.length);
          bindInfoWindow(markerTower, map, infoWindow, html);
        }
      });
    
	

    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function doNothing() {}
	

	
	
	//var easy =setTimeout(nearestTower(), 500);
	nearestTower();
		
	
	//var heatmap = new google.maps.visualization.HeatmapLayer({
 // data: heatMapData
//});
//heatmap.setOptions({radius: 55});
//heatmap.setOptions({opacity: 0.4});	
//heatmap.setMap(map);
	
	

//*************************************	

/*
	new google.maps.LatLng(24.886, -70.269)
	var myLatlng = {
		lat: 36.807,
		lng: 10.195
	};
	var myLatlng2 = {
		lat: 36.807,
		lng: 10.095
	};
	//var tower1 = createTowerMarker(myLatlng, radT1);
	//var tower2 = createTowerMarker(myLatlng2, radT2);
	var Latlng1 = new google.maps.LatLng(24.886, -70.269);
	Latlng2 = new google.maps.LatLng(28.886, -72.269);



	//var distance=google.maps.geometry.spherical.computeDistanceBetween(
	//  myLatlng, Latlng2);
	

	var distance= google.maps.geometry.spherical.computeDistanceBetween (Latlng1,Latlng2);
	 var pdistance = document.getElementById("distance");
    pdistance.innerHTML = distance;  
	
	
	
	 
    google.maps.event.addListener(marker,"dragend", function(event){
    console.log("marker dropped !");
      var plocation = document.getElementById("location");
    plocation.innerHTML = event.latLng.lat()+","+event.latLng.lng();  
    }); 
    */
	//var test= markerTower.getPosition().lat();
	// var pdistance = document.getElementById("test");
	// pdistance.innerHTML = test;  

	/*
		google.maps.event.addListener(marker,"dragend", function(event) {
    
      if (google.maps.geometry.poly.containsLocation(event.latLng, tower1.towerCircle)){
		  
	 console.log("yes !");
		  
	  }});
	
	  var triangleCoords = [
          {lat: 25.774, lng: -80.19},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757}
        ];

        var bermudaTriangle = new google.maps.Polygon({paths: triangleCoords});

        google.maps.event.addListener(map, 'click', function(e) {
          var resultColor =
              google.maps.geometry.poly.containsLocation(e.latLng, bermudaTriangle) ?
              'red' :
              'green';

          new google.maps.Marker({
            position: e.latLng,
            map: map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: resultColor,
              fillOpacity: .2,
              strokeColor: 'white',
              strokeWeight: .5,
              scale: 10
            }
          });
        });
	*/
	var input = (document.getElementById('pac-input'));

	// var types = document.getElementById('type-selector');
	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);




	autocomplete.addListener('place_changed', function () {

		marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			window.alert("Autocomplete's returned place contains no geometry");
			return;
		}


		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}


		createMarker(place.geometry.location);
		var address = '';
		if (place.address_components) {
			address = [
				(place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
		}

		nearestTower();
	});

	var geocoder = new google.maps.Geocoder;
	var inputgeo = document.getElementById('latlng');
	//map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputgeo);



	document.getElementById('submit').addEventListener('click', function () {
		marker.setVisible(false);
		var input2 = document.getElementById('latlng').value;
		var latlngStr = input2.split(',', 2);
		var latlng = {
			lat: parseFloat(latlngStr[0]),
			lng: parseFloat(latlngStr[1])
		};
		geocoder.geocode({
			'location': latlng
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					map.setZoom(11);
					createMarker(latlng);
					map.setCenter(latlng);
					nearestTower();
				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
	});

	//addTower();
	//var dirarlat = DBtowers[0].getPosition().lat();
	//var dirarlng  = DBtowers[1].getPosition().lng();

	//console.log(dirarlat);
	//console.log(dirarlng);
}
//--------------------------------------------------------------------------------------------------------------
function nearestTower(){ 
			setTimeout(function(){
			for (var i = 0; i < DBtowers.length; i++) {
			
			var dirarlat = DBtowers[i].getPosition().lat();
			var dirarlng  = DBtowers[i].getPosition().lng();
			/*	
			console.log(dirarlat);
			console.log(dirarlng);
			console.log("**************************");	
			*/	
			
			test = marker.getPosition();
				
	var ptest = document.getElementById("test");
	ptest.innerHTML = test;
	
	var distance = (google.maps.geometry.spherical.computeDistanceBetween(test, DBtowers[i].getPosition()) / 1000).toFixed(2);
	var pdistance = document.getElementById("distance");
		
				//console.log(distance);
				
				distarray.push(distance);
			
				
				var name = DBtowers[i].getTitle();
				var dis = distance;
				
				namedis[name] = dis;

			}
			
			var min = Math.min.apply(null,Object.keys(namedis).map(function(x){ return namedis[x] }));
			
			
			 nearest = Object.keys(namedis).filter(function(x){ return namedis[x] == min; })[0];
				
				console.log("the nearest point is : "+nearest);
			
			pdistance.innerHTML = nearest;
				
		console.log("the final number of towers: "+DBtowers.length);
			}, 1000);
	}

//-----------------------------------------------------------------------------------------------------------------

function createMarker(latLng) {
	var markerOptions = {
		icon: ("map-marker-s.png"),
		position: latLng,
		//position: {lat: 40.714, lng: -74.006},
		map: map,
		clickable: true,
		draggable: true,
		animation: google.maps.Animation.DROP

	};
	marker = new google.maps.Marker(markerOptions);
	markers.push(marker);

	/*    
	 google.maps.event.addListener(marker,"click", function(event){
	infoWindow.setContent("location: "+event.latLng.lat().toFixed(2)+","+event.latLng.lng().toFixed(2));
	    infoWindow.open(map,marker);
	    
	});   */
	
	google.maps.event.addListener(marker, "dragend", function (event) {
		console.log("marker dropped !");
		var plocation = document.getElementById("location");
		plocation.innerHTML = event.latLng.lat() + "," + event.latLng.lng();
		nearestTower();
	});


/*
	test = marker.getPosition();

	var ptest = document.getElementById("test");
	ptest.innerHTML = test;

	var distance = (google.maps.geometry.spherical.computeDistanceBetween(test, towers[0].getPosition()) / 1000).toFixed(2);
	var pdistance = document.getElementById("distance");
	pdistance.innerHTML = distance;

	var distance2 = (google.maps.geometry.spherical.computeDistanceBetween(test, towers[1].getPosition()) / 1000).toFixed(2);
	var pdistance2 = document.getElementById("distance2");
	pdistance2.innerHTML = distance2;
	var nearest = document.getElementById("nearest");
	if (distance > distance2) {


		nearest.innerHTML = "Tower2";


	} else {

		nearest.innerHTML = "Tower1";

	}





	var radiusT1 = document.getElementById("radius1");
	if ((distance * 1000) < radT1) {


		radiusT1.innerHTML = "Yes";

	} else {

		radiusT1.innerHTML = "No";

	}
	var radiusT2 = document.getElementById("radius2");


	if ((distance2 * 1000) < radT2) {


		radiusT2.innerHTML = "Yes";

	} else {

		radiusT2.innerHTML = "No";

	}









	google.maps.event.addListener(marker, "dragend", function (event) {
		test = marker.getPosition();

		var ptest = document.getElementById("test");
		ptest.innerHTML = test;

		var distance = (google.maps.geometry.spherical.computeDistanceBetween(test, towers[0].getPosition()) / 1000).toFixed(2);
		var pdistance = document.getElementById("distance");
		pdistance.innerHTML = distance;

		var distance2 = (google.maps.geometry.spherical.computeDistanceBetween(test, towers[1].getPosition()) / 1000).toFixed(2);
		var pdistance2 = document.getElementById("distance2");
		pdistance2.innerHTML = distance2;
		var nearest = document.getElementById("nearest");
		if (distance > distance2) {


			nearest.innerHTML = "Tower2";


		} else {

			nearest.innerHTML = "Tower1";

		}



		var radiusT1 = document.getElementById("radius1");
		if ((distance * 1000) < radT1) {


			radiusT1.innerHTML = "Yes";

		} else {

			radiusT1.innerHTML = "No";

		}
		var radiusT2 = document.getElementById("radius2");
		if ((distance2 * 1000) < radT2) {


			radiusT2.innerHTML = "Yes";

		} else {

			radiusT2.innerHTML = "No";

		}

	});
*/


}

//----------------------------------------------------------------------------------------------------------------------
function createTowerMarker(myLatLng, rad) {



	markerTower = new google.maps.Marker({
		icon: ("tower.png"),
		position: myLatLng,
		map: map,
		title: 'Tower!'
	});

	towers.push(markerTower);
	
	

	towerCircle = new google.maps.Circle({
		strokeColor: '#FF0000',
		strokeOpacity: 0.5,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.1,
		map: map,
		center: myLatLng,
		radius: rad


	});
}
//----------------------------------------------------------------------------------------------------------------------
function addTower() {
	var geocoder = new google.maps.Geocoder;
	document.getElementById('addsubmit').addEventListener('click', function () {
		var inputrad = document.getElementById('addrad').value;
		var inputcoord = document.getElementById('addtower').value;
		var latlngStr = inputcoord.split(',', 2);
		var latlngtower = {
			lat: parseFloat(latlngStr[0]),
			lng: parseFloat(latlngStr[1])
		};
		geocoder.geocode({
			'location': latlngtower
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					map.setZoom(12);

					createTowerMarker(latlngtower, parseInt(inputrad));
					map.setCenter(latlngtower);

				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
	});


}

//---------------------------------------------------------------------------------------------------------------------  

function calcDistance(p1, p2) {
	return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}

//---------------------------------------------------------------------------------------------------------------------    
function returnPosition() {
	map.panTo(test);
}

//---------------------------------------------------------------------------------------------------------------------    

function clearMarkers() {
	setMapOnAll(null);
}

//---------------------------------------------------------------------------------------------------------------------    
function deleteMarkers() {
	clearMarkers();
	markers = [];
}
//--------------------------------------------------------------------------------------------------------------------- 

function showMarkers() {
	setMapOnAll(map);
}


//--------------------------------------------------------------------------------------------------------------------- 

function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}
//--------------------------------------------------------------------------------------------------------------------- 
function displayError(error) {

}
//---------------------------------------------------------------------------------------------------------------------
function openPanel() {
    document.getElementById("panel").style.width = "25%";
	
   passValue();
	getChaine();	
	createPath();
	
}
function closePanel() {
    document.getElementById("panel").style.width = "0%";
}
//---------------------------------------------------------------------------------------------------------------------
function getChaine() {
      downloadUrl("genxmlChannel.php", function(data) {
        var xml = data.responseXML;
        var chaines = xml.documentElement.getElementsByTagName("chaine");
		  
		  var table='';
		  
		  table+='<th>'+'Chaine'+'</th>'+'<th>'+'Signal'+'</th>';
        for (var i = 0; i < chaines.length; i++) {
			
			//var pantenne = chaines[i].getAttribute("nom");
			//console.log("test: "+pantenne);
			//var plocation = document.getElementById("chainelist");
	        //plocation.innerHTML = pantenne;
			
			
          var name = chaines[i].getAttribute("nom");
			var FS = parseFloat(chaines[i].getAttribute("FS"));	
			signalLevelIndicator(FS);
			table+='<tr>';
		//for(var c=0; c<cols; c++){
			
			table+='<td width=70%>'+name+'</td>'+'<td>'+'<img src="'+status+'"></td>';
		//}
		table+='</tr>';
			
		}
			
			

	var test = document.getElementById("list");
	test.innerHTML = '<table border=1>'+table+'</table>';
			
			
			
	   });
			
		var status	
	function signalLevelIndicator(value){
		
		switch (value) {
    case 0:
        status = "level0.png";
        break;
    case 1:
        status = "level1.png";
        break;
    case 2:
        status = "level1.png";
        break;
    case 3:
        status = "level2.png";
        break;
    case 4:
        status = "level2.png";
        break;
    case 5:
        status = "level3.png";
        break;
    case 6:
        status = "level3.png";
		break;		
	case 7:
        status = "level4.png";
        break;
    case 8:
        status = "level4.png";
        break;
    case 9:
        status = "level5.png";
		break;	
	 case 10:
        status = "level5.png";
		break;				
}
		
		
	}		
			
			
			
			
			
			
			
			
			
			
			
			
	/*		
      
 var body = document.getElementsByTagName("chainelist")[0];
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");
  for (var i = 0; i < chaines.length; i++) {
    var row = document.createElement("tr");
   
      var cell = document.createElement("td");
       
      var cellText = document.createTextNode(chaines[i].getAttribute("nom"));
    
   
      var cell2 = document.createElement("td");
		 var cellText2 = document.createTextNode(chaines[i].getAttribute("FS"));
      cell.appendChild(cellText);
	 
	  cell2.appendChild(cellText2);
      row.appendChild(cell);
	  row.appendChild(cell2);
  
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  chainelist.appendChild(tbl);
  tbl.setAttribute("border", "1");
 
        }
     
     */


    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function doNothing() {}
	

	
}
//---------------------------------------------------------------------------------------------------------------------
function generatetable() {
  var body = document.getElementsByTagName("chainelist")[0];
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");
  for (var i = 0; i < 8; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 2; j++) {
      var cell = document.createElement("td");
       
      var cellText = document.createTextNode("Dirar");
      
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  chainelist.appendChild(tbl);
  tbl.setAttribute("border", "1");
}
//---------------------------------------------------------------------------------------------------------------------
function passValue() {
	
	 document.cookie="v=" + nearest;

}
//---------------------------------------------------------------------------------------------------------------------
function createMainTower() {
	  downloadUrl("genxmlMainTower.php", function(data) {
        var xml = data.responseXML;
        var xmarkers = xml.documentElement.getElementsByTagName("marker");
        for (var i = 0; i < xmarkers.length; i++) {
          var name = xmarkers[i].getAttribute("nom");
          var gouvernorat = xmarkers[i].getAttribute("gouvernorat");
          var delegation = xmarkers[i].getAttribute("delegation");
          var point = new google.maps.LatLng(
              parseFloat(xmarkers[i].getAttribute("latitude")),
              parseFloat(xmarkers[i].getAttribute("longitude")));
          var html = "<b> Antenne: " + name + "</b></br><b> Gouvernorat: " + gouvernorat + "</br><b> Delegation: " + delegation + "</b>" ;
        // var icon = customIcons[type] || {};
         var markerTower = new google.maps.Marker({
          map: map,
           position: point,
           icon: "tower.png",
		  title: name	 
			});
			//createTowerMarker(point, radT1);
			//console.log("DB marker created!");
			DBtowers.push(markerTower);
			heatMapData.push(point);
			//console.log("number of towers: "+DBtowers.length);
          bindInfoWindow(markerTower, map, infoWindow, html);
        }
      });
    
	

    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function doNothing() {}
}

//--------------------------------------------------------------------------------------------------------------------- 
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
//--------------------------------------------------------------------------------------------------------------------- 
function createPath() {

	 poly = new google.maps.Polyline({
    strokeColor: '#0000FF',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map,
    });
	
	
	
		  downloadUrl("genxmlAcoords.php", function(data) {
        var xml = data.responseXML;
        var xmarkers = xml.documentElement.getElementsByTagName("Acoords");
        for (var i = 0; i < xmarkers.length; i++) {
       
          var value1 = parseFloat(xmarkers[i].getAttribute("latitude"));
          var value2 = parseFloat(xmarkers[i].getAttribute("longitude"));
         
	
	var pathtest=new google.maps.LatLng(value1, value2);

	console.log(value1+","+value2);
	
	
	var path = [marker.getPosition(),pathtest];
    //poly.setPath(path);
	 var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]).toFixed();;
	console.log(heading+" degree");
			
			
			var plocation = document.getElementById("degree");
	        plocation.innerHTML = heading+"°";

			document.getElementById("needle").style.transform = "rotate("+heading+"deg)";
	
			
			
        }
      });
    
	


    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function doNothing() {}
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	
}
//--------------------------------------------------------------------------------------------------------------------- 

window.onload = function () {
	if (navigator.geolocation) {


		navigator.geolocation.getCurrentPosition(displayLocation,
			displayError, {
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			}
		);
	} else {
		alert("Sorry, this browser doesn't support geolocation!");
	}
	
}
