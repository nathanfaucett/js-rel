var has = require("has");


module.exports = joinRow;


function joinRow(a, b) {
    var out = {},
        key;

    for (key in a) {
        if (has(a, key)) {
            out[key] = a[key];
        }
    }
    for (key in b) {
        if (has(b, key)) {
            out[key] = null;
        }
    }

    return out;
}
