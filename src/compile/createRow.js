var parseValue = require("./parseValue");


module.exports = createRow;


function createRow(options, attributes, values) {
    var result = {},
        i = -1,
        il = attributes.length - 1;

    while (i++ < il) {
        result[attributes[i]] = parseValue(options, values[i]);
    }

    return result;
}
