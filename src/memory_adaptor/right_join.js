var joinRow = require("./join_row"),
    joinRowFillNull = require("./join_row_fill_null"),
    rowsEqualWhere = require("./rows_equal_where");


module.exports = rightJoin;


function rightJoin(a, b, on) {
    var results = [],
        i = 0,
        il = b.length,
        aLength = a.length,
        rowA, rowB, j, jl, found;

    while (il--) {
        rowB = b[i];

        j = 0;
        jl = aLength;
        found = false;

        while (jl--) {
            rowA = a[j];

            if (rowsEqualWhere(rowA, rowB, on)) {
                results[results.length] = joinRow(rowA, rowB);
                found = true;
            }
            j++;
        }

        if (!found && rowA) {
            results[results.length] = joinRowFillNull(rowB, rowA);
        }

        i++;
    }

    return results;
}
