// Project 03/logic.js

var sSerial = 1000;    // remember to purge dummy data before handin
var oSerial = 1000;

exports.createStation = function(ob){
    if (this.stationValidation(ob) == true){
        var obs = [0]
        var stationId =  5 /*ATH ÞARF AÐ BREYTA VANTAR ID GENERATOR*/ 
        Object.defineProperty(ob,"id",{value:stationId});
        Object.defineProperty(ob,"observations",{value:obs}); 
        return ob
    }
    return false
}

exports.stationValidation = function(ob){
    try{
        ob.lat = Number(ob.lat)
        ob.lon = Number(ob.lon)
        if(ob.lat < -90 || ob.lat > 90) throw "Invalid Latitude";
        if(ob.lon < -180 ||ob.lon > 180) throw "Invalid Longitude";
        return true;
    }
    catch(err){
        return false;
    }
}

function getNewStationId() {
    return sSerial++;
}

function getNewObservationId() {
    return oSerial++;
}
