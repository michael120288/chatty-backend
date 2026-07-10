import { BaseCache } from '@service/redis/base.cache';
import Logger from 'bunyan';
import { config } from '@root/config';
import { ServerError } from '@global/helpers/error-handler';

const log: Logger = config.createLogger('tokenBlocklistCache');

export class TokenBlocklistCache extends BaseCache {
  constructor() {
    super('tokenBlocklistCache');
  }

  public async revokeToken(jti: string, ttlSeconds: number): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      if (ttlSeconds <= 0) return;
      await this.client.SET(`blocklist:${jti}`, '1', { EX: ttlSeconds });
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async isTokenRevoked(jti: string): Promise<boolean> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const result = await this.client.EXISTS(`blocklist:${jti}`);
      return result === 1;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }
}

export const tokenBlocklistCache: TokenBlocklistCache = new TokenBlocklistCache();
