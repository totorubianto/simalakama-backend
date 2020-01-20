import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../users/interfaces/user.interface';
import { Admin } from '../../admins/interfaces/admin.interface'
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'doesExist', async: false })
@Injectable()
export class DoesExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel('User') readonly user: Model<User>,
    @InjectModel('Admin') readonly admin: Model<Admin>
    ) {}

  public async validate(value: string, args: ValidationArguments) {
    const { property } = args;
    let [relatedPropertyName, modelName, isOptional] = args.constraints;
    let query = {};
    query[relatedPropertyName] = value;
    if (isOptional) {
      if (value === undefined || value === null || value === '') return true;
    }
    if (relatedPropertyName == '_id') {
      // Invalid object id, return validation failed
      if (!mongoose.Types.ObjectId.isValid(value)) return false;
    }
    if (modelName === 'dynamic') {
      if (!args.object[property + 'Model']) return false;
      modelName = String(args.object[property + 'Model']).toLowerCase();
    }
    const model = this[modelName];
    if (!model) return false;
    const exists = await model.findOne(query).exec();
    return exists ? true : false;
  }

  public defaultMessage(args: ValidationArguments) {
    // Set the default error message here
    const [relatedPropertyName] = args.constraints;
    return `$property doesn't exists`;
  }
}

export function DoesExist(
  property: string,
  model: string,
  isOptional: boolean = false,
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'doesExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, model, isOptional],
      options: validationOptions,
      validator: DoesExistConstraint,
    });
  };
}
