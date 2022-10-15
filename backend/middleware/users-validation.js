const { body } = require('express-validator/check');
const message = require('../utils/constants');

// constants
const testEmail = 'test@test.com';
const emailDomains = ['gmail', 'yahoo'];

const schema = [
  body('email')
    .exists()
    .withMessage(message.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(message.NOT_VALID_EMAIL)
    .custom((value, { req }) => {
      if (!emailDomains.some((domain) => value.includes(domain))) {
        throw new Error(message.DOAMIN_NOT_ALLOWED);
      }

      if (value === testEmail) {
        throw new Error(message.FORBIDDEN_EMAIL);
      }
      return true;
    }),
  body('firstName')
    .exists()
    // .matches(/^[A-Za-z\s]+$/)
    .isAlpha()
    .withMessage(message.FIRST_NAME_ONLY_STRING_CONTAINS)
    .custom((value, { req, location, path }) => {
      if (value.length > 30) {
        throw new Error(message.MAXIMUM_LENGTH(30));
      }

      if (value.length < 2) {
        throw new Error(message.MINIMUM_LENGTH(2));
      }
      return true;
    }),
  body('lastName')
    .exists()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage(message.LAST_ONLY_STRING_CONTAINS)
    .custom((value, { req }) => {
      if (value.length > 30) {
        throw new Error(message.MAXIMUM_LENGTH(30));
      }

      if (value.length < 2) {
        throw new Error(message.MINIMUM_LENGTH(2));
      }
      return true;
    }),
  body('username')
    .exists()
    .custom((value, { req }) => {
      if (value.length > 30) {
        throw new Error(message.MAXIMUM_LENGTH(30));
      }

      if (value.length < 2) {
        throw new Error(message.MINIMUM_LENGTH(2));
      }
      return true;
    }),
  body(['addressOne', 'street', 'city', 'state'])
    .exists()
    .custom((value, { req }) => {
      if (value.length > 70) {
        throw new Error(message.MAXIMUM_LENGTH(70));
      }

      if (value.length < 2) {
        throw new Error(message.MINIMUM_LENGTH(2));
      }
      return true;
    }),
];

module.exports = schema;
