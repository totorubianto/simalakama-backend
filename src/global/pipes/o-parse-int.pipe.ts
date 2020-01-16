import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class OParseIntPipe implements PipeTransform<string, number> {
	transform(value: string, metadata: ArgumentMetadata): number {
		if (value === undefined || value === '') {
			return undefined;
		}
		const val = parseInt(value, 10);
		if (isNaN(val)) {
			throw new BadRequestException('Validation failed (numeric string is expected)');
		}
		return val;
	}
}