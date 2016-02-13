var parseOption = require("./parseOption");


module.exports = skip;


function skip(options, rows, count) {
    return rows.slice(parseOption(options, count), rows.length);
}
