const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateProjectInput = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Title cannot be empty'),
    handleValidationErrors
];

module.exports = validateProjectInput
