var arrayMap = require("array-map"),
    has = require("has"),
    isArray = require("is_array"),
    parseOption = require("./parseOption");


module.exports = project;


function project(options, rows, attributes) {
    return isArray(attributes) ?
        arrayMap(rows, function mapSelect(row) {
            var localHas = has,
                out = {},
                i = -1,
                il = attributes.length - 1,
                key;

            while (i++ < il) {
                key = parseOption(options, attributes[i]);

                if (localHas(row, key)) {
                    out[key] = row[key];
                }
            }

            return out;
        }) :
        rows;
}
