import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
export class CreateProductDto {
  @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @MaxLength(100, { message: 'Tên sản phẩm không được vượt quá 100 ký tự' })
  name: string;

  @IsString({ message: 'Mô tả phải là chuỗi' })
  @IsOptional()
  @MaxLength(255, { message: 'Mô tả không được vượt quá 255 ký tự' })
  description?: string;

  @IsNumber({}, { message: 'Giá phải là số' })
  @Min(0, { message: 'Giá phải lớn hơn hoặc bằng 0' })
  price: number;

  @IsNumber({}, { message: 'Số lượng phải là số' })
  @Min(0, { message: 'Số lượng phải lớn hơn hoặc bằng 0' })
  quantity: number;
}
