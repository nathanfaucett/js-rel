var equalWhere = require("./equalWhere");


module.exports = rowsEqualWhere;


function rowsEqualWhere(options, a, b, where) {
    var i = -1,
        il = where.length - 1,
        statement;

    while (i++ < il) {
        statement = where[i];

        if (!equalWhere(options, a[statement[0]], b[statement[2]], statement[1])) {
            return false;
        }
    }

    return true;
}
