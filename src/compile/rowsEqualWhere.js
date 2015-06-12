var equalWhere = require("./equalWhere");


module.exports = rowsEqualWhere;


function rowsEqualWhere(a, b, where) {
    var i = 0,
        il = where.length,
        condition;

    while (il--) {
        condition = where[i];

        if (!equalWhere(a[condition[0]], b[condition[2]], condition[1])) {
            return false;
        }
        i++;
    }

    return true;
}
