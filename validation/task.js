const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateTaskInput = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Title cannot be empty'),
    check('deadline')
        .exists({ checkFalsy: true })
        .withMessage('deadline cannot be empty'),
    check('priority')
        .exists({ checkFalsy: true })
        .withMessage('priority cannot be empty'),
    handleValidationErrors
];

module.exports = validateTaskInput