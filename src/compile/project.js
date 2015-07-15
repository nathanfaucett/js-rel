var map = require("map"),
    has = require("has"),
    isArray = require("is_array");


module.exports = project;


function project(rows, attributes) {
    return isArray(attributes) ?
        map(rows, function mapSelect(row) {
            var localHas = has,
                out = {},
                i = -1,
                il = attributes.length - 1,
                key;

            while (i++ < il) {
                key = attributes[i];

                if (localHas(row, key)) {
                    out[key] = row[key];
                }
            }

            return out;
        }) :
        map(rows, function mapSelect(row) {
            var localHas = has,
                out = {},
                key;

            for (key in row) {
                if (localHas(row, key)) {
                    out[key] = row[key];
                }
            }

            return out;
        });
}
