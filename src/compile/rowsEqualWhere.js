var equalWhere = require("./equalWhere"),
    parseOption = require("./parseOption");


module.exports = rowsEqualWhere;


function rowsEqualWhere(options, a, b, where) {
    var i = -1,
        il = where.length - 1,
        statement;

    while (i++ < il) {
        statement = where[i];

        if (!equalWhere(options, a[parseOption(options, statement[0])], b[parseOption(options, statement[2])], parseOption(options, statement[1]))) {
            return false;
        }
    }

    return true;
}
