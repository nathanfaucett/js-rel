var map = require("map"),
    has = require("has"),
    isArray = require("is_array");


module.exports = project;


function project(rows, attributes) {
    return isArray(attributes) ?
        map(rows, function mapSelect(row) {
            var out = {},
                i = -1,
                il = attributes.length - 1,
                key;

            while (i++ < il) {
                key = attributes[i];

                if (has(row, key)) {
                    out[key] = row[key];
                }
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
