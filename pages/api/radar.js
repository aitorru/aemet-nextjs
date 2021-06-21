const axios = require('axios');

export default async function handler(req, res) {
    await axios.get(`https://opendata.aemet.es/opendata/api/red/radar/nacional/?api_key=${process.env.AEMET_API}`).then(function (response) {
        res.status(200).json({
            img: response.data.datos
        })
    })
}