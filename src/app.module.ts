import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OemModule } from './oem/oem.module';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

@Module({
  imports: [OemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
