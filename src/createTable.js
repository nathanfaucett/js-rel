var has = require("has"),
    indexOf = require("index_of"),
    isString = require("is_string"),
    consts = require("./consts"),
    Relation = require("./Relation"),
    Attribute = require("./Table/Attribute"),
    Type = require("./Table/Type");


var TYPES = [
    "string",
    "number",
    "boolean",
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
            attributes[columnName] = new Attribute(fullColumnName);
            types[fullColumnName] = parseColumn(columns[columnName]);
        }
    }
}

function parseColumn(column) {
    var lowerCaseType;

    if (isString(column)) {
        column = {
            type: column
        }
    }
    lowerCaseType = (column.type || "").toLowerCase();

    if (indexOf(TYPES, lowerCaseType) === -1) {
        throw new TypeError("createTable(tableName, columns) unsupported type " + column.type);
    } else {
        column.type = lowerCaseType;
    }

    return new Type(column);
}
