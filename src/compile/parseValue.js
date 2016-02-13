var Arg = require("../Relation/Arg");


var isArg = Arg.isArg;


module.exports = parseValue;


function parseValue(options, value) {
    if (isArg(value)) {
        return value.parse(options);
    } else {
        return value;
    }
}
