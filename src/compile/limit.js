var parseValue = require("./parseValue");


module.exports = limit;


function limit(options, rows, count) {
    return rows.slice(0, parseValue(options, count));
}
