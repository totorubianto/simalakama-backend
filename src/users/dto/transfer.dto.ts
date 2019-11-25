import { IsString, IsEmail, IsNumber } from 'class-validator';
export class TransferDto {
  @IsEmail()
  readonly to: string;

  @IsNumber()
  readonly amount: number;
}
