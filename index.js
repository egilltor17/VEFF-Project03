// Project 03/index.js

const http = require("http");
const express = require("express");
const app = express();
const url = require("body-parser");
const hostname = "127.0.0.1";
const port = "3000";

http.createServer(app).listen(port, () => console.log(`Weather app listening on port ${port}!`));

// app.listen(port, () => console.log(`Weather app listening on port ${port}!`));

/* ============================================================================================ */
/* Sample data                                                                                  */
/* ============================================================================================ */

//The following is an example of an array of two stations. 
//The observation array includes the ids of the observations belonging to the specified station
var stations = [
    {id: 1, description: "Reykjavik", lat: 64.1275, lon: 21.9028, observations: [2]},
    {id: 422, description: "Akureyri", lat: 65.6856, lon: 18.1002, observations: [1]}
];

//The following is an example of an array of two observations.
//Note that an observation does not know which station it belongs to!
var observations = [
    {id: 1, date: 1551885104266, temp: -2.7, windSpeed: 2.0, windDir: "ese", prec: 0.0, hum: 82.0},
    {id: 2, date: 1551885137409, temp: 0.6, windSpeed: 5.0, windDir: "n", prec: 0.0, hum: 50.0},
];

/* ============================================================================================ */
/* GET requests                                                                                 */
/* ============================================================================================ */

app.get('/api/v1', (req, res) => {
    res.status(200).send('welcome to our api.');
});

app.get('/api/v1/stations', (req, res) => {
    var shortStations = [];
    stations.forEach(station => {
        shortStations.push({id: station.id, description: station.description});
    });
    res.status(200).json(shortStations);
});

app.get('/api/v1/stations/:sId', (req, res) => {
    for(var i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            res.status(200).json(stations[i]);
            return;
        }
    }
    res.status(404).send("message: station not found.");
});

app.get('/api/v1/stations/:sId/observations', (req, res) => {
    for(var i = 0; i < stations.length; i++) {
        if(stations[i].id === (Number)(req.params.sId)) {
            var obs = [];
            for(var j = 0; j < observations.length; j++) {
                if((Number)(observations[j].id) === (Number)(stations[i].observations)) {
                    obs.push({date: observations[j].date, temp: observations[j].temp, windSpeed: observations[j].windSpeed, windDir: observations[j].windDir, prec: observations[j].prec, hum: observations[j].hum});
                }
            }
            res.status(200).json(obs);
            return;
        }
    }
    res.status(404).send("message: station not found.");
});

app.get('/api/v1/stations/:sId/observations/:oId', (req, res) => {
    for(var i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            for(var j = 0; j < observations.length; j++) {
                if(Number(observations[j].id) === Number(req.params.oId)) {
                    res.status(200).json({date: observations[j].date, temp: observations[j].temp, windSpeed: observations[j].windSpeed, windDir: observations[j].windDir, prec: observations[j].prec, hum: observations[j].hum});
                    return;
                }
            }
            res.status(404).send("message: observation not found.");
        }
    }
    res.status(404).send("message: station not found.");
});

/* ============================================================================================ */
/* POST requests                                                                                */
/* ============================================================================================ */

app.post('/api/v1/stations', (req, res)=> {
    var long = Number(req.query.lon);
    var lati = Number(req.query.lat);
    var descr = req.query.description;
    var obs = Number(req.query.observations);
    var stationId =  5 /*ATH ÞARF AÐ BREYTA VANTAR ID GENERATOR*/ 
    newStation = Object({id: stationId, lon: long, lat: lati, description: descr, observations:obs});
    stations.push(newStation);
    res.status(201).send(newStation);
});

/* ============================================================================================ */
/* UPDATE requests                                                                              */
/* ============================================================================================ */


/* ============================================================================================ */
/* DELETE requests                                                                              */
/* ============================================================================================ */

app.delete('/api/v1', (req, res) => {
    console.log("doomsday is upon us!");
    res.status(405).send("measage: meathod not allowed.");
});

app.delete('/api/v1/stations', (req, res) => {
    stations = {};
    observations = {};
    res.status(202).send("measage: It's all gone! Everything! Just gone...");
});

app.delete('/api/v1/stations/:sId', (req, res) => {
    for(var i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            for(var j = 0; j < observations.length; j++) {
                stations[i].observations.forEach(oId =>{
                    if(Number(observations[j].id) === Number(oId)) {
                        observations.splice(j, 1);
                    }
                });
            }
            stations.splice(i, 1);
            res.status(202).send("measage: station " + req.params.sId + " has been deleated along with all of it's observations.");
            return;
        }
    }
    res.status(404).send("measage: station not found");
});

app.delete('/api/v1/stations/:sId/observations/', (req, res) => {
    for(var i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            for(var j = 0; j < observations.length; j++) {
                if(Number(observations[j].id) === Number(req.params.oId)) {
                    observations.splice(j, 1);
                }
            }
            stations[i].observations = [];
            res.status(202).send("message: all observations for station " + req.params.sId + " has been deleated.");
            return;
        }
    }
    res.status(404).send("message: station not found.");
});

app.delete('/api/v1/stations/:sId/observations/:oId', (req, res) => {
    var foundSomething = false;
    for(var i = 0; i < stations.length; i++) {
        if(stations[i].id === Number(req.params.sId)) {
            for(var j = 0; j < observations.length; j++) {
                if(Number(observations[j].id) === Number(req.params.oId)) {
                    foundSomething = true;
                    observations.splice(j, 1);
                    for(var k = 0; k < stations[i].observations.length; k++) {
                        if(Number(stations[i].observations[k]) === Number(req.params.oId)) {
                            stations[i].observations.splice(k, 1);
                        }
                    }
                }
            }
            if(foundSomething) {
                res.status(202).send("message: observation " + req.params.oId + " has been deleated.");
            } else {
                res.status(404).send("message: observation not found.");
            }
            return;
        }
    }
    res.status(404).send("message: station not found.");
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
