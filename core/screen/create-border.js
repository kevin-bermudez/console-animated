const { getScreenSize } = require("../../utils/screen");

const createBorder = () => {
  const screenSize = getScreenSize();

  const borderGraphics = [];
  
  borderGraphics.push(['']);
  borderGraphics.push([
    '',
    ...'-'.repeat(screenSize.width).split('')
  ])

  for(let i=1; i<=screenSize.height; i++){
    borderGraphics.push(['|',...' '.repeat(screenSize.width).split(''),'|'])
  }

  borderGraphics.push([
    '',
    ...'-'.repeat(screenSize.width).split('')
  ])

  return borderGraphics
}

module.exports.createBorder = createBorder;