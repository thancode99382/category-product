import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductParams, updateProductParams } from './products.controller';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepostory: Repository<Product>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productRepostory.find();
  }

  getDetail(id: number) {
    return this.productRepostory.findOneBy({ id });
  }

  createProduct(params: ProductParams) {
    const productNew = new Product();
    productNew.name = params.name;
    productNew.image = params.image;
    productNew.description = params.description;
    productNew.quantity = 124;
    productNew.price = params.price;
    productNew.status = true;
    return this.productRepostory.save(productNew);
  }

  async updateProduct(id: number, params: updateProductParams) {
    console.log('oke');
    const oldProduct = await this.productRepostory.findOneBy({ id });
    console.log(oldProduct);

    if (!oldProduct) {
      throw new Error('Product not found');
    }
    oldProduct.name = params.newName;
    oldProduct.image = params.newImage;
    oldProduct.description = params.newDescription;
    oldProduct.quantity = params.newQuatity;
    oldProduct.price = params.newPrice;
    return this.productRepostory.save(oldProduct);
  }

  deleteProduct(id: number) {
    return this.productRepostory.delete({ id });
  }
}
