var arrayMap = require("array-map"),
    updateRow = require("./updateRow"),
    rowEqualWhere = require("./rowEqualWhere");


module.exports = update;


function update(rows, attributes, values, where) {
    return arrayMap(rows, function(row) {
        if (rowEqualWhere(row, where)) {
            return updateRow(row, attributes, values);
        } else {
            return row;
        }
    });
}
