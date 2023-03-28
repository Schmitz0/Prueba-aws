const { InsumoReceta } = require("../../db.js");
const { Receta } = require("../../db.js");
const { Insumo } = require("../../db.js");


const updateInsumo = async (id) => {
    
        let insumo = await Insumo.findByPk(id)
        return insumo;
    
}


const json = [
    null,
    {
        "Column1": "AGUA ESENCIAL S\/G 2000", 
    },
    {
        "Column2": "ETIQUETA AGUA 2000",
        "Cant": 1,
        "Costo": 0.0055,
        "CostoPorBot": 0.0055
    },
    {
        "Column2": "TAPA VERDE",
        "Cant": 1,
        "Costo": 0.01282,
        "CostoPorBot": 0.01282
    },
    {
        "Column2": "PREFORMA 41 GR",
        "Cant": 1,
        "Costo": 0.08482790390832072,
        "CostoPorBot": 0.08482790390832072
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0013541666666666667,
        "Costo": 2.1,
        "CostoPorBot": 0.0028437500000000004
    },
    {
        "Column2": "TERMO IMPRESO",
        "Cant": 0.004333333333333333,
        "Costo": 2.75,
        "CostoPorBot": 0.011916666666666666
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 6.825E-05,
        "Costo": 8.74,
        "CostoPorBot": 0.0005965050000000001
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.008333333333333333,
        "Costo": 0.54,
        "CostoPorBot": 0.0045000000000000005
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "CostoPorBot": 0.1230048255749874,
        "Costo": "",
    },
    null,
    {
        "Column1": "AGUA ESENCIAL C\/G 2000"
    },
    {
        "Column2": "ETIQUETA AGUA 2000",
        "Cant": 1,
        "Costo": 0.0055,
        "CostoPorBot": 0.0055
    },
    {
        "Column2": "TAPA AZUL",
        "Cant": 1,
        "Costo": 0.01282,
        "CostoPorBot": 0.01282
    },
    {
        "Column2": "PREFORMA 42,7 GR",
        "Cant": 1,
        "Costo": 0.08761621743796016,
        "CostoPorBot": 0.08761621743796016
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0013541666666666667,
        "Costo": 2.1,
        "CostoPorBot": 0.0028437500000000004
    },
    {
        "Column2": "TERMO IMPRESO",
        "Cant": 0.004333333333333333,
        "Costo": 2.75,
        "CostoPorBot": 0.011916666666666666
    },
    {
        "Column2": "GAS CARBONICO",
        "Cant": 0.0225388,
        "Costo": 0.7992665036674816,
        "CostoPorBot": 0.018014507872860637
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 0.00012285,
        "Costo": 8.74,
        "CostoPorBot": 0.0010737090000000002
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.008333333333333333,
        "Costo": 0.54,
        "CostoPorBot": 0.0045000000000000005
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.14428485097748747
    },
    {
        "Column2": "COSTO TOTAL POR BULTO",
        "Costo": "",
        "CostoPorBot": 0.5771394039099499
    },
    null,
    {
        "Column1": "AGUA ESENCIAL S\/G 600"
    },
    {
        "Column2": "ETIQUETA AGUA 600",
        "Cant": 1,
        "Costo": 0.006549999999999999,
        "CostoPorBot": 0.006549999999999999,
        "Column6": 0.004309416074121957
    },
    {
        "Column2": "TAPA VERDE",
        "Cant": 1,
        "Costo": 0.01282,
        "CostoPorBot": 0.01282
    },
    {
        "Column2": "PREFORMA 19,5 GR",
        "Cant": 1,
        "Costo": 0.04381031160198328,
        "CostoPorBot": 0.04381031160198328
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0003968253968253968,
        "Costo": 2.1,
        "CostoPorBot": 0.0008333333333333334
    },
    {
        "Column2": "TERMO TRANSPARENTE",
        "Cant": 0.0025833333333333333,
        "Costo": 2.15,
        "CostoPorBot": 0.0055541666666666665
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 6.825E-05,
        "Costo": 8.74,
        "CostoPorBot": 0.0005965050000000001
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.003968253968253968,
        "Costo": 0.54,
        "CostoPorBot": 0.002142857142857143
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.07230717374484043
    },
    null,
    {
        "Column1": "AGUA ESENCIAL C\/G 600"
    },
    {
        "Column2": "PREFORMA 19,5 GR",
        "Cant": 1,
        "Costo": 0.04381031160198328,
        "CostoPorBot": 0.04381031160198328
    },
    {
        "Column2": "TAPA AZUL",
        "Cant": 1,
        "Costo": 0.01282,
        "CostoPorBot": 0.01282
    },
    {
        "Column2": "ETIQUETA AGUA 600",
        "Cant": 1,
        "Costo": 0.006549999999999999,
        "CostoPorBot": 0.006549999999999999
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0003968253968253968,
        "Costo": 2.1,
        "CostoPorBot": 0.0008333333333333334
    },
    {
        "Column2": "TERMO TRANSPARENTE",
        "Cant": 0.0025833333333333333,
        "Costo": 2.15,
        "CostoPorBot": 0.0055541666666666665
    },
    {
        "Column2": "GAS CARBONICO",
        "Cant": 0.007,
        "Costo": 0.7992665036674816,
        "CostoPorBot": 0.005594865525672372
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 6.825E-05,
        "Costo": 8.74,
        "CostoPorBot": 0.0005965050000000001
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.003968253968253968,
        "Costo": 0.54,
        "CostoPorBot": 0.002142857142857143
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.07790203927051279
    },
    {
        "Column2": "COSTO TOTAL POR BULTO",
        "Costo": "",
        "CostoPorBot": 0.4674122356230767
    },
    null,
    {
        "Column1": "SODA SIFON 2000"
    },
    {
        "Column2": "PREFORMA 52,7 GR",
        "Cant": 1,
        "Costo": 0.10505123004685392,
        "CostoPorBot": 0.10505123004685392
    },
    {
        "Column2": "CABEZAL SIFON ",
        "Cant": 1,
        "Costo": 0.175,
        "CostoPorBot": 0.175
    },
    {
        "Column2": "ETIQUETA SIFÓN 2000",
        "Cant": 1,
        "Costo": 0.0079,
        "CostoPorBot": 0.0079
    },
    {
        "Column2": "TERMO IMPRESO",
        "Cant": 0.005833333333333334,
        "Costo": 2.75,
        "CostoPorBot": 0.016041666666666666
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 6.825E-05,
        "Costo": 8.74,
        "CostoPorBot": 0.0005965050000000001
    },
    {
        "Column2": "GAS CARBONICO",
        "Cant": 0.02663592,
        "Costo": 0.7992665036674816,
        "CostoPorBot": 0.02128919865036675
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0014583333333333332,
        "Costo": 2.1,
        "CostoPorBot": 0.0030624999999999997
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.008333333333333333,
        "Costo": 0.54,
        "CostoPorBot": 0.0045000000000000005
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.3334411003638874
    },
    null,
    {
        "Column1": "BIDIÓN 6000"
    },
    {
        "Column2": "ENVASE BIDÓN SOPLADO",
        "Cant": 1,
        "Costo": 0.4470218690573214,
        "CostoPorBot": 0.4470218690573214
    },
    {
        "Column2": "TAPA BIÓN ",
        "Cant": 1,
        "Costo": 0.02640586797066015,
        "CostoPorBot": 0.02640586797066015
    },
    {
        "Column2": "ASA BIDÓN",
        "Cant": 1,
        "Costo": 0.03872860635696822,
        "CostoPorBot": 0.03872860635696822
    },
    {
        "Column2": "ETIQUETA BIDÓN 6000",
        "Cant": 1.07,
        "Costo": 0.0308,
        "CostoPorBot": 0.032956000000000006
    },
    {
        "Column2": "STRECH BLANCO",
        "Cant": 0.0034946236559139786,
        "Costo": 2.45,
        "CostoPorBot": 0.008561827956989248
    },
    {
        "Column2": "CARTÓN GRUESO",
        "Cant": 0.03763440860215054,
        "Costo": 0.92,
        "CostoPorBot": 0.0346236559139785
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.5882978272559175
    },
    {
        "Column2": "COSTO TOTAL POR BULTO",
        "Costo": "",
        "CostoPorBot": 0.5882978272559175
    },
    null,
    {
        "Column1": "NET NARANJA 2250"
    },
    {
        "Column2": "AZUCAR INVERTIDO",
        "Cant": 0.162333,
        "Costo": 0.711,
        "CostoPorBot": 0.25969221675
    },
    {
        "Column2": "ACIDO CITRICO ANHIDRO",
        "Cant": 0.0018833333333333334,
        "Costo": 4.2,
        "CostoPorBot": 0.0177975
    },
    {
        "Column2": "Citrato de sodio",
        "Cant": 0.00019999999999999998,
        "Costo": 4.6,
        "CostoPorBot": 0.00207
    },
    {
        "Column2": "Benzoato de sodio",
        "Cant": 0.00025,
        "Costo": 4.4,
        "CostoPorBot": 0.002475
    },
    {
        "Column2": "EDTA",
        "Cant": 2E-05,
        "Costo": 19.6,
        "CostoPorBot": 0.0008820000000000001
    },
    {
        "Column2": "Sabor Naranja Givaudan",
        "Cant": 0.0015,
        "Costo": 29.3,
        "CostoPorBot": 0.0988875
    },
    {
        "Column2": "Etiqueta Net 2250",
        "Cant": 1,
        "Costo": 0.009800000000000001,
        "CostoPorBot": 0.009800000000000001
    },
    {
        "Column2": "TAPA NARANJA",
        "Cant": 1,
        "Costo": 0.01282,
        "CostoPorBot": 0.01282
    },
    {
        "Column2": "PREFORMA 47 GR",
        "Cant": 1,
        "Costo": 0.09492901976999946,
        "CostoPorBot": 0.09492901976999946
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0014583333333333332,
        "Costo": 2.1,
        "CostoPorBot": 0.0030624999999999997
    },
    {
        "Column2": "TERMO TRANSPARENTE",
        "Cant": 0.005833333333333334,
        "Costo": 2.15,
        "CostoPorBot": 0.012541666666666666
    },
    {
        "Column2": "GAS CARBONICO",
        "Cant": 0.0233044,
        "Costo": 0.7992665036674816,
        "CostoPorBot": 0.018626426308068458
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 0.00012285,
        "Costo": 8.74,
        "CostoPorBot": 0.0010737090000000002
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.008333333333333333,
        "Costo": 0.54,
        "CostoPorBot": 0.0045000000000000005
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.5391575384947346
    },
    {
        "Column2": "COSTO TOTAL POR BULTO",
        "Costo": "",
        "CostoPorBot": 3.2349452309684077
    },
    null,
    {
        "Column1": "NET POMELO 2250"
    },
    {
        "Column2": "AZUCAR INVERTIDO",
        "Cant": 0.151867,
        "Costo": 0.711,
        "CostoPorBot": 0.24294923324999998
    },
    {
        "Column2": "ACIDO CITRICO ANHIDRO",
        "Cant": 0.002271666666666667,
        "Costo": 4.2,
        "CostoPorBot": 0.021467250000000007
    },
    {
        "Column2": "Acido Ascorbico",
        "Cant": 6.666666666666667E-05,
        "Costo": 9.2,
        "CostoPorBot": 0.0013800000000000002
    },
    {
        "Column2": "Citrato de sodio",
        "Cant": 0.00015,
        "Costo": 4.6,
        "CostoPorBot": 0.0015524999999999996
    },
    {
        "Column2": "Benzoato de sodio",
        "Cant": 0.00019999999999999998,
        "Costo": 4.4,
        "CostoPorBot": 0.00198
    },
    {
        "Column2": "Sorbato de Potasio",
        "Cant": 0.00019999999999999998,
        "Costo": 4.4,
        "CostoPorBot": 0.00198
    },
    {
        "Column2": "Colorante Tartrazina (Sol.al 1 % en agua)",
        "Cant": 4.9999999999999996E-05,
        "Costo": 20,
        "CostoPorBot": 0.0022500000000000003
    },
    {
        "Column2": "Colorante Caramelo F 75",
        "Cant": 8.999999999999999E-06,
        "Costo": 2,
        "CostoPorBot": 4.0499999999999995E-05
    },
    {
        "Column2": "EDTA",
        "Cant": 2E-05,
        "Costo": 19.6,
        "CostoPorBot": 0.0008820000000000001
    },
    {
        "Column2": "Sabor Pomelo Givaudan",
        "Cant": 0.0014000000000000002,
        "Costo": 29,
        "CostoPorBot": 0.09135000000000001
    },
    {
        "Column2": "Etiqueta Net 2250",
        "Cant": 1,
        "Costo": 0.009800000000000001,
        "CostoPorBot": 0.009800000000000001
    },
    {
        "Column2": "TAPA AMARILLA",
        "Cant": 1,
        "Costo": 0.01282,
        "CostoPorBot": 0.01282
    },
    {
        "Column2": "PREFORMA 47 GR",
        "Cant": 1,
        "Costo": 0.09492901976999946,
        "CostoPorBot": 0.09492901976999946
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0014583333333333332,
        "Costo": 2.1,
        "CostoPorBot": 0.0030624999999999997
    },
    {
        "Column2": "TERMO TRANSPARENTE",
        "Cant": 0.005833333333333334,
        "Costo": 2.15,
        "CostoPorBot": 0.012541666666666666
    },
    {
        "Column2": "GAS CARBONICO",
        "Cant": 0.0233044,
        "Costo": 0.7992665036674816,
        "CostoPorBot": 0.018626426308068458
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 0.0012285,
        "Costo": 8.74,
        "CostoPorBot": 0.01073709
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.008333333333333333,
        "Costo": 0.54,
        "CostoPorBot": 0.0045000000000000005
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.5328481859947345
    },
    {
        "Column2": "COSTO TOTAL POR BULTO",
        "Costo": "",
        "CostoPorBot": 3.197089115968407
    },
    null,
    {
        "Column1": "NET COLA 2250"
    },
    {
        "Column2": "AZUCAR INVERTIDO",
        "Cant": 0.139617,
        "Costo": 0.711,
        "CostoPorBot": 0.22335229574999999
    },
    {
        "Column2": "Acido Fosfórico",
        "Cant": 0.00075,
        "Costo": 3.76,
        "CostoPorBot": 0.006345
    },
    {
        "Column2": "Colorante Caramelo (INS 150d)",
        "Cant": 0.0017,
        "Costo": 2,
        "CostoPorBot": 0.00765
    },
    {
        "Column2": "Bitter Givaudan",
        "Cant": 3.3333333333333335E-05,
        "Costo": 49.5,
        "CostoPorBot": 0.0037125
    },
    {
        "Column2": "Benzoato de sodio",
        "Cant": 0.00015,
        "Costo": 4.4,
        "CostoPorBot": 0.001485
    },
    {
        "Column2": "Sabor Cola Givaudan",
        "Cant": 0.00065,
        "Costo": 23,
        "CostoPorBot": 0.0336375
    },
    {
        "Column2": "Etiqueta Net 2250",
        "Cant": 1,
        "Costo": 0.009800000000000001,
        "CostoPorBot": 0.009800000000000001
    },
    {
        "Column2": "TAPA ROJA",
        "Cant": 1,
        "Costo": 0.01282,
        "CostoPorBot": 0.01282
    },
    {
        "Column2": "PREFORMA 47 GR",
        "Cant": 1,
        "Costo": 0.09492901976999946,
        "CostoPorBot": 0.09492901976999946
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0014583333333333332,
        "Costo": 2.1,
        "CostoPorBot": 0.0030624999999999997
    },
    {
        "Column2": "TERMO TRANSPARENTE",
        "Cant": 0.005833333333333334,
        "Costo": 2.15,
        "CostoPorBot": 0.012541666666666666
    },
    {
        "Column2": "GAS CARBONICO",
        "Cant": 0.02796876,
        "Costo": 0.7992665036674816,
        "CostoPorBot": 0.022354493017114913
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 0.00012285,
        "Costo": 8.74,
        "CostoPorBot": 0.0010737090000000002
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.008333333333333333,
        "Costo": 0.54,
        "CostoPorBot": 0.0045000000000000005
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.437263684203781
    },
    {
        "Column2": "COSTO TOTAL POR BULTO",
        "Costo": "",
        "CostoPorBot": 2.623582105222686
    },
    null,
    {
        "Column1": "NET LIMA LIMÓN x 2250cc"
    },
    {
        "Column2": "AZUCAR INVERTIDO",
        "Cant": 0.109,
        "Costo": 0.711,
        "CostoPorBot": 0.17437275
    },
    {
        "Column2": "ACIDO CITRICO ANHIDRO",
        "Cant": 0.0018,
        "Costo": 4.2,
        "CostoPorBot": 0.01701
    },
    {
        "Column2": "Acido Ascorbico",
        "Cant": 0.0001,
        "Costo": 9.2,
        "CostoPorBot": 0.00207
    },
    {
        "Column2": "Citrato de sodio",
        "Cant": 0.0002,
        "Costo": 4.6,
        "CostoPorBot": 0.00207
    },
    {
        "Column2": "Benzoato de sodio",
        "Cant": 0.0003,
        "Costo": 4.4,
        "CostoPorBot": 0.00297
    },
    {
        "Column2": "Sabor Limón",
        "Cant": 0.00038,
        "Costo": 44.1,
        "CostoPorBot": 0.0377055
    },
    {
        "Column2": "EDTA",
        "Cant": 2.9999999999999997E-05,
        "Costo": 19.6,
        "CostoPorBot": 0.001323
    },
    {
        "Column2": "Sabor Lima Limón",
        "Cant": 0.00055,
        "Costo": 17,
        "CostoPorBot": 0.0210375
    },
    {
        "Column2": "Etiqueta Net 2250",
        "Cant": 1,
        "Costo": 0.009800000000000001,
        "CostoPorBot": 0.009800000000000001
    },
    {
        "Column2": "TAPA VERDE",
        "Cant": 1,
        "Costo": 0.01282,
        "CostoPorBot": 0.01282
    },
    {
        "Column2": "PREFORMA 47 GR",
        "Cant": 1,
        "Costo": 0.09492901976999946,
        "CostoPorBot": 0.09492901976999946
    },
    {
        "Column2": "STRECH TRANSPARENTE",
        "Cant": 0.0014583333333333332,
        "Costo": 2.1,
        "CostoPorBot": 0.0030624999999999997
    },
    {
        "Column2": "TERMO TRANSPARENTE",
        "Cant": 0.005833333333333334,
        "Costo": 2.15,
        "CostoPorBot": 0.012541666666666666
    },
    {
        "Column2": "GAS CARBONICO",
        "Cant": 0.0233044,
        "Costo": 0.7992665036674816,
        "CostoPorBot": 0.018626426308068458
    },
    {
        "Column2": "ADHESIVO",
        "Cant": 0.0012285,
        "Costo": 8.74,
        "CostoPorBot": 0.01073709
    },
    {
        "Column2": "CARTÓN FINO",
        "Cant": 0.008333333333333333,
        "Costo": 0.54,
        "CostoPorBot": 0.0045000000000000005
    },
    {
        "Column2": "COSTO TOTAL POR BOTELLA",
        "Costo": "",
        "CostoPorBot": 0.4255754527447345
    },
    {
        "Column2": "COSTO TOTAL POR BULTO",
        "Costo": "",
        "CostoPorBot": 2.5534527164684073
    }
]

const setRecetas = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        for (let n in obj) {
            if (n === 'Column1') {
                let name = obj[n];
                await Receta.create({ name });
            } 
        }
    }
}

const setInsumoReceta = async (arr) => {
    let recetaId = 0
    // let insumoId = 0
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        if (obj===null) recetaId += 1
        console.log('recetaId:', recetaId);
        for (let n in obj) {
            if (n === 'Column2') {
                let nombre = obj[n];
                console.log(`Insumo: ${nombre}`);

                const insumo = await Insumo.findOne({where:{
                    nombre: nombre
                }})
                if (insumo) {
                    await insumo.setReceta(recetaId);
                } else {
                    console.log(`No se encontró ningún insumo con el nombre "${nombre}"`);
                }
            } else if (n === 'Cant'){
                let cantidad = obj[n];
                if(cantidad) console.log(`Cantidad====> ${cantidad}`);
                const insumoReceta = await InsumoReceta.findByPk(1) //HARCODEADO
                // if(insumoReceta){ await insumoReceta.setInsumoReceta(cantidad)} else {console.log('kesesto')}

            // } else if (n === 'Costo'){
            //     let costo = obj[n];
            //     // console.log(costo);
            // } else if (n === 'CostoPorBot'){
            //     let costoPorBotella = obj[n];
            //     // console.log(costoPorBotella);
            } else continue
        }
    }
}


// if (n === 'Column2'){
//     let ins = obj[n]
//     console.log(ins);

// for (let name in obj) {
//     console.log(Object.values(name));
// if(name===objName){ console.log(Object.values(obj)[0]); }
// console.log(obj);
// const relaciones = async () => {
//     const insumo1 = await Insumo.findByPk(1)
//     await insumo1.setReceta(1)
// }
// relaciones()
// }
// }


module.exports = { setRecetas, json, setInsumoReceta, updateInsumo };