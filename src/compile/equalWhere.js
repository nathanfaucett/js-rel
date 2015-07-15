module.exports = equalWhere;


function equalWhere(a, b, comparision, typeA, typeB) {
    if (typeA !== typeB) {
        return false;
    } else {
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
}
