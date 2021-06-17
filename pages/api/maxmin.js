// http://www.aemet.es/xml/municipios/localidad_48020.xml
const axios = require('axios');
var parser = require('fast-xml-parser');
var he = require('he');
const _ = require('lodash');
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
    await axios.get(`http://www.aemet.es/xml/municipios/localidad_${req.headers.municipio}.xml`).then(function (response) {
        const jsonObj = parser.parse(response.data, options);

        // Obtain a Date instance that will render the equivalent Berlin time for the UTC date
        const d = new Date();
        const timeZone = 'Europe/Berlin'; // Same as Madrid
        const zonedDate = utcToZonedTime(d, timeZone);

        const days = jsonObj['root']['prediccion']['dia'];

        var tmax = [];
        var tmin = [];

        for (var i in days) {
            tmax.push(days[i]['temperatura']['maxima']);
            tmin.push(days[i]['temperatura']['minima']);
        }

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

        var tormenta_labels = [];
        var tormenta_stats = [];
        var found_today = false;
        var index_first_loop = 0;
        var index_second_loop = 0;
        _.forEach(days, (dia) => {
            if (dia['attr']['@_fecha'] == `${year}-${month}-${day}`) {
                found_today = true;
            }
            if (found_today && typeof (dia['prob_precipitacion']) !== "number") {
                console.log(dia['prob_precipitacion'])
                if (dia['prob_precipitacion'].lenght === 7) {
                    if (dia['attr']['@_fecha'] == `${year}-${month}-${day}`) {
                        const horas = dia['prob_precipitacion'].slice(3);
                        // Obtener el rango del periodo


                    }
                }

                _.forEach(dia['prob_precipitacion'], (precipitaciones) => {
                    if (index_first_loop == 0) {

                    }
                    index_second_loop++;
                })
            }
            index_first_loop++;
        })


        const maxmin = {
            labels: ['Dia: ' + (zonedDate.getDate()), 'Dia: ' + (zonedDate.getDate() + 1), 'Dia: ' + (zonedDate.getDate() + 3), 'Dia: ' + (zonedDate.getDate() + 4), 'Dia: ' + (zonedDate.getDate() + 5), 'Dia: ' + (zonedDate.getDate() + 6)],
            datasets: [
                {
                    label: 'Temperatura maxima',
                    data: tmax,
                    fill: false,
                    backgroundColor: 'rgb(255, 0, 55)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Temperatura minima',
                    data: tmin,
                    fill: false,
                    backgroundColor: 'rgb(57, 54, 248)',
                    borderColor: 'rgba(131, 129, 209, 0.2)',
                }
            ],
        }
        res.status(200).json({
            maxmin: maxmin,
        })
    })
}