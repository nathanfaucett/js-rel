var consts = require("../consts"),

    select = require("./select"),
    project = require("./project"),

    insert = require("./insert"),
    update = require("./update"),
    remove = require("./remove");


module.exports = compileInMemory;


function compileInMemory(relations) {
    var i = -1,
        il = relations.length - 1,
        stack = [];

    while (i++ < il) {
        stack[stack.length] = compileStatement(relations[i]);
    }

    return function run(results, callback) {
        var i = -1,
            il = stack.length - 1;

        while (i++ < il) {
            results = stack[i](results);
        }

        callback(undefined, results);
    };
}

function compileStatement(relation) {
    var notation = relation.notation;

    switch (relation.operation) {

        case consts.FROM:
            return createFrom();
        case consts.SELECT:
            return createSelect(notation);
        case consts.PROJECT:
            return createProject(notation);

        case consts.INSERT:
            return createInsert(notation);
        case consts.UPDATE:
            return createUpdate(notation.attributes, notation.values, notation.where);
        case consts.REMOVE:
            return createRemove(notation);

        default:
            throw new Error("Invalid Relation operation " + relation.operation);
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

function createInsert(rows) {
    var localInsert = insert;

    return function insert(results) {
        return localInsert(results, rows);
    };
}

function createUpdate(attributes, values, where) {
    var localUpdate = update;

    return function update(results) {
        return localUpdate(results, attributes, values, where);
    };
}

function createRemove(where) {
    var localRemove = remove;

    return function remove(results) {
        return localRemove(results, where);
    };
}
