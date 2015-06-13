var consts = require("../consts"),

    select = require("./select"),
    project = require("./project"),

    insert = require("./insert"),
    update = require("./update"),
    remove = require("./remove"),

    innerJoin = require("./innerJoin"),
    leftJoin = require("./leftJoin"),
    rightJoin = require("./rightJoin");


module.exports = compile;


function compile(tables, from, results, relations) {
    var i = -1,
        il = relations.length - 1,
        stack = [];

    while (i++ < il) {
        stack[stack.length] = compileStatement(tables, from, relations[i]);
    }

    return function run(callback) {
        var i = -1,
            il = stack.length - 1,
            localResults = results;

        while (i++ < il) {
            localResults = stack[i](localResults);
        }

        process.nextTick(function() {
            callback(undefined, localResults);
        });
    };
}

function compileStatement(tables, from, relation) {
    var notation = relation.notation;

    switch (relation.operation) {

        case consts.SELECT:
            return createSelect(notation);
        case consts.PROJECT:
            return createProject(notation);

        case consts.INSERT:
            return createInsert(tables, from, notation);
        case consts.UPDATE:
            return createUpdate(tables, from, notation.attributes, notation.values, notation.where);
        case consts.REMOVE:
            return createRemove(tables, from, notation);

        case consts.INNER_JOIN:
            return createInnerJoin(tables, notation.relation.notation, notation.on);
        case consts.LEFT_JOIN:
            return createLeftJoin(tables, notation.relation.notation, notation.on);
        case consts.RIGHT_JOIN:
            return createRightJoin(tables, notation.relation.notation, notation.on);

        default:
            return createFrom();
    }
}

function createFrom() {
    return function from(results) {
        return results;
    };
}

function createSelect(where) {
    var localSelect = select;

    return function select(results) {
        return localSelect(results, where);
    };
}

function createProject(what) {
    var localProject = project;

    return function project(results) {
        return localProject(results, what);
    };
}

function createInsert(tables, from, rows) {
    var localInsert = insert;

    return function insert(results) {
        if (results === tables[from]) {
            return (tables[from] = localInsert(results, rows));
        } else {
            return localInsert(results, rows);
        }
    };
}

function createUpdate(tables, from, attributes, values, where) {
    var localUpdate = update;

    return function update(results) {
        if (results === tables[from]) {
            return (tables[from] = localUpdate(results, attributes, values, where));
        } else {
            return localUpdate(results, attributes, values, where);
        }
    };
}

function createRemove(tables, from, where) {
    var localRemove = remove;

    return function remove(results) {
        if (results === tables[from]) {
            return (tables[from] = localRemove(results, where));
        } else {
            return localRemove(results, where);
        }
    };
}

function createInnerJoin(tables, from, on) {
    var localInnerJoin = innerJoin;

    return function innerJoin(results) {
        return localInnerJoin(results, tables[from], on);
    };
}

function createLeftJoin(tables, from, on) {
    var localLeftJoin = leftJoin;

    return function leftJoin(results) {
        return localLeftJoin(results, tables[from], on);
    };
}

function createRightJoin(tables, from, on) {
    var localRightJoin = rightJoin;

    return function rightJoin(results) {
        return localRightJoin(results, tables[from], on);
    };
}
