var isString = require("is_string"),
    Relation = require("./Relation"),
    consts = require("./consts");


module.exports = rel;


function rel(from, adapter) {
    if (!isString(from)) {
        throw new TypeError("rel(from, adapter) from must be a string");
    } else {
        return new Relation(null, consts.FROM, from, adapter);
    }
}

rel.MemoryAdapter = require("./MemoryAdapter");
