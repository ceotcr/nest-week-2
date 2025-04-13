import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  ips = new Map<string, { count: number; firstRequestTime: number }>();
  use(req: Request, res: Response, next: () => void) {
    const ip = req.headers['x-forwarded-for'] || req.ip;
    const currentTime = Date.now();

    const rateLimit = 3;
    const timeLimit = 60 * 1000;

    const userData = this.ips.get(ip as string) || { count: 0, firstRequestTime: currentTime };
    if (userData.count >= rateLimit && currentTime - userData.firstRequestTime < timeLimit) {
      res.status(429).send('Rate limit exceeded. Try again later.');
      return;
    }
    if (currentTime - userData.firstRequestTime > timeLimit) {
      userData.count = 0;
      userData.firstRequestTime = currentTime;
    }
    userData.count++;
    this.ips.set(ip as string, userData);
    console.log(`IP: ${ip} - Count: ${userData.count} - Time: ${userData.firstRequestTime}`);
    next();
  }
}
