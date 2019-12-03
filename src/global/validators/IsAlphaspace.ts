import {
    registerDecorator,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAlphaspace', async: false })
export class IsAlphaspaceConstraint implements ValidatorConstraintInterface {
    public validate(value: string, args: ValidationArguments) {
        if (value == '') return true;
        const pattern = /^(?:[a-zA-Z]+\s)*[a-zA-Z]+$/;
        return pattern.test(value);
    }

    public defaultMessage(args: ValidationArguments) {
        // Set the default error message here
        return `$property must contain only letters and spaces`;
    }
}

export function IsAlphaspace(
    validationOptions?: ValidationOptions,
) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'isAlphaspace',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsAlphaspaceConstraint,
        });
    };
}
