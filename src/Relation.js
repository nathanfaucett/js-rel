var keyMirror = require("key_mirror"),
    innerJoin = require("./compile/innerJoin"),
    leftJoin = require("./compile/leftJoin"),
    rightJoin = require("./compile/rightJoin"),
    consts = require("./consts");


var RelationPrototype,

    JOINS = keyMirror([
        consts.INNER_JOIN,
        consts.LEFT_JOIN,
        consts.RIGHT_JOIN
    ]);


module.exports = Relation;


function Relation(from, operation, notation, adapter, isJoin) {
    this.from = from;
    this.operation = operation;
    this.notation = notation;
    this.adapter = adapter;
    this.__run = null;
    this.__isJoin = !!isJoin;
}
RelationPrototype = Relation.prototype;

RelationPrototype.__isRelation__ = true;

RelationPrototype.select = function(where) {
    return new Relation(this, consts.SELECT, where, this.adapter);
};

RelationPrototype.project = function(attributes) {
    return new Relation(this, consts.PROJECT, attributes, this.adapter);
};

RelationPrototype.insert = function(rows) {
    return new Relation(this, consts.INSERT, rows, this.adapter);
};

function UpdateNotation(attributes, values, where) {
    this.attributes = attributes;
    this.values = values;
    this.where = where;
}

RelationPrototype.update = function(attributes, values, where) {
    return new Relation(this, consts.UPDATE, new UpdateNotation(attributes, values, where), this.adapter);
};

RelationPrototype.remove = function(where) {
    return new Relation(this, consts.REMOVE, where, this.adapter);
};

function JoinNotation(relation, on) {
    this.relation = relation;
    this.on = on;
}

RelationPrototype.join = function(relation, on, type) {
    if (!relation.__isRelation__) {
        throw new TypeError("Relation join(relation, on, type) relation must be a instance of Relation");
    } else {
        return new Relation(this, JOINS[type] || consts.INNER_JOIN, new JoinNotation(relation, on), this.adapter, true);
    }
};

RelationPrototype.run = function(callback) {
    return this.compile()(callback);
};

RelationPrototype.compile = function() {
    if (!this.__run) {
        return (this.run = compileRelation(this, []));
    } else {
        return this.__run;
    }
};

function compileRelation(relation, stack) {
    var from = relation.from;

    if (from !== null) {
        if (from.__isJoin && from.adapter !== from.notation.relation.adapter) {
            return createJoin(from);
        } else {
            stack.unshift(relation);
            return compileRelation(from, stack);
        }
    } else {
        if (relation.operation !== consts.FROM) {
            throw new TypeError("Relation compile() Invalid root relation, must be a from relation");
        } else {
            return relation.adapter.compile(relation.notation, stack);
        }
    }
}

function createJoin(relation) {
    var relationA = relation.from,
        relationB = relation.notation.relation,
        on = relation.notation.on,
        join;

    switch (relation.operation) {
        case consts.INNER_JOIN:
            join = innerJoin;
            break;
        case consts.LEFT_JOIN:
            join = leftJoin;
            break;
        case consts.RIGHT_JOIN:
            join = rightJoin;
            break;
    }

    return function runJoin(callback) {
        relationA.run(function(error, resultsA) {
            if (error) {
                callback(error);
            } else {
                relationB.run(function(error, resultsB) {
                    if (error) {
                        callback(error);
                    } else {
                        callback(undefined, join(resultsA, resultsB, on));
                    }
                });
            }
        });
    };
}