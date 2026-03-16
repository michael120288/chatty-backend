import express, { Express } from 'express';
import { ChattyServer } from '@root/setupServer';
import databaseConnection from '@root/setupDatabase';
import { config } from '@root/config';
import Logger from 'bunyan';

// Suppress DEP0060 (util._extend) emitted by socket.io transitive dependencies
process.on('warning', (w) => {
  if (w.name === 'DeprecationWarning' && (w as NodeJS.ErrnoException).code === 'DEP0060') return;
  process.stderr.write((w.stack ?? String(w)) + '\n');
});

const log: Logger = config.createLogger('app');

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: ChattyServer = new ChattyServer(app);
    server.start();
    Application.handleExit();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }

  private static handleExit(): void {
    process.on('uncaughtException', (error: Error) => {
      log.error(`There was an uncaught error: ${error}`);
      if ((error as NodeJS.ErrnoException).code === 'ETIMEDOUT') return;
      Application.shutDownProperly(1);
    });

    process.on('unhandledRejection', (reason: Error) => {
      log.error(`Unhandled rejection at promise: ${reason}`);
      if ((reason as NodeJS.ErrnoException).code === 'ETIMEDOUT') return;
      Application.shutDownProperly(2);
    });

    process.on('SIGTERM', () => {
      log.error('Caught SIGTERM');
      Application.shutDownProperly(2);
    });

    process.on('SIGINT', () => {
      log.error('Caught SIGINT');
      Application.shutDownProperly(2);
    });

    process.on('exit', () => {
      log.error('Exiting');
    });
  }

  private static shutDownProperly(exitCode: number): void {
    Promise.resolve()
      .then(() => {
        log.info('Shutdown complete');
        process.exit(exitCode);
      })
      .catch((error) => {
        log.error(`Error during shutdown: ${error}`);
        process.exit(1);
      });
  }
}

const application: Application = new Application();
application.initialize();
