import { Request, Response } from 'express';
import * as cloudinaryUploads from '@global/helpers/cloudinary-upload';
import {
  authMock,
  authMockRequest,
  authMockResponse,
} from '@root/mocks/auth.mock';
import { SignUp } from '@auth/controllers/signup';
import { CustomError } from '@global/helpers/error-handler';
import { authService } from '@service/db/auth.service';
import { UserCache } from '@service/redis/user.cache';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/user.cache');
jest.mock('@service/queues/user.queue');
jest.mock('@service/queues/auth.queue');
jest.mock('@global/helpers/cloudinary-upload');

describe('SIGNUP', () => {
  beforeEach(()=>{
    jest.clearAllMocks();
  })

  afterEach(()=>{
    jest.clearAllMocks();
    jest.clearAllTimers()
  })
  it('should throw an error when username is not available ', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: '',
        email: 'michael@gmail.com',
        password: 'qwerty',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      console.log(error);
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual(
        'Username is a required field',
      );
      console.log(error.serializeError());
    });
  });
  it('should throw an error if username is less than minimum length ', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'nam',
        email: 'michael@gmail.com',
        password: 'qwerty',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      console.log(error);
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual('Invalid username');
      console.log(error.serializeError());
    });
  });
  it('should throw an error if username is less than minimum length ', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'namaname9',
        email: 'michael@gmail.com',
        password: 'qwerty',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      console.log(error);
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual('Invalid username');
      console.log(error.serializeError());
    });
  });
  it('should throw an error if email is not valid ', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'nameNe',
        email: 'not valid',
        password: 'qwerty',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      console.log(error);
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual('Email must be valid');
      console.log(error.serializeError());
    });
  });
  it('should throw an error if username is less than minimum length ', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'name',
        email: '',
        password: 'qwerty',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      console.log(error);
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual(
        'Email is a required field',
      );
      console.log(error.serializeError());
    });
  });
  it('should throw an error if password is not available', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'name',
        email: 'michael@gmail.com',
        password: '',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      console.log(error);
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual(
        'Password is a required field',
      );
      console.log(error.serializeError());
    });
  });
  it('should throw an error if password length is less than minimum  length ', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'name',
        email: 'michael@gmail.com',
        password: 'qw',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      console.log(error);
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual('Invalid password');
      console.log(error.serializeError());
    });
  });
  it('should throw an error if password length is greater than maximum length ', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'name',
        email: 'michael@gmail.com',
        password: 'qwertyqwerty',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      console.log(error);
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual('Invalid password');
      console.log(error.serializeError());
    });
  });
  it('should throw unauthorize error when user is already exist', () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'michael',
        email: 'michael@gmail.com',
        password: 'michael',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    jest
      .spyOn(authService, 'getUserByUsernameOrEmail')
      .mockResolvedValue(authMock);
    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual('Invalid credentials');
    });
  });
  it('should set session data for valid credentials and send correct json response', async () => {
    const req: Request = authMockRequest(
      {},
      {
        username: 'michael',
        email: 'michael@gmail.com',
        password: 'michael',
        avatarColor: '#9c27b0',
        avatarImage: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      },
    ) as Request;
    const res: Response = authMockResponse();

    jest.spyOn(authService, 'getUserByUsernameOrEmail').mockResolvedValue(null as any)
      const userSpy = jest.spyOn(UserCache.prototype,'saveUserToCache')
      jest.spyOn(cloudinaryUploads,'uploads').mockImplementation(():any=>Promise.resolve({version:'123123123',public_id:'123123123'}))
    await SignUp.prototype.create(req, res);
    console.log(userSpy.mock);
    expect(req.session?.jwt).toBeDefined();
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully',
      user: userSpy.mock.calls[0][2],
      token:req.session?.jwt
    });
  });
});
