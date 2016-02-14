var has = require("has"),
    isString = require("is_string");


var ArgPrototype;


module.exports = Arg;


function Arg(name) {
    this.name = name;
}
ArgPrototype = Arg.prototype;

ArgPrototype.__isArg__ = true;

Arg.isArg = function(value) {
    return value && value.__isArg__;
};

Arg.create = function(name) {
    if (!isString(name)) {
        throw new Error("Arg(name: String) name must be a string");
    } else {
        return new Arg(name);
    }
};

ArgPrototype.parse = function(options) {
    var name = this.name;

    if (has(options, name)) {
        return options[name];
    } else {
        throw new Error("Arg.parse(options: Object) no argument for " + name + " passed to options");
    }
};
