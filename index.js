// Project 03/index.js

const http = require("http");
const logic = require("./logic");
const express = require("express");
const app = express();
const url = require("body-parser");
const hostname = "127.0.0.1";
const port = "3000";

app.use(url.json());

http.createServer(app).listen(port, () => console.log(`Weather app listening on port ${port}!`));
// app.listen(port, () => console.log(`Weather app listening on port ${port}!`));

/* ============================================================================================ */
/* Sample data                                                                                  */
/* ============================================================================================ */

//The following is an example of an array of two stations. 
//The observation array includes the ids of the observations belonging to the specified station
var stations = [
    {id: 1, description: "Reykjavik", lat: 64.1275, lon: -21.9028, observations: []},
    {id: 422, description: "Akureyri", lat: 65.6856, lon: -18.1002, observations: [1]},
    {id: 801, description: "Egilsstaðir", lat: 66.9456, lon: -13.1002, observations: [4, 5, 6]}
];

//The following is an example of an array of two observations.
//Note that an observation does not know which station it belongs to!
var observations = [
    {id: 1, date: 1551885104266, temp: -2.7, windSpeed: 2.0, windDir: "ese", prec: 0.0, hum: 82.0},
    {id: 2, date: 1551885137409, temp: 0.6, windSpeed: 5.0, windDir: "n", prec: 0.0, hum: 50.0},
    {id: 3, date: 1551885138664, temp: 5.3, windSpeed: 3.2, windDir: "ne", prec: 0.0, hum: 71.9},
    {id: 4, date: 1551882446464, temp: 22.3, windSpeed: 0.2, windDir: "e", prec: 0.0, hum: 77.2},
    {id: 5, date: 1551883466464, temp: 26.3, windSpeed: 15.7, windDir: "sw", prec: 0.0, hum: 84.7},
    {id: 6, date: 1551884464764, temp: 25.3, windSpeed: 30.4, windDir: "nw", prec: 0.0, hum: 74.0}
];

var errorMessages = [
    "All good.",
    "The request body is undefined.",
    "Description \"description\": is missing",
    "Latitude \"lat\": must be in range [-90, 90].",
    "Longitude \"lon\": must be in range [-180, 180].",
    "Tempeture \"temp\": must be a number",
    "Wind speed \"windSpeed\": must not be negative.",
    "Wind direction \"windDir\": must be lowercase cardinal direction",
    "Precipitation \"prec\": must not be negative.",
    "Humidity \"hum\": musts be in range [0, 100]"
];

/* ============================================================================================ */
/* GET requests                                                                                 */
/* ============================================================================================ */

app.get('/api/v1', (req, res) => {
    res.status(200).json({message: "welcome to our api."});
});

app.get('/api/v1/stations', (req, res) => {
    let shortStations = [];
    stations.forEach(station => {
        shortStations.push({id: station.id, description: station.description});
    });
    res.status(200).json(shortStations);
});

app.get('/api/v1/stations/:sId', (req, res) => {
    for(let i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            res.status(200).json(stations[i]);
            return;
        }
    }
    res.status(404).json({message: "station not found."});
});

app.get('/api/v1/stations/:sId/observations', (req, res) => {
    // for(let i = 0; i < stations.length; i++) {
    //     if(stations[i].id === (Number)(req.params.sId)) {
        let stationId = logic.findStationWithID(stations, req.params.sId);
        if(stationId !== null){
            let obs = [];
            for(let j = 0; j < stationId.observations.length; j++) {
                // stations[i].observations.forEach(oId =>{
                    //     if((Number)(observations[j].id) === (Number)(oId)) {
                        //         obs.push({date: observations[j].date, temp: observations[j].temp, windSpeed: observations[j].windSpeed, windDir: observations[j].windDir, prec: observations[j].prec, hum: observations[j].hum});
                        //     }
                        // });
                        obs.push({id: stationId.observations[j].id, date: stationId.observations[j].date, temp: stationId.observations[j].temp, windSpeed: stationId.observations[j].windSpeed, windDir: stationId.observations[j].windDir, prec: stationId.observations[j].prec, hum: stationId.observations[j].hum});
                    }
                    res.status(200).json(obs);
                    return;
                }else{
                    res.status(404).json({message: "station not found."});
                }
    //     }
    // }
    res.status(404).json({message: "station not found."});
});

app.get('/api/v1/stations/:sId/observations/:oId', (req, res) => {
    // for(let i = 0; i < stations.length; i++) {
    //     if(stations[i].id === Number(req.params.sId)) {
        stationId = logic.findStationWithID(stations, req.params.sId)
        if(stationId !== null){
            for(let j = 0; j < stationId.observations.length; j++) {
                if(Number(stationId.observations[j].id) === Number(req.params.oId)) {
                    res.status(200).json({date: stationId.observations[j].date, temp: stationId.observations[j].temp, windSpeed: stationId.observations[j].windSpeed, windDir: stationId.observations[j].windDir, prec: stationId.observations[j].prec, hum: stationId.observations[j].hum});
                    return;
                }
            }
            res.status(404).json({message: "observation not found."});
        }else{
            res.status(404).json({message: "station not found."});           
        }
    //     }
    // }
    // res.status(404).json({message: "station not found."});
});

/* ============================================================================================ */
/* POST requests                                                                                */
/* ============================================================================================ */
app.post('/api/v1/stations', (req, res)=> {
    let validationMsg = logic.stationValidation(req.body);
    if(validationMsg > 0) {
        res.status(400).json({'message':errorMessages[validationMsg]});
    } else {
        let long = Number(req.body.lon);
        let lati = Number(req.body.lat);
        let descr = req.body.description;
        // let obs = req.body.observations;
        let obs = [];
        let stationId =  logic.getNewStationId();
        
        newStation = Object({id: stationId, lon: long, lat: lati, description: descr, observations:obs});
        stations.push(newStation);
        res.status(201).json(newStation);
    }
});

app.post('/api/v1/stations/:id/observations', (req, res) => {
    let validationMsg = logic.observationValidation(req.body);
    if(validationMsg > 0) {
        res.status(400).json({'message':errorMessages[validationMsg]});
    } else {   
        let temperature = Number(req.body.temp);
        let tmpWindSpeed = Number(req.body.windSpeed);
        let tmpWindDirection = req.body.windDir;
        let precip = Number(req.body.prec);
        let humidity = Number(req.body.hum);
        let tmpId = logic.getNewObservationId();
        let time = new Date().getTime();
        
        let newObservation = Object({id:tmpId, date:time, temp:temperature, windSpeed:tmpWindSpeed, windDir:tmpWindDirection, prec:precip, hum:humidity});
        let parentStation = logic.findStationWithID(stations, req.params.id);
        if(parentStation !== null){
            console.log(parentStation.observations);
            console.log(newObservation);
            
            parentStation.observations.push(newObservation);
            res.status(201).json(newObservation);
        }else{
            res.status(404).json({message:"station not found."});
        }
    }
})

/* ============================================================================================ */
/* UPDATE requests                                                                              */
/* ============================================================================================ */
app.put('/api/v1/stations/:sId',(req,res)=>{
    // (Completely) Updates an existing station. The updated data is expected in the request body (excluding the id).
    // The request, if successful, returns all updated attributes of the station
    for(let i= 0; i < stations.length; i++){
        if(stations[i].id === Number(req.params.sId)) {
            let changes = logic.updater(stations[i],req);
            res.status(200).json(changes);
            return;
        }
    }
    res.status(404).send("message: station not found.");
})



/* ============================================================================================ */
/* DELETE requests                                                                              */
/* ============================================================================================ */

app.delete('/api/v1', (req, res) => {
    console.log("doomsday is upon us!");
    res.status(405).json({message: "method not allowed."});
});

app.delete('/api/v1/stations', (req, res) => {
    stations = [];
    observations = [];
    res.status(202).json({message: "It's all gone! Everything! Just gone..."});
});

app.delete('/api/v1/stations/:sId', (req, res) => {
    for(let i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            for(let j = 0; j < observations.length; j++) {
                stations[i].observations.forEach(oId =>{
                    if(Number(observations[j].id) === Number(oId)) {
                        observations.splice(j, 1);
                    }
                });
            }
            stations.splice(i, 1);
            res.status(202).json({message: "station " + req.params.sId + " has been deleted along with all of it's observations."});
            return;
        }
    }
    res.status(404).json({message: "station not found"});
});

app.delete('/api/v1/stations/:sId/observations/', (req, res) => {
    for(let i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            for(let j = 0; j < observations.length; j++) {
                if(Number(observations[j].id) === Number(req.params.oId)) {
                    observations.splice(j, 1);
                }
            }
            stations[i].observations = [];
            res.status(202).json({message: "all observations for station " + req.params.sId + " have been deleted."});
            return;
        }
    }
    res.status(404).json({message: "station not found."});
});

app.delete('/api/v1/stations/:sId/observations/:oId', (req, res) => {
    for(let i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            for(let j = 0; j < observations.length; j++) {
                if(Number(observations[j].id) === Number(req.params.oId)) {
                    foundSomething = true;
                    observations.splice(j, 1);
                    for(let k = 0; k < stations[i].observations.length; k++) {
                        if(Number(stations[i].observations[k]) === Number(req.params.oId)) {
                            stations[i].observations.splice(k, 1);
                            res.status(202).json({message: "observation " + req.params.oId + " has been deleted."});
                            return;
                        }
                    }
                }
            }
        res.status(404).json({message: "observation not found."});
        }
    }
    res.status(404).json({message: "station not found."});
});


/*
1. Read all stations
    Returns an array of all stations. For each station, only the description and the id is included in the
    response.
2. Read an individual station 
    Returns all attributes of a specified station.
3. Create a new station
    Creates a new station. The endpoint expects all attributes apart from the id in the request body. The
    id shall be auto-generated. The request, if successful, shall return the new station (all attributes,including id).
4. Delete a station
    Deletes an existing station. The request also deletes all observations for the given station. The
    request, if successful, returns all attributes of the deleted station (including all observations in the
    observations attribute).
5. Update a station
    (Completely) Updates an existing station. The updated data is expected in the request body (excluding the id). The request, if successful, returns all updated attributes of the station.
6. Delete all stations
    Deletes all existing stations. The request also deletes all observations for all existing stations. The
    request, if successful, returns all deleted stations (all attributes), as well as their observations (as a
    part of the observations attribute).


1. Read all observations for a station
    Returns an array of all observations (with all attributes) for a specified station.
2. Read an individual observation
    Returns all attributes of a specified observation (for a station).
3. Create a new observation
    Creates a new observation for a specified station. The endpoint expects all attributes apart from the
    id and the date in the request body. The id (unique, non-negative number) and the date (current date)
    shall be auto-generated. The request, if successful, shall return the new observation (all attributes,
    including id and date).
4. Delete an observation
    Deletes an existing observation for a specified station. The request, if successful, returns all attributes of the deleted observations[j].
5. Delete all observations for a station
    Deletes all existing observations for a specified station. The request, if successful, returns all deleted
    observations (all attributes).
*/
