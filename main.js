const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const portti = 3012;

const wc = require("./models/wc");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { "extended" : true } ));




app.post("/lisaaTuote", (req, res) => {

    wc.lisaaTuote(req).then((data) => {

        res.redirect("/");

    });    

});




app.get("/lisaaTuote", (req, res) => {

    res.render("lisaaTuote", {});

});




app.get("/", (req, res) => {
    
    wc.haeTilaukset()
        .then((data) => {

            res.render("index", { "tilaukset" : data });
        })
        .catch((err) => {
            res.json(err);
        });
});




app.listen(portti, () => {

    console.log(`palvelin käynnistyi porttiin: ${portti}`);

});