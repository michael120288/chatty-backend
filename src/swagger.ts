import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const def: swaggerJsdoc.Options['definition'] = {
  openapi: '3.0.0',
  info: {
    title: 'Chatty + Test Quest API',
    version: '1.0.0',
    description:
      'REST API split into two sections:\n\n' +
      '**Test Quest** — level-based coding game (auth, levels, code submission, XP progress).\n\n' +
      '**Chatty** — social platform (posts, chat, reactions, followers, notifications, flashcards).'
  },
  servers: [
    { url: 'https://chatty-backend-aqme.onrender.com', description: 'Production server' },
    { url: 'http://localhost:5000', description: 'Local dev server' }
  ],
  components: {
    securitySchemes: {
      cookieAuth: { type: 'apiKey', in: 'cookie', name: 'session', description: 'Session cookie set after sign-in' }
    },
    schemas: {
      Error: {
        type: 'object',
        properties: { message: { type: 'string' }, statusCode: { type: 'integer' }, status: { type: 'string' } }
      },
      UserResponse: {
        type: 'object',
        properties: {
          _id: { type: 'string' }, username: { type: 'string' }, email: { type: 'string' },
          avatarColor: { type: 'string' }, profilePicture: { type: 'string' }, uId: { type: 'string' }
        }
      },
      Level: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'level-01' }, order: { type: 'integer' },
          title: { type: 'string' }, category: { type: 'string', enum: ['playwright', 'cypress-ui', 'jest'] },
          tool: { type: 'string' }, objective: { type: 'string' }, story: { type: 'string' },
          targetUrl: { type: 'string', nullable: true }, xpReward: { type: 'integer', example: 100 },
          starterCode: { type: 'string' }, hints: { type: 'array', items: { type: 'string' } },
          tags: { type: 'array', items: { type: 'string' } }, explanation: { type: 'string' }
        }
      },
      Post: {
        type: 'object',
        properties: {
          _id: { type: 'string' }, userId: { type: 'string' }, username: { type: 'string' },
          post: { type: 'string' }, imgId: { type: 'string' }, imgVersion: { type: 'string' },
          videoId: { type: 'string' }, videoVersion: { type: 'string' }, feelings: { type: 'string' },
          gifUrl: { type: 'string' }, privacy: { type: 'string', enum: ['Public', 'Followers', 'Private'] },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      Flashcard: {
        type: 'object',
        properties: {
          _id: { type: 'string' }, question: { type: 'string' }, answer: { type: 'string' },
          category: { type: 'string' }, imgId: { type: 'string' }, imgVersion: { type: 'string' },
          userId: { type: 'string' }, createdAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  tags: [
    // Test Quest
    { name: 'Test Quest / Auth',     description: 'Sign up, sign in, sign out, SSO, password reset' },
    { name: 'Test Quest / Levels',   description: 'Browse the 1,180 coding challenge levels' },
    { name: 'Test Quest / Submit',   description: 'Run user code in the sandbox and get pass/fail' },
    { name: 'Test Quest / Progress', description: 'Read and write user XP and completed level IDs' },
    // Chatty
    { name: 'Chatty / Users',         description: 'Profiles, search, suggestions, settings' },
    { name: 'Chatty / Posts',         description: 'Create, read, update and delete social feed posts' },
    { name: 'Chatty / Comments',      description: 'Add, read and delete post comments' },
    { name: 'Chatty / Reactions',     description: 'React to posts (like, love, haha, wow, sad, angry)' },
    { name: 'Chatty / Followers',     description: 'Follow, unfollow, block and unblock users' },
    { name: 'Chatty / Chat',          description: 'Direct messages and conversation threads' },
    { name: 'Chatty / Notifications', description: 'Read and dismiss activity notifications' },
    { name: 'Chatty / Images',        description: 'Profile and background image upload/delete' },
    { name: 'Chatty / Flashcards',    description: 'Flashcard CRUD, bookmarks, reactions, comments and spaced-repetition progress' }
  ],
  paths: {

    // ══════════════════════════════════════════════════════════════════
    //  TEST QUEST / AUTH
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/signup': {
      post: {
        tags: ['Test Quest / Auth'], summary: 'Register a new account',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['username','email','password','avatarColor','avatarImage'], properties: {
          username: { type: 'string', minLength: 4, maxLength: 20, example: 'Michael120288' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 12, example: 'Secure@Pass1!' },
          avatarColor: { type: 'string', example: '#4ecca3' },
          avatarImage: { type: 'string', description: 'Base64-encoded image as a data URL. Format: data:image/png;base64,<base64string>. To generate one: go to https://www.base64-image.de/, upload any image, then copy the full "data:image/..." string it shows. Supported types: png, jpeg, jpg, gif, webp.', example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' }
        }}}}},
        responses: {
          201: { description: 'Created — returns user + JWT token' },
          400: { description: 'Validation error or username/email taken', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/signin': {
      post: {
        tags: ['Test Quest / Auth'], summary: 'Sign in with username and password',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['username','password'], properties: {
          username: { type: 'string', example: 'michael120288' },
          password: { type: 'string', example: 'test1234' }
        }}}}},
        responses: {
          200: { description: 'OK — sets session cookie and returns user + token' },
          400: { description: 'Invalid credentials' }
        }
      }
    },
    '/api/v1/signout': {
      post: {
        tags: ['Test Quest / Auth'], summary: 'Sign out — clears the session cookie',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Signed out' } }
      }
    },
    '/api/v1/currentuser': {
      get: {
        tags: ['Test Quest / Auth'], summary: 'Get the currently authenticated user from the session',
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: 'Current user object', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserResponse' } } } },
          401: { description: 'Not authenticated' }
        }
      }
    },
    '/api/v1/session-token': {
      get: {
        tags: ['Test Quest / Auth'], summary: 'Exchange session cookie for a fresh JWT token',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Returns a new token string' } }
      }
    },
    '/api/v1/sso': {
      post: {
        tags: ['Test Quest / Auth'], summary: 'Single Sign-On — authenticate via an external SSO token',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['token'], properties: { token: { type: 'string', description: 'JWT token issued by an external SSO provider (e.g. Google, GitHub OAuth). Obtain this from your SSO provider after a successful login flow, then pass the raw token string here.', example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...' } } } } } },
        responses: {
          200: { description: 'SSO login successful' },
          400: { description: 'Invalid SSO token' }
        }
      }
    },
    '/api/v1/forgot-password': {
      post: {
        tags: ['Test Quest / Auth'], summary: 'Request a password-reset email',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['email'], properties: { email: { type: 'string', format: 'email' } } } } } },
        responses: { 200: { description: 'Reset email sent' }, 400: { description: 'Email not found' } }
      }
    },
    '/api/v1/reset-password/{token}': {
      post: {
        tags: ['Test Quest / Auth'], summary: 'Set a new password using the emailed token',
        parameters: [{ name: 'token', in: 'path', required: true, schema: { type: 'string' }, description: 'The password-reset token sent to your email by POST /api/v1/forgot-password. Copy it from the link in the email (the part after /reset-password/).' }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['password','confirmPassword'], properties: { password: { type: 'string', minLength: 12, example: 'NewSecure@Pass1!' }, confirmPassword: { type: 'string', example: 'NewSecure@Pass1!' } } } } } },
        responses: { 200: { description: 'Password updated' }, 400: { description: 'Token invalid or expired' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  TEST QUEST / LEVELS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/game/levels': {
      get: {
        tags: ['Test Quest / Levels'], summary: 'Get all 1,180 levels — lightweight list (no solution)',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Array of levels', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Level' } } } } } }
      }
    },
    '/api/v1/game/levels/{id}': {
      get: {
        tags: ['Test Quest / Levels'], summary: 'Get a single level with starterCode, hints and explanation',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'level-01' }],
        responses: { 200: { description: 'Level detail', content: { 'application/json': { schema: { $ref: '#/components/schemas/Level' } } } }, 404: { description: 'Level not found' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  TEST QUEST / SUBMIT
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/game/submit': {
      post: {
        tags: ['Test Quest / Submit'], summary: 'Run user code in the Docker sandbox — returns pass/fail + output',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['levelId','code'], properties: {
          levelId: { type: 'string', example: 'level-01' },
          code: { type: 'string', example: "const { chromium } = require('playwright');\n// ..." },
          category: { type: 'string', enum: ['playwright','cypress-ui','jest'] }
        }}}}},
        responses: {
          200: { description: 'Test result', content: { 'application/json': { schema: { type: 'object', properties: { passed: { type: 'boolean' }, output: { type: 'string' }, error: { type: 'string', nullable: true } } } } } }
        }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  TEST QUEST / PROGRESS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/progress': {
      get: {
        tags: ['Test Quest / Progress'], summary: "Get the current user's completed levels and total XP",
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Progress', content: { 'application/json': { schema: { type: 'object', properties: { completedLevels: { type: 'array', items: { type: 'string' } }, xp: { type: 'integer' } } } } } } }
      },
      put: {
        tags: ['Test Quest / Progress'], summary: "Overwrite the current user's progress",
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { completedLevels: { type: 'array', items: { type: 'string' }, description: 'Array of level IDs the user has completed', example: ['level-01', 'level-02', 'level-03'] }, xp: { type: 'integer', description: 'Total XP points earned', example: 300 } } } } } },
        responses: { 200: { description: 'Progress saved' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / USERS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/user/profile': {
      get: {
        tags: ['Chatty / Users'], summary: 'Get the current user profile',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Current user profile', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserResponse' } } } } }
      }
    },
    '/api/v1/user/profile/{userId}': {
      get: {
        tags: ['Chatty / Users'], summary: 'Get any user profile by userId',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the user. Get this from the _id field in any user or auth response.', example: '507f1f77bcf86cd799439011' }],
        responses: { 200: { description: 'User profile' } }
      }
    },
    '/api/v1/user/profile/posts/{username}/{userId}/{uId}': {
      get: {
        tags: ['Chatty / Users'], summary: "Get a user's profile together with their posts",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'username', in: 'path', required: true, schema: { type: 'string' }, example: 'Michael120288' },
          { name: 'userId', in: 'path', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId (_id) of the user', example: '507f1f77bcf86cd799439011' },
          { name: 'uId', in: 'path', required: true, schema: { type: 'string' }, description: 'Numeric string ID (uId) of the user — found in the user object returned after sign-in', example: '123456789012' }
        ],
        responses: { 200: { description: 'Profile with posts' } }
      }
    },
    '/api/v1/user/all/{page}': {
      get: {
        tags: ['Chatty / Users'], summary: 'Paginated list of all registered users',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'page', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }],
        responses: { 200: { description: 'Users list' } }
      }
    },
    '/api/v1/user/profile/user/suggestions': {
      get: {
        tags: ['Chatty / Users'], summary: 'Get suggested users to follow',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Suggested users list' } }
      }
    },
    '/api/v1/user/profile/search/{query}': {
      get: {
        tags: ['Chatty / Users'], summary: 'Search users by username or name',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'query', in: 'path', required: true, schema: { type: 'string' }, example: 'michael' }],
        responses: { 200: { description: 'Matching users' } }
      }
    },
    '/api/v1/user/profile/basic-info': {
      put: {
        tags: ['Chatty / Users'], summary: 'Update basic profile info (quote, work, school, location)',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { quote: { type: 'string' }, work: { type: 'string' }, school: { type: 'string' }, location: { type: 'string' } } } } } },
        responses: { 200: { description: 'Profile updated' } }
      }
    },
    '/api/v1/user/profile/social-links': {
      put: {
        tags: ['Chatty / Users'], summary: 'Update social media links',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { facebook: { type: 'string' }, instagram: { type: 'string' }, twitter: { type: 'string' }, youtube: { type: 'string' } } } } } },
        responses: { 200: { description: 'Social links updated' } }
      }
    },
    '/api/v1/user/profile/settings': {
      put: {
        tags: ['Chatty / Users'], summary: 'Update notification settings',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { messages: { type: 'boolean' }, reactions: { type: 'boolean' }, comments: { type: 'boolean' }, follows: { type: 'boolean' } } } } } },
        responses: { 200: { description: 'Settings updated' } }
      }
    },
    '/api/v1/user/profile/change-password': {
      put: {
        tags: ['Chatty / Users'], summary: 'Change the current user password',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['currentPassword','newPassword','confirmPassword'], properties: { currentPassword: { type: 'string' }, newPassword: { type: 'string' }, confirmPassword: { type: 'string' } } } } } },
        responses: { 200: { description: 'Password changed' }, 400: { description: 'Wrong current password' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / POSTS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/post/all/{page}': {
      get: {
        tags: ['Chatty / Posts'], summary: 'Get all posts (paginated feed)',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'page', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }],
        responses: { 200: { description: 'Posts array' } }
      }
    },
    '/api/v1/post/images/{page}': {
      get: {
        tags: ['Chatty / Posts'], summary: 'Get posts that contain images (paginated)',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'page', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }],
        responses: { 200: { description: 'Image posts' } }
      }
    },
    '/api/v1/post/videos/{page}': {
      get: {
        tags: ['Chatty / Posts'], summary: 'Get posts that contain videos (paginated)',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'page', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }],
        responses: { 200: { description: 'Video posts' } }
      }
    },
    '/api/v1/post': {
      post: {
        tags: ['Chatty / Posts'], summary: 'Create a text-only post',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { post: { type: 'string', example: 'Hello world!' }, feelings: { type: 'string', description: 'Current mood displayed on the post', example: 'Happy', enum: ['Happy', 'Sad', 'Excited', 'Blessed', 'Loved', 'Angry', 'Shocked', 'Silly', 'Tired', 'Focused'] }, gifUrl: { type: 'string', description: 'URL of a GIF to attach (e.g. from Giphy). Pass the direct image URL ending in .gif', example: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif' }, privacy: { type: 'string', enum: ['Public','Followers','Private'] } } } } } },
        responses: { 201: { description: 'Post created' } }
      }
    },
    '/api/v1/post/image/post': {
      post: {
        tags: ['Chatty / Posts'], summary: 'Create a post with an image (base64)',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { post: { type: 'string' }, image: { type: 'string', description: 'Base64-encoded image as a data URL. Format: data:image/png;base64,<base64string>. To generate one: go to https://www.base64-image.de/, upload any image, then copy the full "data:image/..." string. Supported types: png, jpeg, jpg, gif, webp.', example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' }, privacy: { type: 'string' } } } } } },
        responses: { 201: { description: 'Post with image created' } }
      }
    },
    '/api/v1/post/video/post': {
      post: {
        tags: ['Chatty / Posts'], summary: 'Create a post with a video (base64)',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { post: { type: 'string' }, video: { type: 'string', description: 'Base64-encoded video as a data URL. Format: data:video/mp4;base64,<base64string>. To generate one: go to https://www.base64-image.de/, upload a video file, then copy the full "data:video/..." string. Supported types: mp4, webm, ogg.', example: 'data:video/mp4;base64,AAAAIGZ0eXBpc29t' }, privacy: { type: 'string' } } } } } },
        responses: { 201: { description: 'Post with video created' } }
      }
    },
    '/api/v1/post/{postId}': {
      put: {
        tags: ['Chatty / Posts'], summary: 'Update a text post',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'postId', in: 'path', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the post. Get this from the _id field in any post response.', example: '507f1f77bcf86cd799439011' }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { post: { type: 'string' }, privacy: { type: 'string' } } } } } },
        responses: { 200: { description: 'Post updated' } }
      },
      delete: {
        tags: ['Chatty / Posts'], summary: 'Delete a post',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'postId', in: 'path', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the post', example: '507f1f77bcf86cd799439011' }],
        responses: { 200: { description: 'Post deleted' } }
      }
    },
    '/api/v1/post/image/{postId}': {
      put: {
        tags: ['Chatty / Posts'], summary: 'Update a post and replace its image',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'postId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { post: { type: 'string' }, image: { type: 'string', description: 'Base64-encoded image as a data URL. Format: data:image/png;base64,<base64string>. To generate one: go to https://www.base64-image.de/, upload any image, then copy the full "data:image/..." string. Supported types: png, jpeg, jpg, gif, webp.', example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' } } } } } },
        responses: { 200: { description: 'Post with image updated' } }
      }
    },
    '/api/v1/post/video/{postId}': {
      put: {
        tags: ['Chatty / Posts'], summary: 'Update a post and replace its video',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'postId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { post: { type: 'string' }, video: { type: 'string', description: 'Base64-encoded video as a data URL. Format: data:video/mp4;base64,<base64string>. To generate one: go to https://www.base64-image.de/, upload a video file, then copy the full "data:video/..." string. Supported types: mp4, webm, ogg.', example: 'data:video/mp4;base64,AAAAIGZ0eXBpc29t' } } } } } },
        responses: { 200: { description: 'Post with video updated' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / COMMENTS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/post/comment': {
      post: {
        tags: ['Chatty / Comments'], summary: 'Add a comment to a post',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['postId','comment'], properties: { postId: { type: 'string', description: 'MongoDB ObjectId of the post to comment on', example: '507f1f77bcf86cd799439011' }, comment: { type: 'string', example: 'Great post!' } } } } } },
        responses: { 201: { description: 'Comment added' } }
      }
    },
    '/api/v1/post/comments/{postId}': {
      get: {
        tags: ['Chatty / Comments'], summary: 'Get all comments for a post',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'postId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Comments list' } }
      }
    },
    '/api/v1/post/commentsnames/{postId}': {
      get: {
        tags: ['Chatty / Comments'], summary: 'Get commenter usernames for a post (cached)',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'postId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'List of usernames' } }
      }
    },
    '/api/v1/post/single/comment/{postId}/{commentId}': {
      get: {
        tags: ['Chatty / Comments'], summary: 'Get a single comment by postId and commentId',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'postId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'commentId', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'Single comment' } }
      }
    },
    '/api/v1/post/comment/{postId}/{commentId}': {
      delete: {
        tags: ['Chatty / Comments'], summary: 'Delete a comment',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'postId', in: 'path', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the post', example: '507f1f77bcf86cd799439011' },
          { name: 'commentId', in: 'path', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the comment', example: '507f191e810c19729de860ea' }
        ],
        responses: { 200: { description: 'Comment deleted' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / REACTIONS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/post/reaction': {
      post: {
        tags: ['Chatty / Reactions'], summary: 'Add or change a reaction on a post',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['postId','type'], properties: { postId: { type: 'string', description: 'MongoDB ObjectId of the post to react to', example: '507f1f77bcf86cd799439011' }, type: { type: 'string', enum: ['like','love','haha','wow','sad','angry'] }, previousReaction: { type: 'string', description: 'Your existing reaction on this post (if any). Pass this so the server can swap it. Omit if you have no previous reaction.', example: 'like' } } } } } },
        responses: { 200: { description: 'Reaction saved' } }
      }
    },
    '/api/v1/post/reactions/{postId}': {
      get: {
        tags: ['Chatty / Reactions'], summary: 'Get all reactions for a post',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'postId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Reactions list' } }
      }
    },
    '/api/v1/post/reactions/username/{username}': {
      get: {
        tags: ['Chatty / Reactions'], summary: "Get all reactions made by a username",
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Reactions by user' } }
      }
    },
    '/api/v1/post/single/reaction/username/{username}/{postId}': {
      get: {
        tags: ['Chatty / Reactions'], summary: "Get a single user's reaction on a specific post",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'username', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'postId', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'Single reaction object' } }
      }
    },
    '/api/v1/post/reaction/{postId}/{previousReaction}/{postReactions}': {
      delete: {
        tags: ['Chatty / Reactions'], summary: 'Remove a reaction from a post',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'postId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'previousReaction', in: 'path', required: true, schema: { type: 'string' }, example: 'like' },
          { name: 'postReactions', in: 'path', required: true, schema: { type: 'string' }, description: 'JSON-stringified reactions count object, URL-encoded. Example value before encoding: {"like":1,"love":0,"haha":0,"wow":0,"sad":0,"angry":0}. Pass it as a URL-encoded string in the path.', example: '%7B%22like%22%3A1%7D' }
        ],
        responses: { 200: { description: 'Reaction removed' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / FOLLOWERS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/user/follow/{followerId}': {
      put: {
        tags: ['Chatty / Followers'], summary: 'Follow a user',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'followerId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Now following' } }
      }
    },
    '/api/v1/user/unfollow/{followeeId}/{followerId}': {
      put: {
        tags: ['Chatty / Followers'], summary: 'Unfollow a user',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'followeeId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'followerId', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'Unfollowed' } }
      }
    },
    '/api/v1/user/following': {
      get: {
        tags: ['Chatty / Followers'], summary: 'List users the current user follows',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Following list' } }
      }
    },
    '/api/v1/user/followers/{userId}': {
      get: {
        tags: ['Chatty / Followers'], summary: "List followers of a user",
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Followers list' } }
      }
    },
    '/api/v1/user/block/{followerId}': {
      put: {
        tags: ['Chatty / Followers'], summary: 'Block a user',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'followerId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'User blocked' } }
      }
    },
    '/api/v1/user/unblock/{followerId}': {
      put: {
        tags: ['Chatty / Followers'], summary: 'Unblock a user',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'followerId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'User unblocked' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / CHAT
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/chat/message': {
      post: {
        tags: ['Chatty / Chat'], summary: 'Send a direct message',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['receiverId','body'], properties: { receiverId: { type: 'string', description: 'MongoDB ObjectId of the user you are sending the message to', example: '507f1f77bcf86cd799439011' }, body: { type: 'string', example: 'Hey, how are you?' }, isRead: { type: 'boolean', default: false } } } } } },
        responses: { 201: { description: 'Message sent' } }
      }
    },
    '/api/v1/chat/message/conversation-list': {
      get: {
        tags: ['Chatty / Chat'], summary: 'Get all conversation threads for the current user',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Conversation list' } }
      }
    },
    '/api/v1/chat/message/user/{receiverId}': {
      get: {
        tags: ['Chatty / Chat'], summary: 'Get the full message thread with a specific user',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'receiverId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Message thread' } }
      }
    },
    '/api/v1/chat/message/add-chat-users': {
      post: {
        tags: ['Chatty / Chat'], summary: 'Add users to a chat (for socket tracking)',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { userOne: { type: 'string' }, userTwo: { type: 'string' } } } } } },
        responses: { 200: { description: 'Chat users added' } }
      }
    },
    '/api/v1/chat/message/remove-chat-users': {
      post: {
        tags: ['Chatty / Chat'], summary: 'Remove users from a chat (for socket tracking)',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { userOne: { type: 'string' }, userTwo: { type: 'string' } } } } } },
        responses: { 200: { description: 'Chat users removed' } }
      }
    },
    '/api/v1/chat/message/mark-as-read': {
      put: {
        tags: ['Chatty / Chat'], summary: 'Mark a conversation as read',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { senderId: { type: 'string' }, receiverId: { type: 'string' } } } } } },
        responses: { 200: { description: 'Marked as read' } }
      }
    },
    '/api/v1/chat/message/reaction': {
      put: {
        tags: ['Chatty / Chat'], summary: 'Add or remove a reaction on a chat message',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { conversationId: { type: 'string' }, messageId: { type: 'string' }, reaction: { type: 'string' }, type: { type: 'string', enum: ['add','remove'] } } } } } },
        responses: { 200: { description: 'Reaction updated' } }
      }
    },
    '/api/v1/chat/message/mark-as-deleted/{messageId}/{senderId}/{receiverId}/{type}': {
      delete: {
        tags: ['Chatty / Chat'], summary: 'Soft-delete a message (mark as deleted for sender or receiver)',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'messageId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'senderId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'receiverId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'type', in: 'path', required: true, schema: { type: 'string', enum: ['deleteForMe','deleteForEveryone'] } }
        ],
        responses: { 200: { description: 'Message marked as deleted' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / NOTIFICATIONS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/notifications': {
      get: {
        tags: ['Chatty / Notifications'], summary: 'Get all notifications for the current user',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Notifications list' } }
      },
      delete: {
        tags: ['Chatty / Notifications'], summary: 'Delete all notifications',
        security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'All notifications cleared' } }
      }
    },
    '/api/v1/notification/{notificationId}': {
      put: {
        tags: ['Chatty / Notifications'], summary: 'Mark a notification as read',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'notificationId', in: 'path', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the notification. Get this from the _id field in GET /api/v1/notifications.', example: '507f1f77bcf86cd799439011' }],
        responses: { 200: { description: 'Notification marked as read' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / IMAGES
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/images/{userId}': {
      get: {
        tags: ['Chatty / Images'], summary: "Get all images uploaded by a user",
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Images list' } }
      }
    },
    '/api/v1/images/profile': {
      post: {
        tags: ['Chatty / Images'], summary: 'Upload or replace profile picture (base64)',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['image'], properties: { image: { type: 'string', description: 'Base64-encoded image as a data URL. Format: data:image/png;base64,<base64string>. To generate one: go to https://www.base64-image.de/, upload any image, then copy the full "data:image/..." string. Supported types: png, jpeg, jpg, gif, webp.', example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' } } } } } },
        responses: { 200: { description: 'Profile picture updated' } }
      }
    },
    '/api/v1/images/background': {
      post: {
        tags: ['Chatty / Images'], summary: 'Upload or replace background image (base64)',
        security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['image'], properties: { image: { type: 'string', description: 'Base64-encoded image as a data URL. Format: data:image/png;base64,<base64string>. To generate one: go to https://www.base64-image.de/, upload any image, then copy the full "data:image/..." string. Supported types: png, jpeg, jpg, gif, webp.', example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' } } } } } },
        responses: { 200: { description: 'Background image updated' } }
      }
    },
    '/api/v1/images/{imageId}': {
      delete: {
        tags: ['Chatty / Images'], summary: 'Delete an image by imageId',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'imageId', in: 'path', required: true, schema: { type: 'string' }, description: 'MongoDB ObjectId of the image document to delete. Get this from the _id field in the GET /api/v1/images/{userId} response.', example: '507f1f77bcf86cd799439011' }],
        responses: { 200: { description: 'Image deleted' } }
      }
    },
    '/api/v1/images/background/{bgImageId}': {
      delete: {
        tags: ['Chatty / Images'], summary: 'Delete the background image',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'bgImageId', in: 'path', required: true, schema: { type: 'string' }, description: 'The bgImageId stored on the user profile. Get this from the bgImageId field in the user profile response.', example: '507f1f77bcf86cd799439011' }],
        responses: { 200: { description: 'Background image deleted' } }
      }
    },

    // ══════════════════════════════════════════════════════════════════
    //  CHATTY / FLASHCARDS
    // ══════════════════════════════════════════════════════════════════
    '/api/v1/cards/all/{page}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get all flashcards (paginated)', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'page', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }],
        responses: { 200: { description: 'Flashcards list' } } }
    },
    '/api/v1/cards/category/{category}/{page}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get flashcards filtered by category', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'category', in: 'path', required: true, schema: { type: 'string' } }, { name: 'page', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Flashcards by category' } } }
    },
    '/api/v1/cards/user/{userId}/{page}': {
      get: { tags: ['Chatty / Flashcards'], summary: "Get flashcards created by a specific user", security: [{ cookieAuth: [] }],
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }, { name: 'page', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'User flashcards' } } }
    },
    '/api/v1/cards/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get a single flashcard by ID', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Flashcard detail', content: { 'application/json': { schema: { $ref: '#/components/schemas/Flashcard' } } } } } },
      put: { tags: ['Chatty / Flashcards'], summary: 'Update a flashcard (must be the author)', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { question: { type: 'string' }, answer: { type: 'string' }, category: { type: 'string' } } } } } },
        responses: { 200: { description: 'Flashcard updated' } } },
      delete: { tags: ['Chatty / Flashcards'], summary: 'Delete a flashcard', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Flashcard deleted' } } }
    },
    '/api/v1/cards': {
      post: { tags: ['Chatty / Flashcards'], summary: 'Create a new flashcard', security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['question','answer'], properties: { question: { type: 'string' }, answer: { type: 'string' }, category: { type: 'string' } } } } } },
        responses: { 201: { description: 'Flashcard created' } } }
    },
    '/api/v1/cards/with-image': {
      post: { tags: ['Chatty / Flashcards'], summary: 'Create a flashcard with an image', security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['question','answer','image'], properties: { question: { type: 'string' }, answer: { type: 'string' }, category: { type: 'string' }, image: { type: 'string', description: 'Base64-encoded image as a data URL. Format: data:image/png;base64,<base64string>. To generate one: go to https://www.base64-image.de/, upload any image, then copy the full "data:image/..." string. Supported types: png, jpeg, jpg, gif, webp.', example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' } } } } } },
        responses: { 201: { description: 'Flashcard with image created' } } }
    },
    '/api/v1/cards/progress/{cardId}': {
      post: { tags: ['Chatty / Flashcards'], summary: 'Record a practice result for spaced repetition', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { quality: { type: 'integer', minimum: 0, maximum: 5, description: 'How well you recalled the card (SM-2 scale): 0 = complete blackout, 1 = wrong but familiar, 2 = wrong but easy to recall, 3 = correct with difficulty, 4 = correct with hesitation, 5 = perfect recall. Scores ≥ 3 count as a pass.', example: 4 } } } } } },
        responses: { 200: { description: 'Progress recorded' } } },
      delete: { tags: ['Chatty / Flashcards'], summary: 'Reset practice progress for a card', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Progress reset' } } }
    },
    '/api/v1/cards/progress/user/{userId}': {
      get: { tags: ['Chatty / Flashcards'], summary: "Get a user's overall practice progress", security: [{ cookieAuth: [] }],
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'User progress stats' } } }
    },
    '/api/v1/cards/progress/card/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get practice progress for a specific card', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Card progress' } } }
    },
    '/api/v1/cards/practice/due': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get cards due for spaced-repetition review today', security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Due cards' } } }
    },
    '/api/v1/cards/practice/stats': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get practice statistics for the current user', security: [{ cookieAuth: [] }],
        responses: { 200: { description: 'Practice stats' } } }
    },
    '/api/v1/cards/bookmark/{cardId}': {
      post: { tags: ['Chatty / Flashcards'], summary: 'Bookmark a flashcard', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Card bookmarked' } } }
    },
    '/api/v1/cards/bookmarks/{userId}/{page}': {
      get: { tags: ['Chatty / Flashcards'], summary: "Get a user's bookmarked flashcards", security: [{ cookieAuth: [] }],
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }, { name: 'page', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Bookmarked cards' } } }
    },
    '/api/v1/cards/bookmark/check/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Check if the current user has bookmarked a card', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: '{ isBookmarked: boolean }' } } }
    },
    '/api/v1/cards/bookmark/count/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get total bookmark count for a card', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: '{ count: number }' } } }
    },
    '/api/v1/cards/reaction': {
      post: { tags: ['Chatty / Flashcards'], summary: 'Add or change a reaction on a flashcard', security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['cardId','type'], properties: { cardId: { type: 'string' }, type: { type: 'string', enum: ['like','love','haha','wow','sad','angry'] }, previousReaction: { type: 'string' } } } } } },
        responses: { 200: { description: 'Reaction saved' } } }
    },
    '/api/v1/cards/reactions/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get all reactions for a flashcard', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Reactions list' } } }
    },
    '/api/v1/cards/reaction/single/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: "Get the current user's reaction on a card", security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Single reaction' } } }
    },
    '/api/v1/cards/reaction/types/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get reaction type counts for a flashcard', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Reaction counts by type' } } }
    },
    '/api/v1/cards/reaction/{cardId}/{reactionType}': {
      delete: { tags: ['Chatty / Flashcards'], summary: 'Remove a reaction from a flashcard', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }, { name: 'reactionType', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Reaction removed' } } }
    },
    '/api/v1/cards/comment': {
      post: { tags: ['Chatty / Flashcards'], summary: 'Add a comment to a flashcard', security: [{ cookieAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['cardId','comment'], properties: { cardId: { type: 'string' }, comment: { type: 'string' } } } } } },
        responses: { 201: { description: 'Comment added' } } }
    },
    '/api/v1/cards/comments/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get all comments for a flashcard', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Comments list' } } }
    },
    '/api/v1/cards/comment/names/{cardId}': {
      get: { tags: ['Chatty / Flashcards'], summary: 'Get commenter usernames for a flashcard (cached)', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'cardId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Commenter usernames' } } }
    },
    '/api/v1/cards/comment/{commentId}': {
      put: { tags: ['Chatty / Flashcards'], summary: 'Update a flashcard comment', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'commentId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['comment'], properties: { comment: { type: 'string' } } } } } },
        responses: { 200: { description: 'Comment updated' } } },
      delete: { tags: ['Chatty / Flashcards'], summary: 'Delete a flashcard comment', security: [{ cookieAuth: [] }],
        parameters: [{ name: 'commentId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Comment deleted' } } }
    }
  }
};

const swaggerSpec = swaggerJsdoc({ definition: def, apis: [] });

const CUSTOM_CSS = `
  .swagger-ui .topbar { background: #0d0d1e; }
  .swagger-ui .topbar-wrapper img { display: none; }
  .swagger-ui .topbar-wrapper::before { content: "Chatty + Test Quest API"; color: #4ecca3; font-size: 18px; font-weight: bold; padding-left: 16px; }
  .swagger-ui .opblock-tag[data-tag^="Test Quest"] { border-left: 4px solid #f7b124; }
  .swagger-ui .opblock-tag[data-tag^="Chatty"] { border-left: 4px solid #4ecca3; }
`;

export function setupSwagger(app: Application): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Chatty + Test Quest API',
    customCss: CUSTOM_CSS,
    swaggerOptions: { persistAuthorization: true, withCredentials: true, requestInterceptor: (req: any) => { req.credentials = 'include'; return req; } }
  }));
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
