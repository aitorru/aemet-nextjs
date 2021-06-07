// http://www.aemet.es/xml/municipios/localidad_48020.xml
const axios = require('axios');
var parser = require('fast-xml-parser');
var he = require('he');

var options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
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

        var tmax = [];
        var tmin = [];

        for (var i in jsonObj['root']['prediccion']['dia']) {
            tmax.push(jsonObj['root']['prediccion']['dia'][i]['temperatura']['maxima']);
            tmin.push(jsonObj['root']['prediccion']['dia'][i]['temperatura']['minima']);
        }



        var d = new Date();
        res.status(200).json({
            labels: ['Dia: ' + (d.getDate()), 'Dia: ' + (d.getDate() + 1), 'Dia: ' + (d.getDate() + 3), 'Dia: ' + (d.getDate() + 4), 'Dia: ' + (d.getDate() + 5), 'Dia: ' + (d.getDate() + 6)],
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
        })
    })
}