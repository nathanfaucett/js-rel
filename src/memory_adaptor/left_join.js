var joinRow = require("./join_row"),
    joinRowFillNull = require("./join_row_fill_null"),
    rowsEqualWhere = require("./rows_equal_where");


module.exports = leftJoin;


function leftJoin(a, b, on) {
    var results = [],
        i = 0,
        il = a.length,
        bLength = b.length,
        rowA, rowB, j, jl, found;

    while (il--) {
        rowA = a[i];

        j = 0;
        jl = bLength;
        found = false;

        while (jl--) {
            rowB = b[j];

            if (rowsEqualWhere(rowA, rowB, on)) {
                results[results.length] = joinRow(rowA, rowB);
                found = true;
            }
            j++;
        }

        if (!found && rowB) {
            results[results.length] = joinRowFillNull(rowA, rowB);
        }

        i++;
    }

    return results;
}
