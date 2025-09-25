import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from 'src/shared/database/mongo/schemas/product.schema';
import { CreateProductDto } from '../shared/database/mongo/dto/create-product.dto';
import { UpdateProductDto } from '../shared/database/mongo/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(
    page = 1,
    limit = 3,
    search?: string,
  ): Promise<{ data: Product[]; total: number }> {
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const [data, total] = await Promise.all([
      this.productModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.productModel.countDocuments(query),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product)
      throw new NotFoundException(`Không tìm thấy sản phẩm với id: ${id}`);
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!product)
      throw new NotFoundException(`Không tìm thấy sản phẩm với id: ${id}`);
    return product;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product)
      throw new NotFoundException(`Không tìm thấy sản phẩm với id: ${id}`);
    return product;
  }
}
