import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
 @InjectRedis() private readonly redis : Redis ) {}

  create(createProductDto: CreateProductDto) : Promise<Product>{
    const product = this.productRepository.create(createProductDto);
    const savedProduct = this.productRepository.save(product);
    return savedProduct;
  }

  findAll() : Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(name: string): Promise<Product | null> {
    let product: Product | null = null;
    
    // Check Redis first
    const cachedProduct = await this.redis.get(name);
    if (cachedProduct) {
        console.log('from redis');
        return JSON.parse(cachedProduct);
    }

    // Fetch from DB if not in Redis
    product = await this.productRepository.findOne({ where: { name } });

    if (!product) {
        throw new NotFoundException(`Product with name "${name}" not found`);
    }

    // Cache the result in Redis (optional, for future requests)
    await this.redis.set(name, JSON.stringify(product), 'EX', 120);

    console.log('from db');
    return product;
}

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
