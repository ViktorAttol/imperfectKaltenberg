const express = require('express');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3001;
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/api/portal/wigwam', (req, res) => {
    request.get(
        { url: 'http://operation-wigwam.ingress.com:8080/v1/test-info' },
        function(error, response, body) {
            if (error || response.statusCode !== 200) {
                res.status(500).json({error: error.toString()});
                return;
            }
            data = JSON.parse(body);
            if (!data.result || !data.code || data.code !== 'OK') {
                res.status(500).json({
                    error: 'invalid body from upstream',
                    errorDetails: body.toString()
                });
                return;
            }
            res.json(data);
        }
    );
});

app.get('/api/portal/static', (req, res) => {
    res.json({
        result: {
            "controllingFaction":"Resistance",
            "level":7,
            "health":99,
            "owner":"Fantasio",
            "title":"Crab Mosaic",
            "description":null,
            "coverImageUrl":"http://lh3.ggpht.com/rF4RNr3xmVnLep_3WmJPCcnzBtKl3z74vc2mlaHpF0K9bVieZb_61w0fygAGUCduYzB47sRXbcajUk8-5bxmVg",
            "attribution":"PennIsMightier",
            "mods":[{"type":"Portal Shield","rarity":"Common","owner":"Tropus","slot":1},{"type":"Portal Shield","rarity":"Common","owner":"Zorig","slot":2},{"type":"Multi-hack","rarity":"Rare","owner":"vitus365","slot":3},{"type":"Portal Shield","rarity":"Common","owner":"fRueD","slot":4}],
            "resonators":[{"level":6,"health":98,"owner":"akatose","position":"E"},{"level":8,"health":99,"owner":"DrayPrescot","position":"NE"},{"level":8,"health":99,"owner":"ViktorUrsus","position":"N"},{"level":7,"health":99,"owner":"akatose","position":"NW"},{"level":8,"health":99,"owner":"akatose","position":"W"},{"level":7,"health":99,"owner":"akatose","position":"SW"},{"level":8,"health":99,"owner":"cksown","position":"S"},{"level":8,"health":99,"owner":"genmaicha","position":"SE"}]
        }
    });
});

const resoPositionMapping = {
    'N': 0,
    'NE': 1,
    'E': 2,
    'SE': 3,
    'S': 4,
    'SW': 5,
    'W': 6,
    'NW': 7
}

var dynamicPortalState = {};
var dynamicUpdateActive = true;
var lastArduinoPortalState = '';
var lastArduinoUpdate = -1;

function updateDynamicPortalState() {
    // console.log('updateDynamicPortalState()...')
    if (!dynamicUpdateActive) {
        // console.log('updateDynamicPortalState() skipped');
        return;
    }
    request.get(
        { url: 'http://operation-wigwam.ingress.com:8080/v1/test-info' },
        function(error, response, body) {
            if (error || response.statusCode !== 200) {
                console.log({error: error.toString()});
            } else {
                data = JSON.parse(body);
                if (!data.result || !data.code || data.code !== 'OK') {
                    console.log({
                        error: 'invalid body from upstream',
                        errorDetails: body.toString()
                    });
                } else {
                    dynamicPortalState = data.result;
                    // console.log('updateDynamicPortalState() finished')

                    var health = 0.0;
                    var resoLevels = [0, 0, 0, 0, 0, 0, 0, 0];
                    if (dynamicPortalState.resonators) {
                        health = Math.min(100, Math.round(
                            dynamicPortalState.resonators.reduce((acc, resonator) => {
                                resoLevels[resoPositionMapping[resonator.position]] = Math.min(8, resonator.level);
                                var position = resonator.position;
                                acc += resonator.health;
                                return acc;
                            }, 0.0) / dynamicPortalState.resonators.length
                        ));
                    }
                    var arduinoPortalState = ''
                        + '/' + dynamicPortalState.controllingFaction[0].toLowerCase()
                        + '/' + health
                        + '/' + resoLevels.join('/')
                        + '/' + 0;
                    var now = new Date().getTime();
                    if ((now - lastArduinoUpdate) >= 60000 || (arduinoPortalState !== lastArduinoPortalState && (now - lastArduinoUpdate) >= 10000)) {
                        console.log('TODO: send ' + arduinoPortalState);
                        lastArduinoPortalState = arduinoPortalState;
                        lastArduinoUpdate = now;
                    }
                }
            }
        }
    );
}

const timer = setInterval(updateDynamicPortalState, 500);

app.get('/api/portal/dynamic', (req, res) => {
    res.json({
        result: dynamicPortalState
    });
});

app.put('/api/portal/dynamic', jsonParser, (req, res) => {
    if (!req.body || !req.body.hasOwnProperty('portal')) {
        res.status(400).json({error: 'invalid body from client'});
        return;
    }
    dynamicPortalState = req.body.portal;
    console.log({dynamicPortalState: dynamicPortalState});
    res.json({
        result: dynamicPortalState
    });
});

app.get('/api/portal/dynamic/dynamicUpdateActive', (req, res) => {
    res.json({
        result: {
            dynamicUpdateActive: dynamicUpdateActive
        }
    });
});

app.put('/api/portal/dynamic/dynamicUpdateActive', jsonParser, (req, res) => {
    if (!req.body || !req.body.hasOwnProperty('dynamicUpdateActive')) {
        res.status(400).json({error: 'invalid body from client'});
        return;
    }
    dynamicUpdateActive = req.body.dynamicUpdateActive === true;
    console.log({dynamicUpdateActive: dynamicUpdateActive});
    res.json({
        result: {
            dynamicUpdateActive: dynamicUpdateActive
        }
    });
});

app.listen(port, () => console.log(`API listening on port ${port}`));
