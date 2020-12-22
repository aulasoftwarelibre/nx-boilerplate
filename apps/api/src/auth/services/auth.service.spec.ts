import { QueryBus } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

const PASSWORD = 'password';

describe('AuthService', () => {
  let authService: AuthService;
  const queryBus: Partial<QueryBus> = {};

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [
        AuthService,
        {
          provide: QueryBus,
          useValue: queryBus,
        },
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  it('encodes password', async () => {
    const encoded = await authService.encodePassword(PASSWORD);

    expect(bcrypt.compareSync(PASSWORD, encoded)).toBeTruthy();
  });
});
