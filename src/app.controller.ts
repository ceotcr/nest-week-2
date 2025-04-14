import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Timeout } from './decorators/timeout/timeout.decorator';
import { IsEvenPipe } from './pipes/is-even/is-even.pipe';
import { CreateUser6Dto } from './dto/CreateUser6Dto';
import { HttpExceptionFilter6 } from './exceptions/ExceptionFilter6';
import { ValidationError } from 'class-validator';
import { CreateEdu7Dto } from './dto/CreateEdu7Dto';
import { HttpExceptionFilter7 } from './exceptions/ExceptionFilter7';
import { EmploymentDto } from './dto/CreateEmp8';

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

  @Post("/create-user")
  @UseFilters(new HttpExceptionFilter6())
  createUser(@Body() createUser6Dto: CreateUser6Dto) {
    return {
      user: createUser6Dto
    };
  }

  @Post("/create-edu")
  // @UseFilters(new HttpExceptionFilter7())
  // @UsePipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   exceptionFactory: (errors: ValidationError[]) => {
  //     return new BadRequestException({
  //       message: "Validation failed",
  //       errors
  //     });
  //   }
  // }))
  createEdu(@Body() createEdu7Dto: CreateEdu7Dto) {
    return {
      education: createEdu7Dto
    };
  }

  @Post("/create-emp")
  createEmp(@Body() createEmpDto: EmploymentDto) {
    return {
      education: createEmpDto
    };
  }
}