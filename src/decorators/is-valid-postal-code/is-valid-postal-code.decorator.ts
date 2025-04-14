import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'isValidPostalCode', async: false })
export class IsValidPostalCodeConstraint implements ValidatorConstraintInterface {
    validate(postalCode: string, args: ValidationArguments) {
        const usRegex = /^\d{5}(-\d{4})?$/;
        const ukRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
        const inRegex = /^[1-9][0-9]{5}$/;
        return usRegex.test(postalCode) || ukRegex.test(postalCode) || inRegex.test(postalCode);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Postal code must be in a valid US, UK, or India format';
    }
}

export function IsValidPostalCode(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidPostalCode',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: 'INVALID_POSTAL_CODE',
                ...validationOptions
            },
            constraints: [],
            validator: IsValidPostalCodeConstraint
        });
    };
}
