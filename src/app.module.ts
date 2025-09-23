import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      //'mongodb://localhost:27017/product-crud'
      'mongodb+srv://thienkt179_db_user:T123456789@test.herh5on.mongodb.net/Testduan',
    ), // thay URI nếu dùng Atlas
    ProductModule,
  ],
})
export class AppModule {}
