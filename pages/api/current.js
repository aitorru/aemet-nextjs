// http://www.aemet.es/xml/municipios/localidad_48020.xml
const axios = require('axios');
var parser = require('fast-xml-parser');
var he = require('he');
const { utcToZonedTime } = require('date-fns-tz')

var options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};

export default async function handler(req, res) {
    await axios.get(`http://www.aemet.es/xml/municipios_h/localidad_h_${req.headers.municipio}.xml`).then(function (response) {
        const jsonObj = parser.parse(response.data, options);

        // Obtain a Date instance that will render the equivalent Berlin time for the UTC date
        const d = new Date();
        const timeZone = 'Europe/Berlin'; // Same as Madrid
        const zonedDate = utcToZonedTime(d, timeZone);

        // Prepare date format
        const year = zonedDate.getFullYear().toString();
        var month = null;
        if ((zonedDate.getMonth() + 1) <= 9) {
            month = `0${zonedDate.getMonth() + 1}`
        } else {
            month = `${zonedDate.getMonth() + 1}`
        }
        var day = null;
        if (zonedDate.getDate() <= 9) {
            day = `0${zonedDate.getDate().toString()}`
        } else {
            day = `${zonedDate.getDate().toString()}`
        }


        var today = null;
        var tomorrow = null;
        for (var i in jsonObj['root']['prediccion']['dia']) {
            if (jsonObj['root']['prediccion']['dia'][i]['attr']['@_fecha'] == `${year}-${month}-${day}`) {
                today = jsonObj['root']['prediccion']['dia'][i];
                tomorrow = jsonObj['root']['prediccion']['dia'][parseInt(i) + 1];
            }
        }
        const date = today['attr']['@_fecha'];

        const estado_cielo = today['estado_cielo'];
        var cielo = estado_cielo[0];
        for (var i in estado_cielo) {
            if (zonedDate.getHours() == estado_cielo[i]['attr']['@_periodo']) {
                cielo = estado_cielo[i];
            }
        }

        const precipitacion_dia = today['precipitacion'];
        var precipitacion = precipitacion_dia[0];
        for (var i in precipitacion_dia) {
            if (zonedDate.getHours() == precipitacion_dia[i]['attr']['@_periodo']) {
                precipitacion = precipitacion_dia[i];
            }
        }

        const prob_precipitacion_dia = today['prob_precipitacion'];
        // Obtener el rango actual
        const rango = zonedDate.getHours().toString() + zonedDate.getMinutes().toString()
        var prob_precipitacion = prob_precipitacion_dia[0];
        for (var i in prob_precipitacion_dia) {
            // AEMET da las pobabilidades en rangos.
            // 0814 / 1420 / 2002
            if (rango >= prob_precipitacion_dia[i]['attr']['@_periodo']) {
                prob_precipitacion = prob_precipitacion_dia[i];
            }
        }

        const prob_tormenta_dia = today['prob_tormenta'];
        var prob_tormenta = prob_tormenta_dia[0];
        for (var i in prob_tormenta_dia) {
            // AEMET da las pobabilidades en rangos.
            // 0814 / 1420 / 2002
            if (rango >= prob_tormenta_dia[i]['attr']['@_periodo']) {
                prob_tormenta = prob_tormenta_dia[i];
            }
        }

        const nieve_dia = today['nieve'];
        var nieve = nieve_dia[0];
        for (var i in nieve_dia) {
            if (zonedDate.getHours() == nieve_dia[i]['attr']['@_periodo']) {
                nieve = nieve_dia[i];
            }
        }

        const prob_nieve_dia = today['prob_nieve'];
        var prob_nieve = prob_nieve_dia[0];
        for (var i in prob_nieve_dia) {
            // AEMET da las pobabilidades en rangos.
            // 0814 / 1420 / 2002
            if (rango >= prob_nieve_dia[i]['attr']['@_periodo']) {
                prob_nieve = prob_nieve_dia[i];
            }
        }

        const temperatura_dia = today['temperatura'];
        var temperatura = temperatura_dia[0];
        for (var i in temperatura_dia) {
            if (zonedDate.getHours() == temperatura_dia[i]['attr']['@_periodo']) {
                temperatura = temperatura_dia[i];
            }
        }

        const sens_termica_dia = today['sens_termica'];
        var sens_termica = sens_termica_dia[0];
        for (var i in sens_termica_dia) {
            if (zonedDate.getHours() == sens_termica_dia[i]['attr']['@_periodo']) {
                sens_termica = sens_termica_dia[i];
            }
        }

        // Obtener los periodos para las graficas. (Se usan tambien para precipitaciones ??\_(???)_/??)
        var temperatura_stat_dia_periodos = [];
        const temperatura_ma??ana = tomorrow['temperatura'];
        var found_periodo = false;
        for (var i in temperatura_dia) {
            if (!found_periodo) {
                if (zonedDate.getHours() == temperatura_dia[i]['attr']['@_periodo']) {
                    temperatura_stat_dia_periodos.push(temperatura_dia[i]['attr']['@_periodo']);

                    found_periodo = true;
                }
            } else {
                temperatura_stat_dia_periodos.push(temperatura_dia[i]['attr']['@_periodo']);

            }
        }
        for (var i in temperatura_ma??ana) {
            temperatura_stat_dia_periodos.push(temperatura_ma??ana[i]['attr']['@_periodo']);
        }

        // Obtener las temperaturas
        var temperatura_stat_dia = [];
        var found_temperatura = false;
        for (var i in temperatura_dia) {
            if (!found_temperatura) {
                if (zonedDate.getHours() == temperatura_dia[i]['attr']['@_periodo']) {
                    temperatura_stat_dia.push(temperatura_dia[i]['#text']);
                    found_temperatura = true;
                }
            } else {
                temperatura_stat_dia.push(temperatura_dia[i]['#text']);
            }
        }
        for (var i in temperatura_ma??ana) {
            temperatura_stat_dia.push(temperatura_ma??ana[i]['#text']);
        }
        const temperatura_stat = {
            labels: temperatura_stat_dia_periodos,
            datasets: [
                {
                    label: 'Temperatura',
                    data: temperatura_stat_dia,
                    fill: false,
                    backgroundColor: 'rgb(255, 0, 55)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4,
                }
            ],
            borderWidth: 1,
        }


        // Obtener las precipitaciones
        var precipitacion_stat_dia = [];
        const precipitacion_ma??ana = tomorrow['precipitacion'];
        var found_precipitacion = false;
        for (var i in precipitacion_dia) {
            if (!found_precipitacion) {
                if (zonedDate.getHours() == precipitacion_dia[i]['attr']['@_periodo']) {
                    precipitacion_stat_dia.push(precipitacion_dia[i]['#text']);
                    found_precipitacion = true;
                }
            } else {
                precipitacion_stat_dia.push(precipitacion_dia[i]['#text']);
            }
        }
        for (var i in precipitacion_ma??ana) {
            precipitacion_stat_dia.push(precipitacion_ma??ana[i]['#text']);
        }
        const precipitacion_stat = {
            labels: temperatura_stat_dia_periodos,
            datasets: [
                {
                    label: 'Precipitaci??n',
                    data: precipitacion_stat_dia,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    z: 0,
                }
            ],
            borderWidth: 1,
        }

        res.status(200).json(
            {
                date: date,
                cielo: cielo,
                precipitacion: precipitacion,
                prob_precipitacion: prob_precipitacion,
                prob_tormenta: prob_tormenta,
                nieve: nieve,
                prob_nieve: prob_nieve,
                temperatura: temperatura,
                sens_termica: sens_termica,
                temperatura_stat: temperatura_stat,
                precipitacion_stat: precipitacion_stat,
            }
        )
    })
}