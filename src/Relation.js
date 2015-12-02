var isNull = require("is_null"),
    keyMirror = require("key_mirror"),
    innerJoin = require("./compile/innerJoin"),
    leftJoin = require("./compile/leftJoin"),
    rightJoin = require("./compile/rightJoin"),
    compileInMemory = require("./compile/compileInMemory"),
    consts = require("./consts");


var RelationPrototype,

    JOINS = keyMirror([
        consts.INNER_JOIN,
        consts.LEFT_JOIN,
        consts.RIGHT_JOIN
    ]);


module.exports = Relation;


function Relation(from, operation, notation, table, adapter, isJoin) {
    this.from = from;
    this.operation = operation;
    this.notation = notation;
    this.table = table;
    this.adapter = adapter;
    this.__isJoin = isJoin;
    this.__isCompiled = false;
    this.__run = null;
}
RelationPrototype = Relation.prototype;

RelationPrototype.__isRelation__ = true;

RelationPrototype.select = function(where) {
    return new Relation(this, consts.SELECT, where, this.table, this.adapter, false);
};

RelationPrototype.project = function(attributes) {
    return new Relation(this, consts.PROJECT, attributes, this.table, this.adapter, false);
};

function InsertNotation(attributes, values) {
    this.attributes = attributes;
    this.values = values;
}

RelationPrototype.insert = function(attributes, values) {
    return new Relation(this, consts.INSERT, new InsertNotation(attributes, values), this.table, this.adapter, false);
};

function UpdateNotation(attributes, values, where) {
    this.attributes = attributes;
    this.values = values;
    this.where = where;
}

RelationPrototype.update = function(attributes, values, where) {
    return new Relation(this, consts.UPDATE, new UpdateNotation(attributes, values, where), this.table, this.adapter, false);
};

RelationPrototype.remove = function(where) {
    return new Relation(this, consts.REMOVE, where, this.table, this.adapter, false);
};

function JoinNotation(relation, on) {
    this.relation = relation;
    this.on = on;
}

RelationPrototype.join = function(relation, on, type) {
    if (!relation.__isRelation__) {
        throw new TypeError("Relation join(relation, on, type) relation must be a instance of Relation");
    } else {
        return new Relation(this, JOINS[type] || consts.INNER_JOIN, new JoinNotation(relation, on), this.table, this.adapter, true);
    }
};

RelationPrototype.skip = function(count) {
    return new Relation(this, consts.SKIP, count, this.table, this.adapter, false);
};

RelationPrototype.limit = function(count) {
    return new Relation(this, consts.LIMIT, count, this.table, this.adapter, false);
};

RelationPrototype.run = function(callback) {
    return this.compile()(callback);
};

RelationPrototype.compile = function() {
    var run;

    if (this.__isCompiled) {
        return this.__run;
    } else {
        run = compileRelation(this, []);
        this.__isCompiled = true;
        this.__run = run;
        return run;
    }
};

function compileRelation(relation, stack) {
    var fromRelation = relation.from,
        notation;

    if (!isNull(fromRelation)) {
        notation = relation.notation;
        if (relation.__isJoin && relation.adapter !== notation.relation.adapter) {
            if (stack.length) {
                return createStackJoin(
                    createJoin(
                        fromRelation.compile(),
                        notation.relation.compile(),
                        notation.on,
                        relation.operation
                    ),
                    compileInMemory(stack)
                );
            } else {
                return createJoin(
                    fromRelation.compile(),
                    notation.relation.compile(),
                    notation.on,
                    relation.operation
                );
            }
        } else {
            stack.unshift(relation);
            return compileRelation(fromRelation, stack);
        }
    } else {
        if (relation.operation !== consts.FROM) {
            throw new TypeError("Relation compile() Invalid root relation, must be a from relation");
        } else {
            return relation.adapter.compile(relation.notation, stack);
        }
    }
}

function createStackJoin(runJoin, runStack) {
    return function run(callback) {
        runJoin(function onJoin(error, results) {
            if (error) {
                callback(error);
            } else {
                runStack(results, callback);
            }
        });
    };
}

function createJoin(relationRunA, relationRunB, on, type) {
    var join;

    switch (type) {
        case consts.INNER_JOIN:
            join = innerJoin;
            break;
        case consts.LEFT_JOIN:
            join = leftJoin;
            break;
        case consts.RIGHT_JOIN:
            join = rightJoin;
            break;
        default:
            throw new TypeError("Relation compile() Invalid join " + type + " must be INNER_JOIN, LEFT_JOIN, or RIGHT_JOIN");
    }

    return function runJoin(callback) {
        relationRunA(function onRelationRunA(error, resultsA) {
            if (error) {
                callback(error);
            } else {
                relationRunB(function onRelationRunB(error, resultsB) {
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
