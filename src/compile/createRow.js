var parseOption = require("./parseOption");


module.exports = createRow;


function createRow(options, attributes, values) {
    var result = {},
        i = -1,
        il = attributes.length - 1;

    while (i++ < il) {
        result[parseOption(options, attributes[i])] = parseOption(options, values[i]);
    }

    return result;
}
