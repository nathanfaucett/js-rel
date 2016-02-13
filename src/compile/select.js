var arrayFilter = require("array-filter"),
    isArray = require("is_array"),
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

                if (!equalWhere(options, row[statement[0]], statement[2], statement[1])) {
                    return false;
                }
            }

            return true;
        }) :
        rows;
}
