const Ably = require("ably");
const express = require("express");
const app = express();

require('dotenv').config();

// Ably
const FROM_CLIENT_CHANNEL_NAME = "chat:from-clients";
const TO_CLIENT_CHANNEL_NAME = "chat:to-clients";

const API_KEY = process.env.ABLY_API_KEY;

// Use Ably to listen and send updates to users, as well as save messages to Aurora
const realtime = new Ably.Realtime({ key: API_KEY });

/* Express */
const port = 3000;

/* Server */
app.use(express.static('public'));

// Issue token requests to clients sending a request to the /auth endpoint
app.get("/auth", async (req, res) => {
  let tokenParams = {
    capability: { },
    clientId: uuidv4()
  };
  tokenParams.capability[`${FROM_CLIENT_CHANNEL_NAME}`] = ["publish"];
  tokenParams.capability[`${TO_CLIENT_CHANNEL_NAME}`] = ["subscribe"];

  console.log("Sending signed token request:", JSON.stringify(tokenParams));

  realtime.auth.createTokenRequest(tokenParams, (err, tokenRequest) => {
    if (err) {
      res.status(500).send(`Error requesting token: ${JSON.stringify(err)}`);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tokenRequest));
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

function uuidv4() {
    return "comp-" + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}