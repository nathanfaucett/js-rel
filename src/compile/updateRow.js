var has = require("has"),
    parseOption = require("./parseOption");


module.exports = updateRow;


function updateRow(options, row, attributes, values) {
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
        result[parseOption(options, attributes[i])] = parseOption(options, values[i]);
    }

    return result;
}
