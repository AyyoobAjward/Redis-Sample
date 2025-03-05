import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
  imports: [
    ProductModule,
    RedisModule.forRoot({type: 'single', url: 'localhost:6379'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      useUTC: true,
      logNotifications: true,
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'redis',
      synchronize: true //only on dev mode 
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
