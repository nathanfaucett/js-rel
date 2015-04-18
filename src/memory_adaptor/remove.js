var filter = require("filter"),
    isArray = require("is_array"),
    equalWhere = require("./equal_where");


module.exports = remove;


function remove(rows, where) {
    return isArray(where) ?
        filter(rows, function fitlerWhere(row) {
            var i = 0,
                il = where.length,
                condition;

            while (il--) {
                condition = where[i];

                if (!equalWhere(row[condition[0]], condition[2], condition[1])) {
                    return true;
                }
                i++;
            }

            return false;
        }) : [];
}
