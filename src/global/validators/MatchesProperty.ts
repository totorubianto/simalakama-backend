import {
    registerDecorator,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'matchesProperty', async: false })
export class MatchesPropertyConstraint implements ValidatorConstraintInterface {
    public validate(value: string, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return typeof value === typeof relatedValue && value === relatedValue;
    }

    public defaultMessage(args: ValidationArguments) {
        // Set the default error message here
        const [relatedPropertyName] = args.constraints;
        return `$property must match ${relatedPropertyName} exactly`;
    }
}

export function MatchesProperty(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'matchesProperty',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: MatchesPropertyConstraint,
        });
    };
}
