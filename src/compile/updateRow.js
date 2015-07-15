var has = require("has");


module.exports = updateRow;


function updateRow(row, attributes, values) {
    var localHas = has,
        result = {},
        i = -1,
        il = attributes.length - 1,
        key;

    for (key in row) {
        if (localHas(row, key)) {
            result[key] = row[key];
        }
    }

    while (i++ < il) {
        result[attributes[i]] = values[i];
    }

    return result;
}
