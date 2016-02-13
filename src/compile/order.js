var arrayReverse = require("array-reverse"),
    parseValue = require("./parseValue"),
    consts = require("../consts");


var DESC = consts.DESC;


module.exports = order;


function order(options, rows, by) {
    if (parseValue(options, by) === DESC) {
        return arrayReverse(rows);
    } else {
        return rows;
    }
}
