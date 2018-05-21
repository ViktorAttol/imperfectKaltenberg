const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

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

app.listen(port, () => console.log(`API listening on port ${port}`));
