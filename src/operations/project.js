var forEach = require("for_each"),
    isArray = require("is_array"),
    isString = require("is_string"),
    consts = require("../consts"),
    Relation = require("../relation");


module.exports = project;


function project(from, what) {
    if (!Relation.isRelation(from)) {
        throw new TypeError("project(from, what) from must be a Relation");
    } else {
        return new Relation(consts.PROJECT, new ProjectNotation(from, what));
    }
}

function ProjectNotation(from, what) {
    this.from = from;
    this.what = validate(what);
}

function validateString(value) {
    if (!isString(value)) {
        throw new TypeError("project(from, what) what keys must be strings");
    }
}

function validate(what) {
    if (isArray(what)) {
        forEach(what, validateString);
        return what;
    } else {
        return "*";
    }
}
