const { generateRandomInt } = require("../../../utils/random-data");
const { objectTypes } = require("../object-contants")

module.exports.unitsOfMeasurement = Object.freeze({
  GR : 'gr'
})

module.exports.currencyName = 'Vin';
module.exports.currencyNamePlural = 'Vines'
module.exports.currencySymbol = 'V';

module.exports.salableObjects = Object.freeze([
  {
    type : objectTypes.GOLD_ORE,
    unit : this.unitsOfMeasurement.GR
  }
])

module.exports.getSalableObjectTypes = () => Object.values(this.salableObjects).map(object => object.type);

module.exports.generatePricesList = () => {
  const pricesList = {};
  this.salableObjects.forEach(object => {
    pricesList[object.type] = {
      ...object,
      priceByUnit : generateRandomInt(0,10)
    }
  })

  return pricesList;
}