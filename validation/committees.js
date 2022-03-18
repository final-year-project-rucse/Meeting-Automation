const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : "";
    data.presidentName = !isEmpty(data.presidentName) ? data.presidentName : "";

    if (validator.isEmpty(data.title)) {
        errors.title = "title field is required";
    }
    if (!validator.isLength(data.title, { min: 5, max: 1000 })) {
        errors.title = "text  must be between 5 and 1000 character";
    }
    if (validator.isEmpty(data.presidentName)) {
        errors.presidentName = "presidentName is required";
    }
    if (!validator.isLength(data.presidentName, {
            min: 5,
            max: 100
        })) {
        errors.presidentName = "presidentName must be between 5 and 100 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};