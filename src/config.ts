import dotenv from 'dotenv';
dotenv.config({});
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';
import Joi from 'joi';

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;
  public SENDGRID_API_KEY: string | undefined;
  public SENDGRID_SENDER: string | undefined;
  public EC2_URL: string | undefined;

  private readonly DEFAULT_DATABASE_URL =
    'mongodb://127.0.0.1:27017/chattyapp-backend';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
    this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
    this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
    this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
    this.SENDGRID_SENDER = process.env.SENDGRID_SENDER || '';
    this.EC2_URL = process.env.EC2_URL || '';

  }
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }
  public validateConfig(): void {
    const envVarsSchema = Joi.object({
      DATABASE_URL: Joi.string().uri().required(),
      JWT_TOKEN: Joi.string().min(32).required()
        .messages({
          'string.min': 'JWT_TOKEN must be at least 32 characters long for security',
          'any.required': 'JWT_TOKEN is required. Generate one with: openssl rand -base64 32'
        }),
      NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
      SECRET_KEY_ONE: Joi.string().min(32).required()
        .messages({
          'string.min': 'SECRET_KEY_ONE must be at least 32 characters long',
          'any.required': 'SECRET_KEY_ONE is required'
        }),
      SECRET_KEY_TWO: Joi.string().min(32).required()
        .messages({
          'string.min': 'SECRET_KEY_TWO must be at least 32 characters long',
          'any.required': 'SECRET_KEY_TWO is required'
        }),
      CLIENT_URL: Joi.string().uri().required(),
      REDIS_HOST: Joi.string().uri().required(),
      CLOUD_NAME: Joi.string().required(),
      CLOUD_API_KEY: Joi.string().required(),
      CLOUD_API_SECRET: Joi.string().required(),
      SENDER_EMAIL: Joi.string().email().required(),
      SENDER_EMAIL_PASSWORD: Joi.string().min(8).required(),
      SENDGRID_API_KEY: Joi.string().optional().allow(''),
      SENDGRID_SENDER: Joi.string().email().optional().allow(''),
      EC2_URL: Joi.string().optional().allow('')
    }).unknown(true);

    const { error } = envVarsSchema.validate({
      DATABASE_URL: this.DATABASE_URL,
      JWT_TOKEN: this.JWT_TOKEN,
      NODE_ENV: this.NODE_ENV,
      SECRET_KEY_ONE: this.SECRET_KEY_ONE,
      SECRET_KEY_TWO: this.SECRET_KEY_TWO,
      CLIENT_URL: this.CLIENT_URL,
      REDIS_HOST: this.REDIS_HOST,
      CLOUD_NAME: this.CLOUD_NAME,
      CLOUD_API_KEY: this.CLOUD_API_KEY,
      CLOUD_API_SECRET: this.CLOUD_API_SECRET,
      SENDER_EMAIL: this.SENDER_EMAIL,
      SENDER_EMAIL_PASSWORD: this.SENDER_EMAIL_PASSWORD,
      SENDGRID_API_KEY: this.SENDGRID_API_KEY,
      SENDGRID_SENDER: this.SENDGRID_SENDER,
      EC2_URL: this.EC2_URL
    });

    if (error) {
      throw new Error(`Configuration validation error: ${error.message}`);
    }
  }
  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET,
    });
  }
}

export const config: Config = new Config();
