document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=20981986fad2bf081c0dea13b5b126df";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      let ret1 = json.name + ", " + json.sys.country
      document.getElementById("nameAndCountry").innerHTML = ret1;

      let ret2 = "(" + json.coord.lat + ", " + json.coord.lon + ")" + "</h2>";
      document.getElementById("coordinates").innerHTML = ret2;

      let ret3 = "";
      for (let i=0; i < json.weather.length; i++) {
	       ret3 += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" style="width: 100px;"/>';
      }
      document.getElementById("icon").innerHTML = ret3;

      let ret4 = json.main.temp + " &deg;F";
      document.getElementById("temp").innerHTML = ret4;

      let ret5 = "";
      for (let i=0; i < json.weather.length; i++) {
	        ret5 += json.weather[i].description;
	        if (i !== json.weather.length - 1)
	         ret5 += ", "
      }
      ret5 = ret5[0].toUpperCase() + ret5.slice(1);
      document.getElementById("description").innerHTML = ret5;

      let ret6 = "Current Temperature";
      document.getElementById("text1").innerHTML = ret6;

      let ret7 = Math.trunc(json.main.temp_max) + " &deg;F";
      document.getElementById("high").innerHTML = ret7;

      let ret8 = "Today's High";
      document.getElementById("text2").innerHTML = ret8;

      let ret9 = Math.trunc(json.main.temp_min) + " &deg;F";
      document.getElementById("low").innerHTML = ret9;

      let ret10 = "Today's Low";
      document.getElementById("text3").innerHTML = ret10;

      var sr = new Date(json.sys.sunrise * 1000);
      var ss = new Date(json.sys.sunset * 1000);
      var srminutes = "0" + sr.getMinutes();
      var ssminutes = "0" + ss.getMinutes();
      var srhours = sr.getHours() + (json.timezone/3600)+7;
      var sshours = ss.getHours() + (json.timezone/3600)+7;
      let ret11 = "Sunrise: " + srhours + ":" + srminutes.substr(-2);
      document.getElementById("sunrise").innerHTML = ret11;
      let ret12 = "Sunset: " + sshours + ":" + ssminutes.substr(-2);
      document.getElementById("sunset").innerHTML = ret12;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial" + "&APPID=20981986fad2bf081c0dea13b5b126df";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      document.getElementById("text4").innerHTML = "5-Day Forecast";
      let forecast = "<div class =\"row\"><h4>" + moment(json.list[0].dt_txt).format('MMMM Do YYYY') + "</h4></div><div class =\"row\">";
      let currentdate = moment(json.list[0].dt_txt).format('MMMM Do YYYY');
      for (let i=0; i < json.list.length; i++) {
        if(currentdate != moment(json.list[i].dt_txt).format('MMMM Do YYYY')) {
          currentdate = currentdate = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
          forecast += "</div><div class =\"row\"><h4>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "<h4></div>";
          //forecast += "<div class =\"row\">High: " + Math.trunc(json.list[i].main.temp_max) + " &deg;F\tLow: " + Math.trunc(json.list[i].main.temp_min) + " &deg;F</div>"
          //forecast += "<div class=\"col\">High: " + Math.trunc(json.list[i].main.temp_max) + " &deg;F" + "</div><div class=\"col\">Low: " + Math.trunc(json.list[i].main.temp_min) + " &deg;F" + "</div>";
          forecast += "<div class =\"row\">";
        }
      	forecast += "<div class =\"col-6 center\">" + "<div class =\"row\">" + "<div class =\"col\">" + moment(json.list[i].dt_txt).format('h:mm a') + "</div>";
      	forecast += "<div class =\"col\">" +'<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>' + "</div>";
        forecast += "<div class =\"col\">" + Math.trunc(json.list[i].main.temp) + " &deg;F" + "</div></div>";
        forecast += "</div>";

      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
