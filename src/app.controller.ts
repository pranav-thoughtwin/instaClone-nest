// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import { Controller, Logger } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   this.logger.log('Login endpoint hit');
  //   this.logger.log(`Request body: ${JSON.stringify(req.body)}`);
  //   if (req.user) {
  //     this.logger.log(`User authenticated: ${JSON.stringify(req.user)}`);
  //   } else {
  //     this.logger.warn('User not authenticated');
  //   }
  //   return req.user;
  // }
}
