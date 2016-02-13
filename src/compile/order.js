var arrayReverse = require("array-reverse"),
    parseOption = require("./parseOption"),
    consts = require("../consts");


var DESC = consts.DESC;


module.exports = order;


function order(options, rows, by) {
    if (parseOption(options, by) === DESC) {
        return arrayReverse(rows);
    } else {
        return rows;
    }
}
