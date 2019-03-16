// Project 03/logic.js

var sSerial = 1000;    // remember to purge dummy data before handin
var oSerial = 1000;

exports.createStation = function(ob){
    if (this.stationValidation(ob)){
    var long = Number(req.query.lon);
    var lati = Number(req.query.lat);
    var descr = req.query.description;
    var obs = Number(req.query.observations);
    var stationId =  5 /*ATH ÞARF AÐ BREYTA VANTAR ID GENERATOR*/ 
        return ob
    }
    return false
}

exports.stationValidation = function(ob){
    if(typeof(ob.lat) == Number && (-90 >= ob.lat >= 90)){
        if((typeof(ob.lon) == Number) && (-180 >= ob.lon >= 180)){
            return true;
        }
    }
    return false;
}

function getNewStationId() {
    return sSerial++;
}

function getNewObservationId() {
    return oSerial++;
}