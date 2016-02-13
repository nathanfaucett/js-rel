var parseOption = require("./parseOption");


module.exports = orderBy;


function orderBy(options, rows, by) {
    var newRows = rows.slice();

    newRows.sort(function onSort(a, b) {
        return compare(options, a, b, by);
    });

    return newRows;
}

function compare(options, a, b, by) {
    var ret = 0,
        i = -1,
        il = by.length - 1,
        attribute, aValue, bValue;

    while (i++ < il) {
        attribute = parseOption(options, by[i]);
        aValue = a[attribute];
        bValue = b[attribute];

        if (aValue < bValue) {
            ret = -1;
        } else if (aValue > bValue) {
            ret = 1;
        }
    }

    return ret;
}
