var createRow = require("./createRow");


module.exports = insert;


function insert(options, rows, attributes, values) {
    var results = rows.slice(),
        i = -1,
        il = values.length - 1;


    while (i++ < il) {
        results[results.length] = createRow(options, attributes, values[i]);
    }

    return results;
}
