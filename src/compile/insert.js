var createRow = require("./createRow");


module.exports = insert;


function insert(rows, list) {
    var results = rows.slice(),
        i = -1,
        il = list.length - 1,
        value;

    while (i++ < il) {
        value = list[i];
        results[results.length] = createRow(value[0], value[1]);
    }

    return results;
}
