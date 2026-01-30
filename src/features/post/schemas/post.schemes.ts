import Joi, { ObjectSchema } from 'joi';

// Custom validator for image data URLs
const imageValidator = (value: string, helpers: any) => {
  // Check if it's a data URL (base64)
  if (value.startsWith('data:')) {
    // Validate data URL format: data:image/[type];base64,[data]
    // Support common formats including HEIC/HEIF used by Apple devices
    const dataUrlPattern = /^data:image\/(png|jpeg|jpg|gif|webp|heic|heif);base64,[\w+/=]+$/;
    if (!dataUrlPattern.test(value)) {
      return helpers.error('string.dataUrl');
    }
    // Check if the base64 data is not empty
    const base64Data = value.split(',')[1];
    if (!base64Data || base64Data.length === 0) {
      return helpers.error('string.emptyData');
    }
  } else if (value.startsWith('http://') || value.startsWith('https://')) {
    // Validate regular URL format
    try {
      new URL(value);
    } catch {
      return helpers.error('string.uri');
    }
  } else if (value) {
    // If there's a value but it's not a data URL or HTTP URL, it's invalid
    return helpers.error('string.invalidFormat');
  }
  return value;
};

const postSchema: ObjectSchema = Joi.object().keys({
  post: Joi.string().optional().allow(null, ''),
  bgColor: Joi.string().optional().allow(null, ''),
  privacy: Joi.string().optional().allow(null, ''),
  feelings: Joi.string().optional().allow(null, ''),
  gifUrl: Joi.string().optional().allow(null, ''),
  profilePicture: Joi.string().optional().allow(null, ''),
  imgVersion: Joi.string().optional().allow(null, ''),
  imgId: Joi.string().optional().allow(null, ''),
  image: Joi.string().optional().allow(null, ''),
  video: Joi.string().optional().allow(null, ''),
  videoVersion: Joi.string().optional().allow(null, ''),
  videoId: Joi.string().optional().allow(null, '')
});

const postWithImageSchema: ObjectSchema = Joi.object().keys({
  image: Joi.string().required().custom(imageValidator).messages({
    'any.required': 'Image is a required field',
    'string.empty': 'Image property is not allowed to be empty',
    'string.dataUrl': 'Image must be a valid data URL in format: data:image/[type];base64,[data]. Supported formats: png, jpeg, jpg, gif, webp, heic, heif',
    'string.emptyData': 'Image data URL cannot be empty',
    'string.uri': 'Image URL must be a valid HTTP/HTTPS URL',
    'string.invalidFormat': 'Image must be either a data URL or HTTP/HTTPS URL'
  }),
  post: Joi.string().optional().allow(null, ''),
  video: Joi.string().optional().allow(null, ''),
  bgColor: Joi.string().optional().allow(null, ''),
  privacy: Joi.string().optional().allow(null, ''),
  feelings: Joi.string().optional().allow(null, ''),
  gifUrl: Joi.string().optional().allow(null, ''),
  profilePicture: Joi.string().optional().allow(null, ''),
  imgVersion: Joi.string().optional().allow(null, ''),
  imgId: Joi.string().optional().allow(null, ''),
  videoVersion: Joi.string().optional().allow(null, ''),
  videoId: Joi.string().optional().allow(null, '')
});

const postWithVideoSchema: ObjectSchema = Joi.object().keys({
  video: Joi.string().required().messages({
    'any.required': 'Video is required',
    'string.empty': 'Video property is not allowed to be empty'
  }),
  image: Joi.string().optional().allow(null, ''),
  post: Joi.string().optional().allow(null, ''),
  bgColor: Joi.string().optional().allow(null, ''),
  privacy: Joi.string().optional().allow(null, ''),
  feelings: Joi.string().optional().allow(null, ''),
  gifUrl: Joi.string().optional().allow(null, ''),
  profilePicture: Joi.string().optional().allow(null, ''),
  imgVersion: Joi.string().optional().allow(null, ''),
  imgId: Joi.string().optional().allow(null, ''),
  videoVersion: Joi.string().optional().allow(null, ''),
  videoId: Joi.string().optional().allow(null, '')
});

export { postSchema, postWithImageSchema, postWithVideoSchema };