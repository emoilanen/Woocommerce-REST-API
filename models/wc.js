const restify = require("restify-clients");

let apiUrl = "nettisivujen url";
let client;



client = restify.createJsonClient({
    "url": apiUrl,
    "headers": {
        "accept": "application/json",
        "contentType": "application/json"
    }
});

client.basicAuth('Asiakkaan avain', 'Asiakkaan salasana');





module.exports = {

    "haeTilaukset": () => {

        return new Promise((resolve, reject) => {

            client.get("/wp-json/wc/v3/orders", (err, req, res, data) => {

                if (!err) {
                    resolve(data);

                } else {
                    reject(err);
                }
            });
        });
    },

    "lisaaTuote": (req) => {

        return new Promise((resolve, reject) => {

            let polku = `/wp-json/wc/v3/products`;

            let nimi = req.body.nimi;
            let hinta = req.body.hinta;
            let tuotekuvaus = req.body.tuotekuvaus;

            let uusiTuote = {

                "name": nimi,
                "regular_price": hinta,
                "description": tuotekuvaus
            }


            client.post(polku, uusiTuote, (err, req, res, data) => {

                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }

            });
        });
    }
};