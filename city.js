var radius = 8;
var citiesNumber = 0;
var cities = [];

// function City(){
//     this.x = getRndInteger(15, canvas_cities.width - 15);
//     this.y = getRndInteger(15, canvas_cities.height - 15);
// }

function drawCity(x, y){
    ctx_cities.beginPath();
    ctx_cities.arc(x, y, radius, 0, Math.PI*2);
    ctx_cities.fill();
}

function drawCity2(x, y){
    ctx_cities.beginPath();
    ctx_cities.fillStyle = "#ed3a3a";
    ctx_cities.arc(x, y, radius, 0, Math.PI*2);
    ctx_cities.fill();
}

function drawCities() {
    citiesNumber = parseInt(citiesInput.value);
    ctx_cities.clearRect(0, 0, canvas_cities.width, canvas_cities.height);
    for(var i = 0; i < citiesNumber; i++){
        cities[i] = [getRndInteger(15, canvas_cities.width - 15), getRndInteger(15, canvas_cities.height - 15)]
        drawCity(cities[i][0], cities[i][1]);
    }
}