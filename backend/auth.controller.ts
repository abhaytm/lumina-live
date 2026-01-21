
// USER LOGIN CONTROLLER CODE
// CREATOR LOGIN CONTROLLER CODE
// ADMIN LOGIN CONTROLLER CODE

import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, AuthResponse } from './dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() body: { identifier: string, password: string }): Promise<ApiResponse<AuthResponse>> {
    try {
      const data = await this.authService.loginUser(body.identifier, body.password);
      return { success: true, data, error: null };
    } catch (e: any) {
      throw new UnauthorizedException(e.message === 'ACCOUNT_BLOCKED' ? 'Account is blocked' : 'Invalid email/phone or password');
    }
  }

  @Post('creator/login')
  @HttpCode(HttpStatus.OK)
  async creatorLogin(@Body() body: { identifier: string, password: string }): Promise<ApiResponse<AuthResponse>> {
    try {
      const data = await this.authService.loginCreator(body.identifier, body.password);
      return { success: true, data, error: null };
    } catch (e: any) {
      if (e.message === 'CREATOR_NOT_APPROVED') throw new ForbiddenException('Creator account pending approval');
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() body: { email: string, password: string }): Promise<ApiResponse<AuthResponse>> {
    try {
      const data = await this.authService.loginAdmin(body.email, body.password);
      return { success: true, data, error: null };
    } catch (e: any) {
      throw new UnauthorizedException('Access denied');
    }
  }
}
