const {saveObject,getObjectsByType} = require('./core/storage/generic-object-storage')
const { Person } = require('./game/objects/Person')

// saveObject('111',{type:'Person'},{objects:2})
// getObjectsByType('Person')
console.log(new Person(1,2));