var createRow = require("./createRow");


module.exports = insert;


function insert(rows, attributes, values) {
    var results = rows.slice(),
        i = -1,
        il = values.length - 1;


    while (i++ < il) {
        results[results.length] = createRow(attributes, values[i]);
    }

    return results;
}
