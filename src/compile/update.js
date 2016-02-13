var arrayMap = require("array-map"),
    updateRow = require("./updateRow"),
    rowEqualWhere = require("./rowEqualWhere");


module.exports = update;


function update(options, rows, attributes, values, where) {
    return arrayMap(rows, function(row) {
        if (rowEqualWhere(options, row, where)) {
            return updateRow(options, row, attributes, values);
        } else {
            return row;
        }
    });
}
