import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'redis',
      entities: [Product],
      synchronize: true,
  }),
  RedisModule.forRoot({
    type: 'single',
    url: 'localhost:6379'
  }),
  ProductModule]
})
export class AppModule {}
