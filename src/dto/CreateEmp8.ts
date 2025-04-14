import {
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsDate,
    ValidateIf,
    ValidateNested,
    ArrayMinSize,
    IsNumber,
    IsObject,
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';


function IsFutureDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFutureDate',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return value instanceof Date && value.getTime() > Date.now();
                },
                defaultMessage() {
                    return 'DATE_NOT_IN_FUTURE';
                }
            }
        });
    };
}

function IsAfter(property: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isAfter',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: Date, args: ValidationArguments) {
                    const relatedValue = (args.object as any)[args.constraints[0]];
                    return value && relatedValue && value > relatedValue;
                },
                defaultMessage() {
                    return 'CONTRACT_END_BEFORE_START';
                }
            }
        });
    };
}


function IsValidHourlyRate(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidHourlyRate',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const context = args.object as any;
                    const headers = context['__headers__'] || {};
                    const countryCode = headers['x-country-code']?.toUpperCase?.();

                    let min = 15, max = 100;
                    if (countryCode === 'IN') {
                        min = 10;
                        max = 80;
                    } else if (countryCode === 'US') {
                        min = 20;
                        max = 150;
                    }

                    return typeof value === 'number' && value >= min && value <= max;
                },
                defaultMessage(args: ValidationArguments) {
                    return 'HOURLY_RATE_INVALID_FOR_COUNTRY';
                }
            }
        });
    };
}

function IsValidMetadata(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidMetadata',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(metadata: any) {
                    if (typeof metadata !== 'object' || metadata === null) return false;
                    return Object.entries(metadata).every(([key, value]) =>
                        /^[a-z0-9_]+$/.test(key) && typeof value === 'string' && value.length <= 255
                    );
                },
                defaultMessage() {
                    return 'METADATA_INVALID_FORMAT';
                }
            }
        });
    };
}


export class FullTimeDetailsDto {
    @IsArray({ message: 'Benefits must be an array', context: { code: 'BENEFITS_MUST_BE_ARRAY' } })
    @ArrayMinSize(1, { message: 'At least one benefit is required', context: { code: 'BENEFITS_REQUIRED' } })
    benefits: string[];

    @IsDate({ message: 'Joining date must be a valid date', context: { code: 'JOINING_DATE_INVALID' } })
    @Type(() => Date)
    joiningDate: Date;
}

export class ContractorDetailsDto {
    @IsDate({ message: 'Contract start must be a valid date', context: { code: 'CONTRACT_START_INVALID' } })
    @IsFutureDate({ message: 'Contract start must be a future date', context: { code: 'CONTRACT_START_FUTURE' } })
    @Type(() => Date)
    contractStart: Date;

    @IsDate({ message: 'Contract end must be a valid date', context: { code: 'CONTRACT_END_INVALID' } })
    @IsAfter('contractStart')
    @Type(() => Date)
    contractEnd: Date;

    @IsNumber({}, { message: 'Hourly rate must be a number', context: { code: 'HOURLY_RATE_INVALID' } })
    @IsValidHourlyRate({ message: 'Hourly rate not valid for locale', context: { code: 'HOURLY_RATE_LOCALE_INVALID' } })
    @Type(() => Number)
    hourlyRate: number;
}

export class EmploymentDto {
    @IsNotEmpty({ message: 'Employment type is required', context: { code: 'EMPLOYMENT_TYPE_REQUIRED' } })
    @IsIn(['full-time', 'contractor'], { message: 'Invalid employment type', context: { code: 'EMPLOYMENT_TYPE_INVALID' } })
    employmentType: 'full-time' | 'contractor';

    @ValidateIf(o => o.employmentType === 'full-time')
    @ValidateNested()
    @Type(() => FullTimeDetailsDto)
    fullTimeDetails?: FullTimeDetailsDto;

    @ValidateIf(o => o.employmentType === 'contractor')
    @ValidateNested()
    @Type(() => ContractorDetailsDto)
    contractorDetails?: ContractorDetailsDto;

    @IsObject({ message: 'Metadata must be an object', context: { code: 'METADATA_TYPE_INVALID' } })
    @IsValidMetadata({ message: 'Metadata keys/values invalid', context: { code: 'METADATA_FORMAT_INVALID' } })
    metadata: Record<string, string>;

    @IsOptional()
    __headers__?: Record<string, string>;
}
