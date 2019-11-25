import { IsString, IsInt, IsEmail, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsString()
  readonly item: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly price: number;
  @IsNumber()
  readonly total_items: number;
}
