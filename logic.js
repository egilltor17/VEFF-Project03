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
    console.log('ob = ' + String(ob));
    console.log('ob.description = ' + String(ob.description));
    console.log('ob.lat = ' + String(ob.lat));
    console.log('ob.lon = ' + String(ob.lon));
    console.log('ob.observations' + String(ob.observations));
    if(ob !== undefined && ob.description !== undefined && ob.lat !== undefined  && ob.lon !== undefined  && ob.observations !== undefined ){
        console.log('passed first barrier');
        if(-90 >= ob.lat >= 90){//enþá að fikkta
            if((typeof(ob.lon) == Number) && (-180 >= ob.lon >= 180)){
                return true;
            }
        }
    }
        return false;
}

exports.observationValidation = function(ob){
    if(ob.temp !== undefined && ob.windSpeed !== undefined && ob.windDir !== undefined && ob.prec !== undefined && ob.hum !== undefined){
        return true;
    }
    return false;
}