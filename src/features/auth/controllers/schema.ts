import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

const SCHEMA = {
  description: 'Chatty API — all endpoints with validation rules. Use this to understand what each endpoint accepts and what errors it returns.',
  swagger_ui: 'https://api.codeandtest.com/api-docs',
  base_url: 'https://api.codeandtest.com/api/v1',
  auth: 'Session cookie (set-cookie after signin). Pass as Cookie header: Cookie: session=eyJ...',
  endpoints: [
    {
      method: 'POST', path: '/api/v1/signup', auth_required: false,
      description: 'Create a new account',
      fields: [
        { name: 'username', type: 'string', required: true, min: 4, max: 20, note: 'alphanumeric + underscores, must start with a letter' },
        { name: 'email',    type: 'string', required: true, format: 'valid email' },
        { name: 'password', type: 'string', required: true, min: 12, max: 128, pattern: 'must contain uppercase, lowercase, digit, and special char (@$!%*?&)' },
        { name: 'avatarColor', type: 'string', required: true, note: 'any non-empty string, e.g. "#4a90e2"' },
        { name: 'avatarImage', type: 'string', required: true, format: 'base64 data URL (data:image/png;base64,...)' },
      ],
      success: { status: 201, body: '{ message, token, user }' },
      errors: [
        { status: 400, message: 'Invalid username — too short/long or invalid format' },
        { status: 400, message: 'Invalid password — too short or missing required character types' },
        { status: 400, message: 'Email must be valid' },
        { status: 400, message: 'Username already exists' },
        { status: 400, message: 'Email already exists' },
        { status: 429, message: 'Too many requests — rate limited (5 req/min)' },
      ],
    },
    {
      method: 'POST', path: '/api/v1/signin', auth_required: false,
      description: 'Sign in with username and password. Sets a session cookie.',
      fields: [
        { name: 'username', type: 'string', required: true, min: 4, max: 32 },
        { name: 'password', type: 'string', required: true, min: 8, max: 128 },
      ],
      success: { status: 200, body: '{ message: "User login successfully", token, user }', headers: 'set-cookie: session=eyJ...' },
      errors: [
        { status: 400, message: 'Invalid credentials' },
        { status: 400, message: 'Invalid username' },
        { status: 400, message: 'Invalid password' },
        { status: 429, message: 'Too many requests — rate limited (5 req/min)' },
      ],
    },
    {
      method: 'POST', path: '/api/v1/signout', auth_required: true,
      description: 'Sign out — clears the session cookie.',
      fields: [],
      success: { status: 200, body: '{ message: "User logout successfully" }' },
      errors: [],
    },
    {
      method: 'GET', path: '/api/v1/currentuser', auth_required: true,
      description: 'Get the currently authenticated user.',
      fields: [],
      success: { status: 200, body: '{ token, user: { _id, username, email, avatarColor, profilePicture, uId, ... } }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'PUT', path: '/api/v1/user/profile', auth_required: true,
      description: 'Update profile fields (basic info).',
      fields: [
        { name: 'quote',    type: 'string', required: false },
        { name: 'work',     type: 'string', required: false },
        { name: 'school',   type: 'string', required: false },
        { name: 'location', type: 'string', required: false },
      ],
      success: { status: 200, body: '{ message: "Updated successfully", user }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'POST', path: '/api/v1/post', auth_required: true,
      description: 'Create a text post. Returns only a message — no post ID. Use GET /post/all/1 to find it.',
      fields: [
        { name: 'post',     type: 'string', required: false, note: 'post text content' },
        { name: 'bgColor',  type: 'string', required: false },
        { name: 'feelings', type: 'string', required: false },
        { name: 'privacy',  type: 'string', required: false, enum: ['Public', 'Followers', 'Private'] },
        { name: 'gifUrl',   type: 'string', required: false },
      ],
      success: { status: 201, body: '{ message: "Post created successfully" }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'GET', path: '/api/v1/post/all/:page', auth_required: true,
      description: 'Paginated post feed. Page 1 = most recent 10 posts.',
      fields: [
        { name: 'page', type: 'number', in: 'path', required: true, min: 1, note: 'page number, starts at 1' },
      ],
      success: { status: 200, body: '{ message, posts: [...], totalPosts }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'PATCH', path: '/api/v1/post/:postId', auth_required: true,
      description: 'Update a post. Only the owner can update.',
      fields: [
        { name: 'postId',   type: 'string', in: 'path', required: true, format: '24-char hex MongoDB ObjectId' },
        { name: 'post',     type: 'string', required: false },
        { name: 'bgColor',  type: 'string', required: false },
        { name: 'feelings', type: 'string', required: false },
        { name: 'privacy',  type: 'string', required: false },
      ],
      success: { status: 200, body: '{ message: "Post updated successfully" }' },
      errors: [
        { status: 400, message: 'Invalid request — bad ObjectId format' },
        { status: 401, message: 'Not authenticated' },
        { status: 403, message: 'Not the post owner' },
      ],
    },
    {
      method: 'DELETE', path: '/api/v1/post/:postId', auth_required: true,
      description: 'Delete a post. Only the owner can delete.',
      fields: [
        { name: 'postId', type: 'string', in: 'path', required: true, format: '24-char hex MongoDB ObjectId' },
      ],
      success: { status: 200, body: '{ message: "Post deleted successfully" }' },
      errors: [
        { status: 400, message: 'Invalid request — bad ObjectId format' },
        { status: 401, message: 'Not authenticated' },
      ],
    },
    {
      method: 'POST', path: '/api/v1/post/comment', auth_required: true,
      description: 'Add a comment to a post.',
      fields: [
        { name: 'postId',  type: 'string', required: true, format: '24-char hex MongoDB ObjectId' },
        { name: 'comment', type: 'string', required: true },
      ],
      success: { status: 201, body: '{ message: "Your comment has been added" }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'GET', path: '/api/v1/post/comments/:postId', auth_required: true,
      description: 'Get all comments for a post.',
      fields: [
        { name: 'postId', type: 'string', in: 'path', required: true, format: '24-char hex MongoDB ObjectId' },
      ],
      success: { status: 200, body: '{ message, comments: [...] }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'POST', path: '/api/v1/post/reaction', auth_required: true,
      description: 'Add or change a reaction on a post.',
      fields: [
        { name: 'postId',          type: 'string', required: true },
        { name: 'type',            type: 'string', required: true, enum: ['like','love','haha','wow','sad','angry'] },
        { name: 'previousReaction', type: 'string', required: false, note: 'pass your existing reaction if swapping' },
        { name: 'postReactions',   type: 'object', required: true, note: 'current reaction counts: { like, love, haha, wow, sad, angry }' },
        { name: 'profilePicture',  type: 'string', required: false },
      ],
      success: { status: 200, body: '{ message: "Reaction added" }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'DELETE', path: '/api/v1/post/reaction/:postId/:previousReaction/:postReactions', auth_required: true,
      description: 'Remove a reaction. postReactions must be encodeURIComponent(JSON.stringify({like,love,...})).',
      fields: [
        { name: 'postId',           type: 'string', in: 'path', required: true },
        { name: 'previousReaction', type: 'string', in: 'path', required: true, enum: ['like','love','haha','wow','sad','angry'] },
        { name: 'postReactions',    type: 'string', in: 'path', required: true, note: 'URL-encoded JSON string of reaction counts' },
      ],
      success: { status: 200, body: '{ message: "Reaction removed" }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'PUT', path: '/api/v1/user/follow/:followerId', auth_required: true,
      description: 'Follow a user.',
      fields: [{ name: 'followerId', type: 'string', in: 'path', required: true, format: 'MongoDB _id of the user to follow' }],
      success: { status: 200, body: '{ message: "Following user" }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'DELETE', path: '/api/v1/user/unfollow/:followeeId/:followerId', auth_required: true,
      description: 'Unfollow a user. Requires both the followee and follower IDs.',
      fields: [
        { name: 'followeeId', type: 'string', in: 'path', required: true },
        { name: 'followerId', type: 'string', in: 'path', required: true },
      ],
      success: { status: 200, body: '{ message: "Unfollowed user" }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'GET', path: '/api/v1/notifications', auth_required: true,
      description: 'Get all notifications for the current user.',
      fields: [],
      success: { status: 200, body: '{ message, notifications: [...] }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'POST', path: '/api/v1/images/profile', auth_required: true,
      description: 'Upload or replace profile picture.',
      fields: [
        { name: 'image', type: 'string', required: true, format: 'base64 data URL (data:image/png;base64,...)' },
      ],
      success: { status: 200, body: '{ message: "Image added successfully" }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'POST', path: '/api/v1/chat/message', auth_required: true,
      description: 'Send a direct message. Omit conversationId on the first message between two users.',
      fields: [
        { name: 'receiverId',      type: 'string',  required: true, format: 'MongoDB _id of recipient' },
        { name: 'body',            type: 'string',  required: true },
        { name: 'conversationId',  type: 'string',  required: false, note: 'omit on first message; include on all subsequent messages' },
        { name: 'isRead',          type: 'boolean', required: false, default: false },
      ],
      success: { status: 201, body: '{ message: "Message sent", conversationId }' },
      errors: [{ status: 401, message: 'Not authenticated' }],
    },
    {
      method: 'DELETE', path: '/api/v1/test/cleanup/user/:authId', auth_required: false,
      description: 'Delete a test user. Only works for usernames starting with "vitest". Requires x-test-secret header.',
      fields: [
        { name: 'authId',          type: 'string',  in: 'path',   required: true, format: 'authId from signup response' },
        { name: 'x-test-secret',   type: 'string',  in: 'header', required: true, value: 'chatty-test-cleanup-2026' },
      ],
      success: { status: 200, body: '{ message: "Test user deleted successfully" }' },
      errors: [
        { status: 403, message: 'Forbidden — wrong or missing x-test-secret header' },
        { status: 400, message: 'Username does not start with "vitest"' },
      ],
    },
  ],
};

export const schemaController = {
  get(_req: Request, res: Response): void {
    res.status(HTTP_STATUS.OK).json(SCHEMA);
  },
};
