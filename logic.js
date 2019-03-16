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
exports.updater = function(station, req){
    var changesObject = {lat: 0, lon:"0", description:""}
    if(req.body.lat != undefined){
        station.lat = req.body.lat;
        req.body.lat = String(req.body.lat)
        Object.defineProperty(changesObject, "lat",{value: req.body.lat})  
    }
    if(req.body.lon != undefined){
        station.lon = req.body.lon;
        req.body.lon = String(req.body.lon)
        Object.defineProperty(changesObject, "lon",{value: req.body.lon})
    }
    if(req.bod.description != undefined){
        station.description = req.body.description;
        req.body.description = String(req.body.description)
        Object.defineProperty(changesObject, "description",{value: req.body.description})
    }
    changesObject = JSON.stringify(changesObject)
    //Sleppi observations þar sem að það make-ar ekki sense
    return changesObject
    }