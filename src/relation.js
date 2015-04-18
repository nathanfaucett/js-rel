var isObjectLike = require("is_object_like");


module.exports = Relation;


var select = require("./operations/select"),
    project = require("./operations/project"),
    join = require("./operations/join"),

    difference = require("./set_operations/difference"),
    intersection = require("./set_operations/intersection"),
    union = require("./set_operations/union");


function Relation(operation, notation) {
    this.operation = operation;
    this.notation = notation;
}

Relation.isRelation = function(object) {
    return isObjectLike(object) && object.__Relation__ === true;
};

Relation.prototype.__Relation__ = true;

Relation.prototype.select = function(where) {
    return select(this, where);
};

Relation.prototype.project = function(what) {
    return project(this, what);
};

Relation.prototype.join = function(relation, on, type) {
    return join(this, relation, on, type);
};

Relation.prototype.difference = function(relation) {
    return difference(this, relation);
};

Relation.prototype.intersection = function(relation) {
    return intersection(this, relation);
};

Relation.prototype.union = function(relation) {
    return union(this, relation);
};
