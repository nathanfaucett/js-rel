module.exports = createRow;


function createRow(attributes, values) {
    var result = {},
        i = -1,
        il = attributes.length - 1;

    while (i++ < il) {
        result[attributes[i]] = values[i];
    }

    return result;
}
