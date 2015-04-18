var forEach = require("for_each"),
    isArray = require("is_array"),
    isString = require("is_string"),
    consts = require("../consts"),
    Relation = require("../relation");


module.exports = select;


function select(from, where) {
    if (!isString(from) && !Relation.isRelation(from)) {
        throw new TypeError("select(from, where) from must be a string or a Relation");
    } else {
        return new Relation(consts.SELECT, new SelectNotation(from, where));
    }
}

function SelectNotation(from, where) {
    this.from = from;
    this.where = validate(where);
}

function validateArray(value) {
    if (!isArray(value)) {
        throw new TypeError("select(from, where) where comparisions must be arrays, ex ['table.id', '=', 1]");
    }
}

function validate(where) {
    if (isArray(where)) {
        forEach(where, validateArray);
        return where;
    } else {
        return "*";
    }
}
