var Arg = require("../Relation/Arg");


var isArg = Arg.isArg;


module.exports = parseOption;


function parseOption(options, value) {
    if (isArg(value)) {
        return value.parse(options);
    } else {
        return value;
    }
}
