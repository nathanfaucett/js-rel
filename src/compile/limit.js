var parseOption = require("./parseOption");


module.exports = limit;


function limit(options, rows, count) {
    return rows.slice(0, parseOption(options, count));
}
