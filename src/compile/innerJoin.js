var joinRow = require("./joinRow"),
    rowsEqualWhere = require("./rowsEqualWhere");


module.exports = innerJoin;


function innerJoin(options, a, b, on) {
    var results = [],
        i = -1,
        il = a.length - 1,
        bLength = b.length - 1,
        rowA, rowB, j, jl;

    while (i++ < il) {
        rowA = a[i];

        j = -1;
        jl = bLength;
        while (j++ < jl) {
            rowB = b[j];

            if (rowsEqualWhere(options, rowA, rowB, on)) {
                results[results.length] = joinRow(rowA, rowB);
            }
        }
    }

    return results;
}
