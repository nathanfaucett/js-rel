var consts = require("../consts"),

    select = require("./select"),
    project = require("./project"),

    insert = require("./insert"),
    update = require("./update"),
    remove = require("./remove"),

    skip = require("./skip"),
    limit = require("./limit"),

    order = require("./order"),
    orderBy = require("./orderBy");


module.exports = compileInMemory;


function compileInMemory(relations) {
    var i = -1,
        il = relations.length - 1,
        stack = [];

    while (i++ < il) {
        stack[stack.length] = compileStatement(relations[i]);
    }

    return function run(options, results, callback) {
        var i = -1,
            il = stack.length - 1;

        while (i++ < il) {
            results = stack[i](options, results);
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

        case consts.ORDER:
            return createOrder(notation);
        case consts.ORDER_BY:
            return createOrderBy(notation);

        default:
            throw new Error("Invalid in memory Relation operation " + relation.operation);
    }
}

function createFrom() {
    return function fromFunction(options, results) {
        return results;
    };
}

function createSelect(where) {
    var localSelect = select;

    return function select(options, results) {
        return localSelect(options, results, where);
    };
}

function createProject(what) {
    var localProject = project;

    return function project(options, results) {
        return localProject(options, results, what);
    };
}

function createInsert(attributes, values) {
    var localInsert = insert;

    return function insert(options, results) {
        return localInsert(options, results, attributes, values);
    };
}

function createUpdate(attributes, values, where) {
    var localUpdate = update;

    return function update(options, results) {
        return localUpdate(options, results, attributes, values, where);
    };
}

function createRemove(where) {
    var localRemove = remove;

    return function remove(options, results) {
        return localRemove(options, results, where);
    };
}

function createSkip(count) {
    var localSkip = skip;

    return function skip(options, results) {
        return localSkip(options, results, count);
    };
}

function createLimit(count) {
    var localLimit = limit;

    return function limit(options, results) {
        return localLimit(options, results, count);
    };
}

function createOrder(by) {
    var localOrder = order;

    return function order(options, results) {
        return localOrder(options, results, by);
    };
}

function createOrderBy(by) {
    var localOrderBy = orderBy;

    return function orderBy(options, results) {
        return localOrderBy(options, results, by);
    };
}
