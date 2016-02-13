var parseValue = require("./parseValue");


module.exports = equalWhere;


function equalWhere(options, a, b, comparision) {
    switch (comparision) {
        case ">":
            return parseValue(options, a) > parseValue(options, b);
        case "<":
            return parseValue(options, a) < parseValue(options, b);
        case ">=":
            return parseValue(options, a) >= parseValue(options, b);
        case "<=":
            return parseValue(options, a) <= parseValue(options, b);
        case ">=":
            return parseValue(options, a) >= parseValue(options, b);
        case "<=":
            return parseValue(options, a) <= parseValue(options, b);
        case "!=":
            return parseValue(options, a) !== parseValue(options, b);
        default:
            return parseValue(options, a) === parseValue(options, b);
    }
}
