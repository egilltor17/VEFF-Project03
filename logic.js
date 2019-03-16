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
    console.log('ob = ' + String(ob));
    console.log('ob.description = ' + String(ob.description));
    console.log('ob.lat = ' + String(ob.lat));
    console.log('ob.lon = ' + String(Number(ob.lon)));
    console.log('ob.observations = ' + String(ob.observations));
    if(ob === undefined || ob.description === undefined || ob.lat === undefined  || ob.lon === undefined  || ob.observations === undefined ){
        return 1;
    }
    if(Number.isNaN(Number(ob.lat)) == NaN || Number(ob.lat) < -90 || Number(ob.lat) > 90){
        return 2;
    }
    if(Number.isNaN(Number(ob.lon)) || Number(ob.lon) < -180 || Number(ob.lon) > 180){
        return 3;
    }
    console.log(Number(ob.lon));
    return 0
}
    
exports.getNewStationId = function () {
    return sSerial++;
}

exports.getNewObservationId = function() {
    return oSerial++;
}

exports.observationValidation = function(ob){
    if(ob !== undefined && ob.temp !== undefined && ob.windSpeed !== undefined && ob.windDir !== undefined && ob.prec !== undefined && ob.hum !== undefined){
        return 1;
    }
    if(Number(ob.windSpeed) < 0) {
        return 4;
    }
    if(["n","nne","ne","ene","e","ese","se","sse","s","ssw","sw","wsw","w","wnw","nw","nnw"].find(ob.windDir)) {
        return 5;
    }
    if(Number(ob.prec) < 0) {
        return 6;
    }
    if(Number(ob.hum) < 0 && Number(ob.hum) > 100) {
        return 7;
    }
    return 0;
}

exports.findStationWithId = function(stations, id){
    for(let i=0; i<stations.length; i++){
        if(stations[i].id == id){
            return stations[i];
        }
    }
}