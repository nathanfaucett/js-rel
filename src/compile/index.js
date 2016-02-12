var arrayMap = require("array-map"),
    arrayFilter = require("array-filter"),

    consts = require("../consts"),

    rowEqualWhere = require("./rowEqualWhere"),
    updateRow = require("./updateRow"),
    mergeArray = require("./mergeArray"),

    select = require("./select"),
    project = require("./project"),

    insert = require("./insert"),

    skip = require("./skip"),
    limit = require("./limit"),

    order = require("./order"),
    orderBy = require("./orderBy"),

    innerJoin = require("./innerJoin"),
    leftJoin = require("./leftJoin"),
    rightJoin = require("./rightJoin");


module.exports = compile;


function compile(tables, fromTable, results, relations) {
    var i = -1,
        il = relations.length - 1,
        stack = [];

    while (i++ < il) {
        stack[stack.length] = compileStatement(tables, fromTable, relations[i]);
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

function compileStatement(tables, fromTable, relation) {
    var notation = relation.notation;

    switch (relation.operation) {

        case consts.SELECT:
            return createSelect(notation);
        case consts.PROJECT:
            return createProject(notation);

        case consts.INSERT:
            return createInsert(tables, fromTable, notation.attributes, notation.values);
        case consts.UPDATE:
            return createUpdate(tables, fromTable, notation.attributes, notation.values, notation.where);
        case consts.REMOVE:
            return createRemove(tables, fromTable, notation);

        case consts.SKIP:
            return createSkip(notation);
        case consts.LIMIT:
            return createLimit(notation);

        case consts.ORDER:
            return createOrder(notation);
        case consts.ORDER_BY:
            return createOrderBy(notation);

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
    return function fromTable(results) {
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

function createInsert(tables, fromTable, attributes, values) {
    var localInsert = insert,
        tableName = fromTable.tableName;

    return function insert(results) {
        var newRows = localInsert([], attributes, values);

        if (results === tables[tableName]) {
            tables[tableName] = mergeArray(results, newRows);
        }

        return newRows;
    };
}

function createUpdate(tables, fromTable, attributes, values, where) {
    var tableName = fromTable.tableName;

    return function update(results) {
        var updatedRows;

        if (results === tables[tableName]) {
            updatedRows = [];

            tables[tableName] = arrayMap(results, function mapUpdateRow(row) {
                var updatedRow;

                if (rowEqualWhere(row, where)) {
                    updatedRow = updateRow(row, attributes, values);
                    updatedRows[updatedRows.length] = updatedRow;
                    return updatedRow;
                } else {
                    return row;
                }
            });

            return updatedRows;
        } else {
            return arrayMap(
                arrayFilter(results, function filterWhere(row) {
                    return rowEqualWhere(row, where);
                }),
                function updateRow(row) {
                    return updateRow(row, attributes, values);
                }
            );
        }
    };
}

function createRemove(tables, fromTable, where) {
    var tableName = fromTable.tableName;

    return function remove(results) {
        var removedRows;

        if (results === tables[tableName]) {
            removedRows = [];

            tables[tableName] = arrayFilter(results, function filterRemoveRow(row) {
                if (rowEqualWhere(row, where)) {
                    removedRows[removedRows.length] = row;
                    return false;
                } else {
                    return true;
                }
            });

            return removedRows;
        } else {
            return arrayFilter(results, function filterWhere(row) {
                return rowEqualWhere(row, where);
            });
        }
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

function createOrder(by) {
    var localOrder = order;

    return function order(results) {
        return localOrder(results, by);
    };
}

function createOrderBy(by) {
    var localOrderBy = orderBy;

    return function orderBy(results) {
        return localOrderBy(results, by);
    };
}

function createInnerJoin(tables, fromTable, on) {
    var localInnerJoin = innerJoin;

    return function innerJoin(results) {
        return localInnerJoin(results, tables[fromTable], on);
    };
}

function createLeftJoin(tables, fromTable, on) {
    var localLeftJoin = leftJoin;

    return function leftJoin(results) {
        return localLeftJoin(results, tables[fromTable], on);
    };
}

function createRightJoin(tables, fromTable, on) {
    var localRightJoin = rightJoin;

    return function rightJoin(results) {
        return localRightJoin(results, tables[fromTable], on);
    };
}
