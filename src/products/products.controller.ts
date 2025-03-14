import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';

export interface ProductParams {
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface updateProductParams {
  newName: string;
  newDescription: string;
  newImage: string;
  newPrice: number;
  newQuatity: number;
}

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get('')
  async index() {
    const products = await this.productService.getAll();
    return { message: 'hello', data: products };
  }

  @Get('/:id')
  async detail(@Param('id') id: number) {
    const product = await this.productService.getDetail(id);
    return { message: 'Data', data: product };
  }

  @Post('/create')
  async create(@Body() body: ProductParams) {
    const product = await this.productService.createProduct(body);
    return { message: 'Data', data: product };
  }

  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() body: updateProductParams) {
    try {
      const processUpdate = await this.productService.updateProduct(id, body);
      return { message: 'update successfully', Data: processUpdate };
    } catch (error) {
      return { message: 'update failed' };
    }
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.productService.deleteProduct(id);
      return { message: 'Delete successfully', Data: result };
    } catch (error) {
      return { message: 'Delete failed' };
    }
  }
}
