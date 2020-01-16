import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
	transform(value: string, metadata: ArgumentMetadata): Date {
		const validator = new Validator();
		if (value === undefined || value === '') {
			return undefined;
		}
		const val = new Date(value);
		if (!validator.isDate(val)) {
			throw new BadRequestException('Validation failed (date string is expected)');
		}
		return val;
	}
}