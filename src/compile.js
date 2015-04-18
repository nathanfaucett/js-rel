var isString = require("is_string"),
    consts = require("./consts");


module.exports = compile;


function compile(relation, adaptor) {
    return adaptor.compile(compileRelation(relation, []));
}

function compileRelation(relation, stack) {
    switch (relation.operation) {
        case consts.SELECT:
            return compileSelectRelation(relation, stack);
        case consts.PROJECT:
            return compileProjectRelation(relation, stack);
        default:
            throw new TypeError("invalid relation operation " + relation.operation);
    }
}

function compileSelectRelation(relation, stack) {
    var notation = relation.notation,
        from = notation.from;

    stack[stack.length] = relation;

    if (isString(from)) {
        return stack;
    } else {
        return compileRelation(from, stack);
    }
}

function compileProjectRelation(relation, stack) {
    var notation = relation.notation,
        from = notation.from;

    stack[stack.length] = relation;

    if (isString(from)) {
        throw new TypeError("compile project() cannot project from string, must be relation");
    } else {
        return compileRelation(from, stack);
    }
}
