/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {AppService} from './app/app.service';
import {HttpExceptionFilter} from './app/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe())
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });

  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes: [] = router.stack
    .map(layer => {
      if (layer.route) {
        return {
          path: layer.route.path,
          method: layer.route.stack[0].method
        };
      }
    })
    .filter(item => item !== undefined);
  AppService.availableRoutes = availableRoutes;
  console.log('Routes:', availableRoutes);

}

bootstrap();
