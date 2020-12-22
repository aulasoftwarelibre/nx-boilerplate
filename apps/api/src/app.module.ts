import { DynamicModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BootstrapModule } from './bootstrap.module';
import { UserModule } from './user/infrastructure';

export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [BootstrapModule, AuthModule, UserModule],
    };
  }
}
