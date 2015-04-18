var joinRow = require("./join_row"),
    rowsEqualWhere = require("./rows_equal_where");


module.exports = innerJoin;


function innerJoin(a, b, on) {
    var results = [],
        i = 0,
        il = a.length,
        bLength = b.length,
        rowA, rowB, j, jl;

    while (il--) {
        rowA = a[i];

        j = 0;
        jl = bLength;
        while (jl--) {
            rowB = b[j];

            if (rowsEqualWhere(rowA, rowB, on)) {
                results[results.length] = joinRow(rowA, rowB);
            }
            j++;
        }
        i++;
    }

    return results;
}
