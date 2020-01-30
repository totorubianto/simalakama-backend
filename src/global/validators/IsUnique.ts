import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../users/interfaces/user.interface';
import {
    registerDecorator,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import { Companies } from 'src/companies/interfaces/companies.interface';

@ValidatorConstraint({ name: 'isUnique', async: false })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectModel('User') readonly user: Model<User>,
        @InjectModel('Companies') readonly companies: Model<Companies>,
    ) {}

    public async validate(value: string, args: ValidationArguments) {
        const [relatedPropertyName, modelName, exceptionPropertyName] = args.constraints;
        let query = {};
        if (exceptionPropertyName !== undefined) {
            const exceptionValue = (args.object as any)[exceptionPropertyName];
            if (exceptionPropertyName === 'id') {
                query['_' + exceptionPropertyName] = { $ne: exceptionValue };
            } else {
                query[exceptionPropertyName] = { $ne: exceptionValue };
            }
        }
        query[relatedPropertyName] = value === '' ? null : value;
        const model = this[modelName];
        if (!model) return false;
        const exists = await model.findOne(query).exec();
        return exists ? false : true;
    }

    public defaultMessage(args: ValidationArguments) {
        // Set the default error message here
        const [relatedPropertyName] = args.constraints;
        return `$property already exists`;
    }
}

export function IsUnique(
    property: string,
    model: string,
    exceptionProperty?: string,
    validationOptions?: ValidationOptions,
) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'isUnique',
            target: object.constructor,
            propertyName,
            constraints: [property, model, exceptionProperty],
            options: validationOptions,
            validator: IsUniqueConstraint,
        });
    };
}
