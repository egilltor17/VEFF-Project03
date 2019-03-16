// Project 03/weatherBackend/index.js
//Sample data for Project 3

//The following is an example of an array of two stations. 
//The observation array includes the ids of the observations belonging to the specified station
var stations = [
    {id: 1,   description: "Reykjavik", lat: 64.1275, lon: 21.9028, observations: [2, 3]},
    {id: 422, description: "Akureyri",  lat: 65.6856, lon: 18.1002, observations: [1]}
];

//The following is an example of an array of two observations.
//Note that an observation does not know which station it belongs to!
var observations = [
    {id: 1, date: 1551885104266, temp: -2.7, windSpeed: 2.0, windDir: "ese", prec: 0.0, hum: 82.0},
    {id: 2, date: 1551885137409, temp: 0.6,  windSpeed: 5.0, windDir: "n",   prec: 0.0, hum: 50.0},
    {id: 3, date: 1551885447409, temp: 11.6, windSpeed: 3.0, windDir: "ne",  prec: 0.0, hum: 76.2},
];


const express = require("express");
const app = express();
const url = require("body-parser");
const hostname = "127.0.0.1";
const port = "3000";

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => {
    res.status(200).send('hello world');
});

app.get('/stations', (req, res) => {
    var shortStations = [];
    stations.forEach(station => {
        shortStations.push({id: station.id, description: station.description});
    });
    res.status(200).json(shortStations);
});

app.post('/stations', (req, res)=> {
    var long = Number(req.query.lon);
    var lati = Number(req.query.lat);
    var descr = req.query.description;
    var obs = Number(req.query.observations);
    var stationId =  5 /*ATH ÞARF AÐ BREYTA VANTAR ID GENERATOR*/ 
    newStation = Object({id: stationId, lon: long, lat: lati, description: descr, observations:obs});
    stations.push(newStation);
    res.status(201).send(newStation);
});
app.get('/stations/:id', (req, res) => {
    for(var i = 0; i < stations.length; i++) {
        if(stations[i].id === (Number)(req.params.id)) {
            res.status(200).json(stations[i]);
            return;
        }
    }
    res.status(404).send("message: station not found");
});

app.get('/stations/:id/observations', (req, res) => {
    var obs = [];
    for(var i = 0; i < stations.length; i++) {
        if(stations[i].id === (Number)(req.params.id)) {
            observations.forEach(observation => {
                stations[i].observations.forEach(obsId =>{
                    if((Number)(observation.id) === (Number)(obsId)) {
                        obs.push(observation);
                    }
                });
            });
            res.status(200).json(obs);
            return;
        }
    }
    res.status(404).send("message: station not found");
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
    Deletes an existing observation for a specified station. The request, if successful, returns all attributes of the deleted observation.
5. Delete all observations for a station
    Deletes all existing observations for a specified station. The request, if successful, returns all deleted
    observations (all attributes).
*/
