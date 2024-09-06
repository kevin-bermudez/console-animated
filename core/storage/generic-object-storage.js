const fs = require('fs');

const entityName = 'objects';
const routeJson = '../../data/' + entityName + '.json';

const getDataList = () => {
  if(!fs.existsSync(routeJson)){
    return [];
  }

  return JSON.parse( fs.readFileSync(routeJson) );
}

const getObject = (id) => {
  const allData = getDataList();
  const index = allData.findIndex(element => element.id === id);

  if(index === -1){
    return false;
  }

  return {
    index,
    object : allData[index]
  }
}

const saveObject = (id,data) => {
  const object = getObject(id); 

  if(!object){
    return false;
  }
}