module.exports = {
  'name': { //
    //optional: true, // won't validate if field is empty
    notEmpty: true,
    isAlpha: {
      errorMessage: 'Should contain Alphabets only'
    },
    isLength: {
      options: [{ min: 2, max: 50 }],
      errorMessage: 'Must be between 2 and 50 chars long' // Error message for the validator, takes precedent over parameter message
    },
  },
  'email': {
    //optional: true,
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    },
    isLength: {
      options: [{ min: 2, max: 50 }],
      errorMessage: 'Must be between 2 and 50 chars long' // Error message for the validator, takes precedent over parameter message
    },
  },
  'phone': {
    //optional: true,
    notEmpty: true,
    isNumeric: {
      errorMessage: 'Should contain Numbers only'
    },
    isLength: {
      options: [{ min: 2, max: 20 }],
      errorMessage: 'Must be between 2 and 20 chars long' // Error message for the validator, takes precedent over parameter message
    },
  },
  'message': {
    //optional: true,
    notEmpty: true,
    isLength: {
      options: [{ min: 2, max: 300 }],
      errorMessage: 'Must be between 2 and 300 chars long' // Error message for the validator, takes precedent over parameter message
    },
    errorMessage: 'Invalid Message'
  },
};
