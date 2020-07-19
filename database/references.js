const fs = require("fs");
const mustache = require("mustache");


var Referece = () => {
    this.referenceType = "";
}

Referece.prototype = {
    setStrategy: (referenceType) => {
        this.referenceType = referenceType;
    },
    getQuery: (modelName, reference) => {
        return this.referenceType.getQuery(reference);
    }
}

var ReferenceType = (relation) => {
    return (relation == '1-1' ? 
        new OneToOne() : relation == '1-M' ?
            new OneToM() : relation == 'M-M' ?
                new MToM() : null
    );
}

var OneToOne = function() {
    this.getQuery = (modelName, reference) => {
        let view = {
            tableName: modelName,
            relatedTableLowerCase: reference.model.toLowerCase(),
            primaryKey: "id",
            relatedTable: reference.model,
            indexName: modelName + reference.model + 'UniqueIndex'
        };

        var template = fs.readFileSync('database/relation1To1.mustache').toString();
        return mustache.render(template, view);
    }
}


var OneToM = function() {
    this.getQuery = (modelName, reference) => {
        let view = {
            tableName: modelName,
            relatedTableLowerCase: reference.model.toLowerCase(),
            primaryKey: "id",
            relatedTable: reference.model
        };

        var template = fs.readFileSync('database/relation1ToM.mustache').toString();
        return mustache.render(template, view);
    }
}


var MToM = function() {
    this.getQuery = (modelName, reference) => {
        let firstTableName = (modelName.toLowerCase() < reference.model.toLowerCase() ? modelName : reference.model);
        let secondTableName = (firstTableName == modelName ? reference.model : modelName);

        let view = {
            firstTableName: firstTableName,
            secondTableName: secondTableName,
            firstTableNameLowerCase: firstTableName.toLowerCase(),
            secondTableNameLowerCase: secondTableName.toLowerCase(),
            primaryKey: 'id'
        };

        var template = fs.readFileSync('database/relationMToM.mustache').toString();
        return mustache.render(template, view);
    }
}

module.exports = {
    reference: Referece,
    referenceType: ReferenceType,
    oneToOne: OneToOne,
    oneToM: OneToM,
    mToM: MToM
}