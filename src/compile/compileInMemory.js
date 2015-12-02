var consts = require("../consts"),

    select = require("./select"),
    project = require("./project"),

    insert = require("./insert"),
    update = require("./update"),
    remove = require("./remove"),

    skip = require("./skip"),
    limit = require("./limit");


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
            return createInsert(notation.attributes, notation.values);
        case consts.UPDATE:
            return createUpdate(notation.attributes, notation.values, notation.where);
        case consts.REMOVE:
            return createRemove(notation);

        case consts.SKIP:
            return createSkip(notation);
        case consts.LIMIT:
            return createLimit(notation);

        default:
            throw new Error("Invalid in memory Relation operation " + relation.operation);
    }
}

function createFrom() {
    return function fromFunction(results) {
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

function createInsert(attributes, values) {
    var localInsert = insert;

    return function insert(results) {
        return localInsert(results, attributes, values);
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

function createSkip(count) {
    var localSkip = skip;

    return function skip(results) {
        return localSkip(results, count);
    };
}

function createLimit(count) {
    var localLimit = limit;

    return function limit(results) {
        return localLimit(results, count);
    };
}
