import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesGuard } from './auth/security/roles.guard';
import { configService } from './config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class BootstrapModule {}
