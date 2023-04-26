const { Receta } = require('../../db.js');
const { Insumo } = require('../../db.js');
const jwt = require('jsonwebtoken')


const updateInsumo = async (id) => {
  let insumo = await Insumo.findByPk(id);
  return insumo;
};

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }, process.env.SECRET || 'algosecreto',
  {expiresIn:'30d'})
}

async function crearReceta(nombre, insumos) {
 try {
    const receta = await Receta.create({ name: nombre });
    let aux = 0
    for (const { id, cantidad, costo, costoPorBotella } of insumos) {
      const insumo = await Insumo.findByPk(id);
      aux = costoPorBotella + aux
      await receta.addInsumo(insumo, {
        through: { cantidad, costo, costoPorBotella },
      });
    }
    await receta.update({ costoPorReceta: aux });
    return receta.toJSON();
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear la receta');
  }
}

const json = [
    {
      name: 'AGUA ESENCIAL S/G 2000',
      insumos: [
        {
          id: 26,
          cantidad: 1,
          costo: 0.0055,
          costoPorBotella: 0.0055,
        },
        {
          id: 53,
          cantidad: 1,
          costo: 0.01282,
          costoPorBotella: 0.01282,
        },
        {
          id: 37,
          cantidad: 1,
          costo: 0.08482790390832072,
          costoPorBotella: 0.08482790390832072,
        },
        {
          id: 29,
          cantidad: 0.0013541666666666667,
          costo: 2.1,
          costoPorBotella: 0.0028437500000000004,
        },
        {
          id: 31,
          cantidad: 0.004333333333333333,
          costo: 2.75,
          costoPorBotella: 0.011916666666666666,
        },
        {
          id: 21,
          cantidad: 6.825e-5,
          costo: 8.74,
          costoPorBotella: 0.0005965050000000001,
        },
        {
          id: 22,
          cantidad: 0.008333333333333333,
          costo: 0.54,
          costoPorBotella: 0.0045000000000000005,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     CostoPorBotella: 0.1230048255749874,
      //     Costo: '',
      //   },
      ],
    },
    {
      name: 'AGUA ESENCIAL C/G 2000',
      insumos: [
        {
          id: 26,
          cantidad: 1,
          costo: 0.0055,
          costoPorBotella: 0.0055,
        },
        {
          id: 49,
          cantidad: 1,
          costo: 0.01282,
          costoPorBotella: 0.01282,
        },
        {
          id: 41,
          cantidad: 1,
          costo: 0.08761621743796016,
          costoPorBotella: 0.08761621743796016,
        },
        {
          id: 29,
          cantidad: 0.0013541666666666667,
          costo: 2.1,
          costoPorBotella: 0.0028437500000000004,
        },
        {
          id: 31,
          cantidad: 0.004333333333333333,
          costo: 2.75,
          costoPorBotella: 0.011916666666666666,
        },
        {
          id: 8,
          cantidad: 0.0225388,
          costo: 0.7992665036674816,
          costoPorBotella: 0.018014507872860637,
        },
        {
          id: 21,
          cantidad: 0.00012285,
          costo: 8.74,
          costoPorBotella: 0.0010737090000000002,
        },
        {
          id: 22,
          cantidad: 0.008333333333333333,
          costo: 0.54,
          costoPorBotella: 0.0045000000000000005,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     Costo: '',
      //     CostoPorBotella: 0.14428485097748747,
      //   },
      //   {
      //     id: 'COSTO TOTAL POR BULTO',
      //     Costo: '',
      //     CostoPorBotella: 0.5771394039099499,
      //   },
      ],
    },
    {
      name: 'AGUA ESENCIAL S/G 600',
      insumos: [
        {
          id: 27,
          cantidad: 1,
          costo: 0.006549999999999999,
          costoPorBotella: 0.006549999999999999,
          // Column6: 0.004309416074121957,
        },
        {
          id: 53,
          cantidad: 1,
          costo: 0.01282,
          costoPorBotella: 0.01282,
        },
        {
          id: 38,
          cantidad: 1,
          costo: 0.04381031160198328,
          costoPorBotella: 0.04381031160198328,
        },
        {
          id: 29,
          cantidad: 0.0003968253968253968,
          costo: 2.1,
          costoPorBotella: 0.0008333333333333334,
        },
        {
          id: 30,
          cantidad: 0.0025833333333333333,
          costo: 2.15,
          costoPorBotella: 0.0055541666666666665,
        },
        {
          id: 21,
          cantidad: 6.825e-5,
          costo: 8.74,
          costoPorBotella: 0.0005965050000000001,
        },
        {
          id: 22,
          cantidad: 0.003968253968253968,
          costo: 0.54,
          costoPorBotella: 0.002142857142857143,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     Costo: '',
      //     CostoPorBotella: 0.07230717374484043,
      //   },
      ],
    },
    {
      name: 'AGUA ESENCIAL C/G 600',
      insumos: [
        {
          id: 38,
          cantidad: 1,
          costo: 0.04381031160198328,
          costoPorBotella: 0.04381031160198328,
        },
        {
          id: 49,
          cantidad: 1,
          costo: 0.01282,
          costoPorBotella: 0.01282,
        },
        {
          id: 27,
          cantidad: 1,
          costo: 0.006549999999999999,
          costoPorBotella: 0.006549999999999999,
        },
        {
          id: 29,
          cantidad: 0.0003968253968253968,
          costo: 2.1,
          costoPorBotella: 0.0008333333333333334,
        },
        {
          id: 30,
          cantidad: 0.0025833333333333333,
          costo: 2.15,
          costoPorBotella: 0.0055541666666666665,
        },
        {
          id: 8,
          cantidad: 0.007,
          costo: 0.7992665036674816,
          costoPorBotella: 0.005594865525672372,
        },
        {
          id: 21,
          cantidad: 6.825e-5,
          costo: 8.74,
          costoPorBotella: 0.0005965050000000001,
        },
        {
          id: 22,
          cantidad: 0.003968253968253968,
          costo: 0.54,
          costoPorBotella: 0.002142857142857143,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     Costo: '',
      //     CostoPorBotella: 0.07790203927051279,
      //   },
      //   {
      //     id: 'COSTO TOTAL POR BULTO',
      //     Costo: '',
      //     CostoPorBotella: 0.4674122356230767,
      //   },
      ],
    },
    {
      name: 'SODA SIFON 2000',
      insumos: [
        {
          id: 43,
          cantidad: 1,
          costo: 0.10505123004685392,
          costoPorBotella: 0.10505123004685392,
        },
        {
          id: 47,
          cantidad: 1,
          costo: 0.175,
          costoPorBotella: 0.175,
        },
        {
          id: 25,
          cantidad: 1,
          costo: 0.0079,
          costoPorBotella: 0.0079,
        },
        {
          id: 31,
          cantidad: 0.005833333333333334,
          costo: 2.75,
          costoPorBotella: 0.016041666666666666,
        },
        {
          id: 21,
          cantidad: 6.825e-5,
          costo: 8.74,
          costoPorBotella: 0.0005965050000000001,
        },
        {
          id: 8,
          cantidad: 0.02663592,
          costo: 0.7992665036674816,
          costoPorBotella: 0.02128919865036675,
        },
        {
          id: 29,
          cantidad: 0.0014583333333333332,
          costo: 2.1,
          costoPorBotella: 0.0030624999999999997,
        },
        {
          id: 22,
          cantidad: 0.008333333333333333,
          costo: 0.54,
          costoPorBotella: 0.0045000000000000005,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     Costo: '',
      //     CostoPorBotella: 0.3334411003638874,
      //   },
      ],
    },
    {
      name: 'BIDIÓN 6000',
      insumos: [
        {
          id: 35,
          cantidad: 1,
          costo: 0.4470218690573214,
          costoPorBotella: 0.4470218690573214,
        },
        {
          id: 50,
          cantidad: 1,
          costo: 0.02640586797066015,
          costoPorBotella: 0.02640586797066015,
        },
        {
          id: 46,
          cantidad: 1,
          costo: 0.03872860635696822,
          costoPorBotella: 0.03872860635696822,
        },
        {
          id: 24,
          cantidad: 1.07,
          costo: 0.0308,
          costoPorBotella: 0.032956000000000006,
        },
        {
          id: 32,
          cantidad: 0.0034946236559139786,
          costo: 2.45,
          costoPorBotella: 0.008561827956989248,
        },
        {
          id: 23,
          cantidad: 0.03763440860215054,
          costo: 0.92,
          costoPorBotella: 0.0346236559139785,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     Costo: '',
      //     CostoPorBotella: 0.5882978272559175,
      //   },
      //   {
      //     id: 'COSTO TOTAL POR BULTO',
      //     Costo: '',
      //     CostoPorBotella: 0.5882978272559175,
      //   },
      ],
    },
    {
      name: 'NET NARANJA 2250',
      insumos: [
        {
          id: 5,
          cantidad: 0.162333,
          costo: 0.711,
          costoPorBotella: 0.25969221675,
        },
        {
          id: 2,
          cantidad: 0.0018833333333333334,
          costo: 4.2,
          costoPorBotella: 0.0177975,
        },
        {
          id: 7,
          cantidad: 0.00019999999999999998,
          costo: 4.6,
          costoPorBotella: 0.00207,
        },
        {
          id: 6,
          cantidad: 0.00025,
          costo: 4.4,
          costoPorBotella: 0.002475,
        },
        {
          id: 12,
          cantidad: 2e-5,
          costo: 19.6,
          costoPorBotella: 0.0008820000000000001,
        },
        {
          id: 13,
          cantidad: 0.0015,
          costo: 29.3,
          costoPorBotella: 0.0988875,
        },
        {
          id: 28,
          cantidad: 1,
          costo: 0.009800000000000001,
          costoPorBotella: 0.009800000000000001,
        },
        {
          id: 51,
          cantidad: 1,
          costo: 0.01282,
          costoPorBotella: 0.01282,
        },
        {
          id: 42,
          cantidad: 1,
          costo: 0.09492901976999946,
          costoPorBotella: 0.09492901976999946,
        },
        {
          id: 29,
          cantidad: 0.0014583333333333332,
          costo: 2.1,
          costoPorBotella: 0.0030624999999999997,
        },
        {
          id: 30,
          cantidad: 0.005833333333333334,
          costo: 2.15,
          costoPorBotella: 0.012541666666666666,
        },
        {
          id: 8,
          cantidad: 0.0233044,
          costo: 0.7992665036674816,
          costoPorBotella: 0.018626426308068458,
        },
        {
          id: 21,
          cantidad: 0.00012285,
          costo: 8.74,
          costoPorBotella: 0.0010737090000000002,
        },
        {
          id: 22,
          cantidad: 0.008333333333333333,
          costo: 0.54,
          costoPorBotella: 0.0045000000000000005,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     Costo: '',
      //     CostoPorBotella: 0.5391575384947346,
      //   },
      //   {
      //     id: 'COSTO TOTAL POR BULTO',
      //     Costo: '',
      //     CostoPorBotella: 3.2349452309684077,
      //   },
      ],
    },
    {
      name: 'NET POMELO 2250',
      insumos: [
        {
          id: 5,
          cantidad: 0.151867,
          costo: 0.711,
          costoPorBotella: 0.24294923324999998,
        },
        {
          id: 2,
          cantidad: 0.002271666666666667,
          costo: 4.2,
          costoPorBotella: 0.021467250000000007,
        },
        {
          id: 1,
          cantidad: 6.666666666666667e-5,
          costo: 9.2,
          costoPorBotella: 0.0013800000000000002,
        },
        {
          id: 7,
          cantidad: 0.00015,
          costo: 4.6,
          costoPorBotella: 0.0015524999999999996,
        },
        {
          id: 6,
          cantidad: 0.00019999999999999998,
          costo: 4.4,
          costoPorBotella: 0.00198,
        },
        {
          id: 9,
          cantidad: 0.00019999999999999998,
          costo: 4.4,
          costoPorBotella: 0.00198,
        },
        {
          id: 15,
          cantidad: 4.9999999999999996e-5,
          costo: 20,
          costoPorBotella: 0.0022500000000000003,
        },
        {
          id: 16,
          cantidad: 8.999999999999999e-6,
          costo: 2,
          costoPorBotella: 4.0499999999999995e-5,
        },
        {
          id: 12,
          cantidad: 2e-5,
          costo: 19.6,
          costoPorBotella: 0.0008820000000000001,
        },
        {
          id: 17,
          cantidad: 0.0014000000000000002,
          costo: 29,
          costoPorBotella: 0.09135000000000001,
        },
        {
          id: 28,
          cantidad: 1,
          costo: 0.009800000000000001,
          costoPorBotella: 0.009800000000000001,
        },
        {
          id: 48,
          cantidad: 1,
          costo: 0.01282,
          costoPorBotella: 0.01282,
        },
        {
          id: 42,
          cantidad: 1,
          costo: 0.09492901976999946,
          costoPorBotella: 0.09492901976999946,
        },
        {
          id: 29,
          cantidad: 0.0014583333333333332,
          costo: 2.1,
          costoPorBotella: 0.0030624999999999997,
        },
        {
          id: 30,
          cantidad: 0.005833333333333334,
          costo: 2.15,
          costoPorBotella: 0.012541666666666666,
        },
        {
          id: 8,
          cantidad: 0.0233044,
          costo: 0.7992665036674816,
          costoPorBotella: 0.018626426308068458,
        },
        {
          id: 21,
          cantidad: 0.0012285,
          costo: 8.74,
          costoPorBotella: 0.01073709,
        },
        {
          id: 22,
          cantidad: 0.008333333333333333,
          costo: 0.54,
          costoPorBotella: 0.0045000000000000005,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     Costo: '',
      //     CostoPorBotella: 0.5328481859947345,
      //   },
      //   {
      //     id: 'COSTO TOTAL POR BULTO',
      //     Costo: '',
      //     CostoPorBotella: 3.197089115968407,
      //   },
      ],
    },
    {
      name: 'NET COLA 2250',
      insumos: [
        {
          id: 5,
          cantidad: 0.139617,
          costo: 0.711,
          costoPorBotella: 0.22335229574999999,
        },
        {
          id: 3,
          cantidad: 0.00075,
          costo: 3.76,
          costoPorBotella: 0.006345,
        },
        {
          id: 14,
          cantidad: 0.0017,
          costo: 2,
          costoPorBotella: 0.00765,
        },
        {
          id: 18,
          cantidad: 3.3333333333333335e-5,
          costo: 49.5,
          costoPorBotella: 0.0037125,
        },
        {
          id: 6,
          cantidad: 0.00015,
          costo: 4.4,
          costoPorBotella: 0.001485,
        },
        {
          id: 11,
          cantidad: 0.00065,
          costo: 23,
          costoPorBotella: 0.0336375,
        },
        {
          id: 28,
          cantidad: 1,
          costo: 0.009800000000000001,
          costoPorBotella: 0.009800000000000001,
        },
        {
          id: 52,
          cantidad: 1,
          costo: 0.01282,
          costoPorBotella: 0.01282,
        },
        {
          id: 42,
          cantidad: 1,
          costo: 0.09492901976999946,
          costoPorBotella: 0.09492901976999946,
        },
        {
          id: 29,
          cantidad: 0.0014583333333333332,
          costo: 2.1,
          costoPorBotella: 0.0030624999999999997,
        },
        {
          id: 30,
          cantidad: 0.005833333333333334,
          costo: 2.15,
          costoPorBotella: 0.012541666666666666,
        },
        {
          id: 8,
          cantidad: 0.02796876,
          costo: 0.7992665036674816,
          costoPorBotella: 0.022354493017114913,
        },
        {
          id: 21,
          cantidad: 0.00012285,
          costo: 8.74,
          costoPorBotella: 0.0010737090000000002,
        },
        {
          id: 22,
          cantidad: 0.008333333333333333,
          costo: 0.54,
          costoPorBotella: 0.0045000000000000005,
        },
      //   {
      //     id: 'COSTO TOTAL POR BOTELLA',
      //     Costo: '',
      //     CostoPorBotella: 0.437263684203781,
      //   },
      //   {
      //     id: 'COSTO TOTAL POR BULTO',
      //     Costo: '',
      //     CostoPorBotella: 2.623582105222686,
      //   },
      ],
    },
    {
      name: 'NET LIMA LIMÓN x 2250cc',
      insumos: [
        {
          id: 5,
          cantidad: 0.109,
          costo: 0.711,
          costoPorBotella: 0.17437275,
        },
        {
          id: 2,
          cantidad: 0.0018,
          costo: 4.2,
          costoPorBotella: 0.01701,
        },
        {
          id: 1,
          cantidad: 0.0001,
          costo: 9.2,
          costoPorBotella: 0.00207,
        },
        {
          id: 7,
          cantidad: 0.0002,
          costo: 4.6,
          costoPorBotella: 0.00207,
        },
        {
          id: 6,
          cantidad: 0.0003,
          costo: 4.4,
          costoPorBotella: 0.00297,
        },
        {
          id: 20,
          cantidad: 0.00038,
          costo: 44.1,
          costoPorBotella: 0.0377055,
        },
        {
          id: 12,
          cantidad: 2.9999999999999997e-5,
          costo: 19.6,
          costoPorBotella: 0.001323,
        },
        {
          id: 19,
          cantidad: 0.00055,
          costo: 17,
          costoPorBotella: 0.0210375,
        },
        {
          id: 28,
          cantidad: 1,
          costo: 0.009800000000000001,
          costoPorBotella: 0.009800000000000001,
        },
        {
          id: 53,
          cantidad: 1,
          costo: 0.01282,
          costoPorBotella: 0.01282,
        },
        {
          id: 42,
          cantidad: 1,
          costo: 0.09492901976999946,
          costoPorBotella: 0.09492901976999946,
        },
        {
          id: 29,
          cantidad: 0.0014583333333333332,
          costo: 2.1,
          costoPorBotella: 0.0030624999999999997,
        },
        {
          id: 30,
          cantidad: 0.005833333333333334,
          costo: 2.15,
          costoPorBotella: 0.012541666666666666,
        },
        {
          id: 8,
          cantidad: 0.0233044,
          costo: 0.7992665036674816,
          costoPorBotella: 0.018626426308068458,
        },
        {
          id: 21,
          cantidad: 0.0012285,
          costo: 8.74,
          costoPorBotella: 0.01073709,
        },
        {
          id: 22,
          cantidad: 0.008333333333333333,
          costo: 0.54,
          costoPorBotella: 0.0045000000000000005,
        },
      ],
    },
  ];
  

module.exports = { crearReceta, json, updateInsumo, generateToken };
