var joinRow = require("./joinRow"),
    joinRowFillNull = require("./joinRowFillNull"),
    rowsEqualWhere = require("./rowsEqualWhere");


module.exports = rightJoin;


function rightJoin(options, a, b, on) {
    var results = [],
        i = -1,
        il = b.length - 1,
        aLength = a.length - 1,
        rowA, rowB, j, jl, found;

    while (i++ < il) {
        rowB = b[i];

        j = -1;
        jl = aLength;
        found = false;

        while (j++ < jl) {
            rowA = a[j];

            if (rowsEqualWhere(options, rowA, rowB, on)) {
                results[results.length] = joinRow(rowA, rowB);
                found = true;
            }
        }

        if (!found && rowA) {
            results[results.length] = joinRowFillNull(rowB, rowA);
        }
    }

    return results;
}
