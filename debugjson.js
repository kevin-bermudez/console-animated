module.exports.debugJson = (data,n=4) => {
  const fs = require('fs');

  if(!fs.existsSync('prueba-screen'+n+'.json')) fs.writeFileSync('prueba-screen'+n+'.json',JSON.stringify(data,null,2))
}