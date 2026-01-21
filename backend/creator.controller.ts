
import { Controller, Get, Post, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiResponse } from './dto';

// Mock implementations for missing decorators and guards
const JwtAuthGuard = class {};
const RolesGuard = class {};
const Roles = (...roles: string[]) => (target: any, key?: string | symbol, descriptor?: any) => {};

@Controller('v1/creators')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CREATOR')
export class CreatorController {

  @Get('me')
  async getStats(@Req() req): Promise<ApiResponse<any>> {
    return { success: true, data: { revenue: 12000, followers: 4500 }, error: null };
  }

  @Post('products')
  async createProduct(@Req() req, @Body() body: any): Promise<ApiResponse<any>> {
    return { success: true, data: { id: "p_new", ...body }, error: null };
  }

  @Get('analytics')
  async getAnalytics(): Promise<ApiResponse<any>> {
    return { success: true, data: { views: 50000, conversion: 2.5 }, error: null };
  }
}