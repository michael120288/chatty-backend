import Joi, { ObjectSchema } from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(4).max(20).messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Username must be at least 4 characters',
    'string.max': 'Username cannot exceed 20 characters',
    'string.empty': 'Username is a required field',
  }),
  password: Joi.string().required().min(12).max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .messages({
      'string.base': 'Password must be of type string',
      'string.min': 'Password must be at least 12 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
      'string.empty': 'Password is a required field',
    }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Email must be valid',
    'string.empty': 'Email is a required field',
  }),
  avatarColor: Joi.string().required().messages({
    'any.required': 'Avatar color is required',
  }),
  avatarImage: Joi.string().required().messages({
    'any.required': 'Avatar image is required',
  }),
});

export { signupSchema };
