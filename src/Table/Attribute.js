var AttributePrototype;


module.exports = Attribute;


function Attribute(name) {
    this.name = name;
}
AttributePrototype = Attribute.prototype;

AttributePrototype.__isAttribute__ = true;

Attribute.isType = function(value) {
    return value && value.__isAttribute__;
};

AttributePrototype.toString = function() {
    return this.name;
};
