var equalWhere = require("./equalWhere"),
    parseOption = require("./parseOption");


module.exports = rowEqualWhere;


function rowEqualWhere(options, row, where) {
    var i = -1,
        il = where.length - 1,
        statement;

    while (i++ < il) {
        statement = where[i];

        if (!equalWhere(options, row[parseOption(options, statement[0])], parseOption(options, statement[2]), parseOption(options, statement[1]))) {
            return false;
        }
    }

    return true;
}
