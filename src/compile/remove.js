var filter = require("filter"),
    isArray = require("is_array"),
    equalWhere = require("./equalWhere");


module.exports = remove;


function remove(rows, where) {
    return isArray(where) ?
        filter(rows, function fitlerWhere(row) {
            var i = -1,
                il = where.length - 1,
                condition;

            while (i++ < il) {
                condition = where[i];

                if (!equalWhere(row[condition[0]], condition[2], condition[1])) {
                    return true;
                }
            }

            return false;
        }) : [];
}
