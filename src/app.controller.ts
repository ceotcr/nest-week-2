import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Timeout } from './decorators/timeout/timeout.decorator';
import { IsEvenPipe } from './pipes/is-even/is-even.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/timeout')
  @Timeout(3000)
  async getTimeout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('This is a delayed response!');
      }, 5000);
    });
  }

  @Get("/check-even/:number")
  checkEven(@Param('number', ParseIntPipe, IsEvenPipe) number: number) {
    return { message: `The number ${number} is even!` };
  }
}
