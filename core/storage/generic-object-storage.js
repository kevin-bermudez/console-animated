const fs = require('fs');
const path = require('path');

const entityName = 'objects';

const routeJson = path.resolve(__dirname,'../..','data/' + entityName + '.json');

const getDataList = () => {
  if(!fs.existsSync(routeJson)){
    return {};
  }

  return {...JSON.parse( fs.readFileSync(routeJson) )};
}

const getObject = (id,returnAllData = false) => {
  const allData = getDataList();

  const object = allData[id];
  const returnData = {
    object : false
  }

  if(object){
    returnData.object = {...object};
  }

  if(returnAllData){
    returnData.all_data = allData;
  }

  return returnData;
}

const saveObject = ( id,config,data ) => {
  const { object,all_data } = getObject(id,true); 

  all_data[id] = {id,config:{},data:{},created_at: Date.now()};
  
  if(object){
    all_data[id] = {...object};
  }

  all_data[id] = {
    ...all_data[id],
    config : {...all_data[id].config,...config},
    data : {...all_data[id].data,...data},
    updated_at : Date.now()
  }

  fs.writeFileSync( routeJson,JSON.stringify(all_data,null,2) );

  return true;
}
module.exports.saveObject = saveObject;

const getObjectsByType = (type) => Object.values(getDataList()).filter(object => object.config.type === type);

module.exports.getObjectsByType = getObjectsByType
