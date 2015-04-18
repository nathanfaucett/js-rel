var map = require("map"),
    updateRow = require("./update_row"),
    rowEqualWhere = require("./row_equal_where");


module.exports = update;


function update(rows, attributes, values, where) {
    return map(rows, function(row) {
        if (rowEqualWhere(row, where)) {
            return updateRow(row, attributes, values);
        } else {
            return row;
        }
    });
}
