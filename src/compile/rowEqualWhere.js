var equalWhere = require("./equalWhere");


module.exports = rowEqualWhere;


function rowEqualWhere(row, where) {
    var i = -1,
        il = where.length - 1,
        statement;

    while (i++ < il) {
        statement = where[i];

        if (!equalWhere(row[statement[0]], statement[2], statement[1])) {
            return false;
        }
    }

    return true;
}
