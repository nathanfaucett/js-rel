var filter = require("filter"),
    isArray = require("is_array"),
    equalWhere = require("./equalWhere");


module.exports = remove;


function remove(rows, where) {
    return isArray(where) ?
        filter(rows, function fitlerWhere(row) {
            var i = -1,
                il = where.length - 1,
                statement;

            while (i++ < il) {
                statement = where[i];

                if (!equalWhere(row[statement[0]], statement[2], statement[1])) {
                    return true;
                }
            }

            return false;
        }) : [];
}
