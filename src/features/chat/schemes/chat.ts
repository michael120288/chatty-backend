import Joi, { ObjectSchema } from 'joi';

const addChatSchema: ObjectSchema = Joi.object().keys({
  conversationId: Joi.string().optional().allow(null, ''),
  receiverId: Joi.string().required(),
  receiverUsername: Joi.string().required(),
  receiverAvatarColor: Joi.string().required(),
  receiverProfilePicture: Joi.string().required().allow(''),
  body: Joi.string().optional().allow(null, ''),
  gifUrl: Joi.string().optional().allow(null, ''),
  selectedImage: Joi.string().optional().allow(null, ''),
  isRead: Joi.boolean().optional()
});

const markChatSchema: ObjectSchema = Joi.object().keys({
  senderId: Joi.string().required(),
  receiverId: Joi.string().required()
});

const chatUsersSchema: ObjectSchema = Joi.object().keys({
  userOne: Joi.string().required(),
  userTwo: Joi.string().required()
});

const messageReactionSchema: ObjectSchema = Joi.object().keys({
  conversationId: Joi.string().required(),
  messageId: Joi.string().required(),
  reaction: Joi.string().required(),
  type: Joi.string().valid('add', 'remove').required()
});

export { addChatSchema, markChatSchema, chatUsersSchema, messageReactionSchema };
