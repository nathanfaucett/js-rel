var Relation = require("./Relation"),
    Arg = require("./Relation/Arg"),
    Attribute = require("./Table/Attribute"),
    Type = require("./Table/Type");


var rel = exports;


rel.consts = require("./consts");
rel.createTable = require("./createTable");
rel.arg = Arg.create;
rel.MemoryAdapter = require("./MemoryAdapter");

rel.isRelation = Relation.isRelation;
rel.isArg = Arg.isArg;
rel.isAttribute = Attribute.isAttribute;
rel.isType = Type.isType;
