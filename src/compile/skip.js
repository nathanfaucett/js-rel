var parseValue = require("./parseValue");


module.exports = skip;


function skip(options, rows, count) {
    return rows.slice(parseValue(options, count), rows.length);
}
