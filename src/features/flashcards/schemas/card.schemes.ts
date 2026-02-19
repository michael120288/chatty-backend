import Joi, { ObjectSchema } from 'joi';

// Custom validator for image data URLs
const imageValidator = (value: string, helpers: any) => {
  if (value.startsWith('data:')) {
    const dataUrlPattern = /^data:image\/(png|jpeg|jpg|gif|webp|heic|heif);base64,[\w+/=]+$/;
    if (!dataUrlPattern.test(value)) {
      return helpers.error('string.dataUrl');
    }
    const base64Data = value.split(',')[1];
    if (!base64Data || base64Data.length === 0) {
      return helpers.error('string.emptyData');
    }
  } else if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      new URL(value);
    } catch {
      return helpers.error('string.uri');
    }
  } else if (value) {
    return helpers.error('string.invalidFormat');
  }
  return value;
};

const cardCategories = [
  'JavaScript',
  'React',
  'Vue',
  'Angular',
  'Node.js',
  'Python',
  'Java',
  'Go',
  'Rust',
  'Database',
  'SQL',
  'MongoDB',
  'Redis',
  'System Design',
  'DSA',
  'Algorithms',
  'AWS',
  'DevOps',
  'Docker',
  'Kubernetes',
  'Other'
];

const cardSchema: ObjectSchema = Joi.object().keys({
  question: Joi.string().required().min(1).max(1000).messages({
    'any.required': 'Question is required',
    'string.empty': 'Question cannot be empty',
    'string.min': 'Question must be at least 1 character',
    'string.max': 'Question cannot exceed 1000 characters'
  }),
  answer: Joi.string().required().min(1).max(5000).messages({
    'any.required': 'Answer is required',
    'string.empty': 'Answer cannot be empty',
    'string.min': 'Answer must be at least 1 character',
    'string.max': 'Answer cannot exceed 5000 characters'
  }),
  category: Joi.string().required().valid(...cardCategories).messages({
    'any.required': 'Category is required',
    'any.only': `Category must be one of: ${cardCategories.join(', ')}`
  }),
  questionCodeSnippet: Joi.string().optional().allow(null, ''),
  answerCodeSnippet: Joi.string().optional().allow(null, ''),
  privacy: Joi.string().optional().valid('public', 'private').default('public'),
  deckId: Joi.string().optional().allow(null, ''),
  difficulty: Joi.string().optional().valid('easy', 'medium', 'hard').allow(null, ''),
  profilePicture: Joi.string().optional().allow(null, '')
});

const cardWithImageSchema: ObjectSchema = Joi.object().keys({
  question: Joi.string().required().min(1).max(1000).messages({
    'any.required': 'Question is required',
    'string.empty': 'Question cannot be empty',
    'string.min': 'Question must be at least 1 character',
    'string.max': 'Question cannot exceed 1000 characters'
  }),
  answer: Joi.string().required().min(1).max(5000).messages({
    'any.required': 'Answer is required',
    'string.empty': 'Answer cannot be empty',
    'string.min': 'Answer must be at least 1 character',
    'string.max': 'Answer cannot exceed 5000 characters'
  }),
  category: Joi.string().required().valid(...cardCategories).messages({
    'any.required': 'Category is required',
    'any.only': `Category must be one of: ${cardCategories.join(', ')}`
  }),
  questionImage: Joi.string().optional().custom(imageValidator).allow(null, '').messages({
    'string.dataUrl': 'Question image must be a valid data URL',
    'string.emptyData': 'Question image data URL cannot be empty',
    'string.uri': 'Question image URL must be a valid HTTP/HTTPS URL',
    'string.invalidFormat': 'Question image must be either a data URL or HTTP/HTTPS URL'
  }),
  answerImage: Joi.string().optional().custom(imageValidator).allow(null, '').messages({
    'string.dataUrl': 'Answer image must be a valid data URL',
    'string.emptyData': 'Answer image data URL cannot be empty',
    'string.uri': 'Answer image URL must be a valid HTTP/HTTPS URL',
    'string.invalidFormat': 'Answer image must be either a data URL or HTTP/HTTPS URL'
  }),
  questionCodeSnippet: Joi.string().optional().allow(null, ''),
  answerCodeSnippet: Joi.string().optional().allow(null, ''),
  privacy: Joi.string().optional().valid('public', 'private').default('public'),
  deckId: Joi.string().optional().allow(null, ''),
  difficulty: Joi.string().optional().valid('easy', 'medium', 'hard').allow(null, ''),
  profilePicture: Joi.string().optional().allow(null, ''),
  questionImgVersion: Joi.string().optional().allow(null, ''),
  questionImgId: Joi.string().optional().allow(null, ''),
  answerImgVersion: Joi.string().optional().allow(null, ''),
  answerImgId: Joi.string().optional().allow(null, '')
});

const deckSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(1).max(200).messages({
    'any.required': 'Deck name is required',
    'string.empty': 'Deck name cannot be empty',
    'string.min': 'Deck name must be at least 1 character',
    'string.max': 'Deck name cannot exceed 200 characters'
  }),
  description: Joi.string().optional().max(1000).allow(null, ''),
  category: Joi.string().required().valid(...cardCategories).messages({
    'any.required': 'Category is required',
    'any.only': `Category must be one of: ${cardCategories.join(', ')}`
  }),
  privacy: Joi.string().optional().valid('public', 'private').default('public'),
  coverImgVersion: Joi.string().optional().allow(null, ''),
  coverImgId: Joi.string().optional().allow(null, '')
});

const cardCommentSchema: ObjectSchema = Joi.object().keys({
  cardId: Joi.string().required().messages({
    'any.required': 'Card ID is required',
    'string.empty': 'Card ID cannot be empty'
  }),
  comment: Joi.string().required().min(1).max(1000).messages({
    'any.required': 'Comment is required',
    'string.empty': 'Comment cannot be empty',
    'string.min': 'Comment must be at least 1 character',
    'string.max': 'Comment cannot exceed 1000 characters'
  })
});

export { cardSchema, cardWithImageSchema, deckSchema, cardCommentSchema, cardCategories };
