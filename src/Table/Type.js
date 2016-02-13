var TypePrototype;


module.exports = Type;


function Type(column) {
    this.type = column.type;
}
TypePrototype = Type.prototype;

TypePrototype.__isType__ = true;

Type.isType = function(value) {
    return value && value.__isType__;
};

TypePrototype.toString = function() {
    return this.name;
};
