
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, PaginatedResponse } from './dto';

@Controller('v1/products')
export class ProductController {

  @Get()
  async list(@Query() query: any): Promise<ApiResponse<PaginatedResponse<any>>> {
    return {
      success: true,
      data: { items: [], total: 0, page: 1, limit: 10 },
      error: null
    };
  }

  @Get('search')
  async search(@Query('q') q: string): Promise<ApiResponse<any[]>> {
    return { success: true, data: [], error: null };
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<ApiResponse<any>> {
    return { success: true, data: { id, name: "Serum", price: 45 }, error: null };
  }
}
