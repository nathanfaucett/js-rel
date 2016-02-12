var arrayReverse = require("array-reverse"),
    consts = require("../consts");


var DESC = consts.DESC;


module.exports = order;


function order(rows, by) {
    if (by === DESC) {
        return arrayReverse(rows);
    } else {
        return rows;
    }
}
