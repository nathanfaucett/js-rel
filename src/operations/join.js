var forEach = require("for_each"),
    isArray = require("is_array"),
    consts = require("../consts"),
    Relation = require("../relation");


module.exports = join;


function join(leftRelation, rightRelation, on, type) {
    if (!Relation.isRelation(leftRelation) || !Relation.isRelation(rightRelation)) {
        throw new TypeError("join(leftRelation, rightRelation, on, type) leftRelation and rightRelation must be a Relation");
    } else {
        return new Relation(type || consts.INNER_JOIN, new JoinNotation(leftRelation, rightRelation, on));
    }
}

function JoinNotation(leftRelation, rightRelation, on) {
    this.leftRelation = leftRelation;
    this.rightRelation = rightRelation;
    this.on = validate(on);
}

function validateArray(value) {
    if (!isArray(value)) {
        throw new TypeError(
            "join(leftRelation, rightRelation, on, type) where be arrays, ex " +
            "['leftRelation.attribute', '=', 'rightRelation.attribute']"
        );
    }
}

function validate(on) {
    if (isArray(on)) {
        forEach(on, validateArray);
        return on;
    } else {
        return "*";
    }
}
