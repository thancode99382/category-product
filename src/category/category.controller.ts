import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categorySevice: CategoryService) {}
  @Get('/getAll')
  async getAll() {
    const categories = await this.categorySevice.getAll();
    return {
      message: 'oke',
      data: categories,
    };
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const result = await this.categorySevice.getOne(id);
    return {
      message: 'oke',
      data: result?.products,
    };
  }
}
