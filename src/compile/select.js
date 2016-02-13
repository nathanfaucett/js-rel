var arrayFilter = require("array-filter"),
    isArray = require("is_array"),
    parseOption = require("./parseOption"),
    equalWhere = require("./equalWhere");


module.exports = select;


function select(options, rows, where) {
    return isArray(where) ?
        arrayFilter(rows, function fitlerWhere(row) {
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
        }) :
        rows;
}
