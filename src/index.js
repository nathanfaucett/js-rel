var consts = require("./consts"),
    select = require("./operations/select");


module.exports = rel;


function rel(from, where) {
    return select(from, where);
}

rel.compile = require("./compile");
rel.MemoryAdaptor = require("./memory_adaptor");

rel.INNER_JOIN = consts.INNER_JOIN;
rel.LEFT_JOIN = consts.LEFT_JOIN;
rel.RIGHT_JOIN = consts.RIGHT_JOIN;
