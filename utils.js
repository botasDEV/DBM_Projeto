class Utils {

    // Transforms any snake_case or kebab-case to camelCase
    static toCamelCase(str) {
        if (typeof str !== 'string') throw 'The argument STR must be a STRING';

        return str.replace(
            /([-_][a-z])/g,
            (group) => group.toUpperCase()
                            .replace('-', '')
                            .replace('_', '')
        );
    }
}

module.exports = Utils;