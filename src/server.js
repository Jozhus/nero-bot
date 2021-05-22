const bodyParser = require('body-parser')
const cors = require("cors");
const express = require("express");
const VoiceChat = require("./VoiceChat");

const app = express();

app.use(bodyParser.json({ limit: "50mb" })); // Unsure if this limit even works.
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.post("/speak", (req, res) => {
    if (!req.body) {
        res.sendStatus(400);
        return;
    }

    VoiceChat.speak(req.body.text);
    res.sendStatus(200);
});

app.get("*", (req, res) => {
    res.sendStatus(304);
});

app.listen(process.env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening at localhost:${process.env.PORT}`);
});