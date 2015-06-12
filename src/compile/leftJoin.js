var joinRow = require("./joinRow"),
    joinRowFillNull = require("./joinRowFillNull"),
    rowsEqualWhere = require("./rowsEqualWhere");


module.exports = leftJoin;


function leftJoin(a, b, on) {
    var results = [],
        i = -1,
        il = a.length - 1,
        bLength = b.length - 1,
        rowA, rowB, j, jl, found;

    while (i++ < il) {
        rowA = a[i];

        j = -1;
        jl = bLength;
        found = false;

        while (j++ < jl) {
            rowB = b[j];

            if (rowsEqualWhere(rowA, rowB, on)) {
                results[results.length] = joinRow(rowA, rowB);
                found = true;
            }
        }

        if (!found && rowB) {
            results[results.length] = joinRowFillNull(rowA, rowB);
        }
    }

    return results;
}
