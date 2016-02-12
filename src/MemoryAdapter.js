var has = require("has"),
    compile = require("./compile");


var MemoryAdapterPrototype;


module.exports = MemoryAdapter;


function MemoryAdapter() {
    this.__tables = {};
    this.__tableSchema = {};
}
MemoryAdapterPrototype = MemoryAdapter.prototype;

MemoryAdapterPrototype.connect = function(callback) {
    process.nextTick(callback);
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

MemoryAdapterPrototype.createRow = function(tableName, values) {
    var localHas = has,
        table = this.__tables[tableName],
        tableSchema = this.__tableSchema[tableName],
        row = {},
        key;

    for (key in values) {
        if (localHas(tableSchema, key)) {
            row[tableName + "." + key] = values[key];
        } else {
            throw new Error("MemoryAdapter.createRow: table does not have column with name " + key);
        }
    }
    table[table.length] = row;

    return this;
};

MemoryAdapterPrototype.compile = function(from, relation, relations) {
    var tables = this.__tables;
    return compile(tables, from, tables[from.tableName], relations);
};
