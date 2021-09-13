const object = {
    Rutcliente: {
        "value": "77184038-8"
    },
    RazonSocial: {
        "value": "HOUSE FITNESS PRO 19 SPA"
    },
    email: {
        "value": ""
    },
    Folio: {
        "value": "8834"
    },
    Montototal: {
        "value": "324870"
    },
    NCEoNDEsobreFactdeCompra: {}
}

let newObject = Object.assign({}, ...Object.keys(object).map( key => {return ({[key]: object[key].value})}))

console.log(newObject);