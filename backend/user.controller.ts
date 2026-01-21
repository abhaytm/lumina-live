
import { Controller, Get, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiResponse } from './dto';

// Mock implementation for JwtAuthGuard
const JwtAuthGuard = class {};

@Controller('v1/users')
@UseGuards(JwtAuthGuard)
export class UserController {

  @Get('me')
  async getProfile(@Req() req): Promise<ApiResponse<any>> {
    return { success: true, data: req.user, error: null };
  }

  @Put('me')
  async updateProfile(@Req() req, @Body() body: any): Promise<ApiResponse<any>> {
    return { success: true, data: { ...req.user, ...body }, error: null };
  }

  @Get('orders')
  async getOrders(@Req() req): Promise<ApiResponse<any[]>> {
    return { success: true, data: [], error: null };
  }

  @Get('orders/:id')
  async getOrderDetail(@Param('id') id: string): Promise<ApiResponse<any>> {
    return { success: true, data: { id, status: 'delivered' }, error: null };
  }
}