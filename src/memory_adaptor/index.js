var has = require("has"),
    singularize = require("singularize"),
    consts = require("../consts"),
    select = require("./select"),
    project = require("./project");


var MemoryAdapterPrototype;


require("inflections_en");


module.exports = MemoryAdapter;


function MemoryAdapter(locale) {

    this.locale = locale || "en";

    this.__tables = {};
    this.__tableSchema = {};
}
MemoryAdapterPrototype = MemoryAdapter.prototype;
MemoryAdapterPrototype.type = "MemoryAdapter";

MemoryAdapterPrototype.connect = function(callback) {
    process.nextTick(function() {
        callback();
    });
    return this;
};

MemoryAdapterPrototype.close = function() {
    return this;
};

MemoryAdapterPrototype.createTable = function(tableName, columns) {
    var tables = this.__tables,
        tableSchema = this.__tableSchema;

    tables[tableName] = [];
    tableSchema[tableName] = columns;

    return this;
};

MemoryAdapterPrototype.createRow = function(tableName, values, locale) {
    var table = this.__tables[tableName],
        tableSchema = this.__tableSchema[tableName],
        singularName = singularize(tableName, locale || this.locale),
        row = {},
        key;

    for (key in values) {
        if (has(tableSchema, key)) {
            row[singularName + "." + key] = values[key];
        }
    }
    table[table.length] = row;

    return this;
};

MemoryAdapterPrototype.compile = function(queries) {
    var i = queries.length,
        stack = [];

    while (i--) {
        stack[stack.length] = this.compileStatement(queries[i]);
    }

    return function(callback) {
        var i = -1,
            il = stack.length - 1,
            results = null;

        while (i++ < il) {
            results = stack[i](results);
        }

        process.nextTick(function() {
            callback(undefined, results);
        });
    };
};

MemoryAdapterPrototype.compileStatement = function(relation) {
    switch (relation.operation) {
        case consts.SELECT:
            return createSelect(relation.notation, this.__tables);
        case consts.PROJECT:
            return createProject(relation.notation);
        default:
            return function(results) {
                return results;
            };
    }
};

function createSelect(notation, tables) {
    var from = notation.from,
        where = notation.where,
        localSelect = select;

    if (from !== null) {
        return function select() {
            return localSelect(tables[from], where);
        };
    } else {
        return function select(results) {
            return localSelect(results, where);
        };
    }
}

function createProject(notation) {
    var what = notation.what,
        localProject = project;

    return function project(results) {
        return localProject(results, what);
    };
}
