var map = require("map"),
    has = require("has"),
    isArray = require("is_array");


module.exports = project;


function project(rows, attributes) {
    return isArray(attributes) ?
        map(rows, function mapSelect(row) {
            var out = {},
                i = 0,
                il = attributes.length,
                key;

            while (il--) {
                key = attributes[i];
                if (has(row, key)) {
                    out[key] = row[key];
                }
                i++;
            }

            return out;
        }) :
        map(rows, function mapSelect(row) {
            var out = {},
                key;

            for (key in row) {
                if (has(row, key)) {
                    out[key] = row[key];
                }
            }

            return out;
        });
}
