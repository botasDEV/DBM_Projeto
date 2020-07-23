const isUrl = require('is-url');
const fileType = require('file-type');
const got = require('got');
const moment = require('momentjs');

const MONEY_KEYS = ["price", "money", "cost", "euro", "value"]; 

class Utils {

    static isImageUrl(url) {
        if (!isUrl(url)) return false;
        return (async () => {
            try {
                const stream = got.stream(url);
                const type = await fileType.fromStream(stream);
                return type.mime.includes("image");
            } catch(e) {
                return false;
            }
        })();
    }

    static formatValue(key, value) {
        if (key == "date" || Utils.isDate(value)) {
            return (moment(value)).format("YYYY-MM-DD");
        }

        if(Utils.isMoney(key, value)) {
            return value.toString().concat("€");
        }

        if (typeof value == "string") {
            return value.toUpperCase().replace("_", " ");
        }

        return value;
    }

    static isDate(value) {
        return ((typeof value) == "string" && !((new Date(value)).toString().includes("Invalid Date")));
    }

    static isMoney(key, value) {
        return (!isNaN(value) && MONEY_KEYS.includes(key));
    }
}

module.exports = Utils;