import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: {
        products: true,
      },
    });
  }

  getOne(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        products: true,
      },
    });
  }
}
