class Constraints {
    constructor(){
        this.constraints = {
            minimum: (columnName, min) => {
                return columnName + " >= " + min;
            }, 
            maximum: (columnName, max) => {
                return columnName + " <= " + max;
            }, 
            maxLength: (columnName, max) =>  {
                return "LENGTH(" + columnName + ") <= " + max;
            }
        };
    }

    buildConstraints(element, elementName) {
        let constraintsData = [];

        Object.keys(element).forEach((value) => {
            if (value === "maxLenght") {
                constraintsData.push(this.constraints["maxLength"](elementName, element[value]));
            }
            if (value === "minimum") {
                constraintsData.push(this.constraints["minimum"](elementName, element[value]));
            } 
            if (value === "maximum") {
                constraintsData.push(this.constraints["maximum"](elementName, element[value]));
            }
        });
        return (constraintsData.length === 0 ? null : "CHECK(" + constraintsData.join(" AND ") + ")");
    }
}

module.exports = Constraints;