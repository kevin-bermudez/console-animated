module.exports.getScreenSize = (config = { 
    widthBorder:2,
    heightBorder:3,
    forRealY : (y) => y+2 ,
    forRealX : (x) => x+1
}) => {
    const consoleColumns = process.stdout.columns;
    const consoleRows = process.stdout.rows;
    return {
        columns : consoleColumns,
        rows : consoleRows,
        width : consoleColumns - config.widthBorder,
        height : consoleRows - config.heightBorder,
        forRealY : config.forRealY,
        forRealX : config.forRealX
    }
}