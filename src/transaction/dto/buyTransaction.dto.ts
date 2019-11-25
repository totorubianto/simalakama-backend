import { IsString, IsEmail, IsNumber } from 'class-validator';
export class BuyTransactionDto {
  @IsString()
  readonly id_item: string;
}
