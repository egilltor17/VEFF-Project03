// Project 03/logic.js

var sSerial = 1000;
var oSerial = 1000;

exports.stationValidation = function(ob) {
    if(ob === undefined) {
        return 1;
    }
    if(ob.description === undefined) {
        return 2;   
    }
    if(ob.lat === undefined || Number.isNaN(Number(ob.lat)) == NaN || Number(ob.lat) < -90 || Number(ob.lat) > 90) {
        return 3;
    }
    if(ob.lon === undefined || Number.isNaN(Number(ob.lon)) || Number(ob.lon) < -180 || Number(ob.lon) > 180) {
        return 4;
    }
    return 0
}
    
exports.observationValidation = function(ob){
    if(ob === undefined) {
        return 1;
    }
    if(ob.temp === undefined || Number.isNaN(Number(ob.temp)) || Number(ob.temp) < -273.15) {
        return 5;
    }
    if(ob.windSpeed === undefined || Number.isNaN(Number(ob.windSpeed)) || Number(ob.windSpeed) < 0) {
        return 6;
    }
    if(ob.windDir === undefined || !(["n","nne","ne","ene","e","ese","se","sse","s","ssw","sw","wsw","w","wnw","nw","nnw"].find((el) => {return (el === ob.windDir)}))) {
    return 7;
    }
    if(ob.prec === undefined || Number.isNaN(Number(ob.prec)) || Number(ob.prec) < 0) {
        return 8;
    }
    if(ob.hum === undefined || Number.isNaN(Number(ob.hum)) || Number(ob.hum) < 0 && Number(ob.hum) > 100) {
        return 9;
    }
    return 0;
}

exports.getNewStationId = function () {
    return sSerial++;
}

exports.getNewObservationId = function() {
    return oSerial++;
}

exports.findStationWithID = function(stations, id) {
    for(let i=0; i<stations.length; i++){
        if(stations[i].id == id){
            return stations[i];
        }
    }
    return null;
}
