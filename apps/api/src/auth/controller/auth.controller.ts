import {
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessToken } from '../dto/accesstoken.dto';
import { LoginDTO } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('login')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<AccessToken> {
    this.logger.debug(`login: ${JSON.stringify(loginDTO)}`);
    const { username, password } = loginDTO;
    const isValid = await this.authService.validateUser(username, password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this.authService.generateAccessToken(username);
  }
}
