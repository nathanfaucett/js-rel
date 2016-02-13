module.exports = equalWhere;


function equalWhere(options, a, b, comparision) {
    switch (comparision) {
        case ">":
            return a > b;
        case "<":
            return a < b;
        case ">=":
            return a >= b;
        case "<=":
            return a <= b;
        case ">=":
            return a >= b;
        case "<=":
            return a <= b;
        case "!=":
            return a !== b;
        default:
            return a === b;
    }
}
