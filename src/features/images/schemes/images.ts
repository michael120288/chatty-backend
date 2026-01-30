import Joi, { ObjectSchema } from 'joi';

const addImageSchema: ObjectSchema = Joi.object().keys({
  image: Joi.string().required().custom((value: string, helpers) => {
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
    } else {
      return helpers.error('string.invalidFormat');
    }
    return value;
  }).messages({
    'string.dataUrl': 'Image must be a valid data URL in format: data:image/[type];base64,[data]. Supported formats: png, jpeg, jpg, gif, webp, heic, heif',
    'string.emptyData': 'Image data URL cannot be empty',
    'string.uri': 'Image URL must be a valid HTTP/HTTPS URL',
    'string.invalidFormat': 'Image must be either a data URL or HTTP/HTTPS URL'
  })
});

export { addImageSchema };
