require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Client } = require("espn-fantasy-football-api/node");
const myClient = new Client({ leagueId: 49886824 });

myClient.setCookies({ espnS2: process.env.ESPNS2, SWID: process.env.SWID });

let data;

myClient.getBoxscoreForWeek({ seasonId: 2019, scoringPeriodId: 1, matchupPeriodId: 1 }).then((boxscores) => {
   data = boxscores;
});

app.get("/", function (req, res) {
	res.status(200).send(data);
});


app.listen(3000, () => {
    console.log("Server started and listening on port 3000")
});