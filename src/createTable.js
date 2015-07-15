var has = require("has"),
    indexOf = require("index_of"),
    isString = require("is_string"),
    consts = require("./consts"),
    Relation = require("./Relation");


var TYPES = [
    "string",
    "number",
    "bool",
    "date"
];


module.exports = createTable;


function createTable(tableName, columns) {
    if (!isString(tableName)) {
        throw new TypeError("createTable(tableName, columns) tableName must be a String");
    }

    function table(adapter) {
        return new Relation(null, consts.FROM, table, table, adapter);
    }

    table.tableName = tableName;

    table.types = {};
    table.attributes = {};

    parseAttributes(table, columns);

    return table;
}

function parseAttributes(table, columns) {
    var localHas = has,
        tableName = table.tableName,
        types = table.types,
        attributes = table.attributes,
        columnName, fullColumnName;

    for (columnName in columns) {
        if (localHas(columns, columnName)) {
            fullColumnName = tableName + "." + columnName;

            attributes[columnName] = fullColumnName;
            types[fullColumnName] = parseColumnType(columns[columnName]);
        }
    }
}

function parseColumnType(type) {
    var lowerCaseType = type.toLowerCase();

    if (indexOf(TYPES, lowerCaseType) === -1) {
        throw new TypeError("Table(tableName, column) unsupported type " + type);
    } else {
        return lowerCaseType;
    }
}
