import express, { Router, Request, Response } from 'express';
import moment from 'moment';
import axios from 'axios';
import { performance } from 'perf_hooks';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@root/config';

class HealthRoutes {
  public health(): Router {
    const router: Router = express.Router();
    router.get('/health', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.OK).send(`Health: Server instance is healthy with process id ${process.pid} on ${moment().format('LL')}`);
    });
    return router;
  }

  public env(): Router {
    const router: Router = express.Router();
    router.get('/env', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.OK).send(`This is the ${config.NODE_ENV} environment.`);
    });
    return router;
  }

  public instance(): Router {
    const router: Router = express.Router();
    router.get('/instance', async (req: Request, res: Response) => {
      const response = await axios({
        method: 'get',
        url: config.EC2_URL
      });
      res.status(HTTP_STATUS.OK).send(`Server is running on EC2 instance with id ${response.data} and process id ${process.pid} on ${moment().format('LL')}`);
    });
    return router;
  }

  public fiboRoutes(): Router {
    const router: Router = express.Router();
    router.get('/fibo/:num', async (req: Request, res: Response) => {
      const { num } = req.params;
      const n = parseInt(num, 10);
      if (isNaN(n) || n > 40) {
        res.status(HTTP_STATUS.BAD_REQUEST).send('Number must be 40 or less');
        return;
      }
      const start: number = performance.now();
      const result: number = this.fibo(n);
      const end: number = performance.now();
      const response = await axios({
        method: 'get',
        url: config.EC2_URL
      });
      res.status(HTTP_STATUS.OK).send(
        `Fibonacci series of ${num} is ${result} and it took ${end - start}ms with EC2 instance of ${
          response.data
        } and process id ${process.pid} on ${moment().format('LL')}`
      );
    });
    return router;
  }

  private fibo(data: number): number {
    if (data < 2) return 1;
    let a = 1, b = 1;
    for (let i = 2; i < data; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }
}

export const healthRoutes: HealthRoutes = new HealthRoutes();