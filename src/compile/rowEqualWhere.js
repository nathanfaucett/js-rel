var equalWhere = require("./equalWhere");


module.exports = rowEqualWhere;


function rowEqualWhere(row, where) {
    var i = 0,
        il = where.length,
        condition;

    while (il--) {
        condition = where[i];
        if (!equalWhere(row[condition[0]], condition[2], condition[1])) {
            return false;
        }
        i++;
    }

    return true;
}
