import { Type } from "class-transformer";
import {
    ArrayMinSize,
    IsNotEmpty,
    IsUUID,
    ValidateNested,
} from "class-validator";
import { IsValidPostalCode } from "src/decorators/is-valid-postal-code/is-valid-postal-code.decorator";

export class AddressDto {
    @IsNotEmpty({ message: "STREET_REQUIRED" })
    street: string;

    @IsNotEmpty({ message: "POSTAL_CODE_REQUIRED" })
    @IsValidPostalCode({ message: "INVALID_POSTAL_CODE" })
    postalCode: string;
}

export class EducationDto {
    @IsNotEmpty({ message: "DEGREE_REQUIRED" })
    degree: string;

    @IsNotEmpty({ message: "YEAR_REQUIRED" })
    year: number;
}

export class CreateEdu7Dto {
    @IsNotEmpty({ message: "ID_REQUIRED" })
    @IsUUID(undefined, { message: "ID_NOT_UUID" })
    id: string;

    @ValidateNested()
    @IsNotEmpty({ message: "ADDRESS_REQUIRED" })
    @Type(() => AddressDto)
    address: AddressDto;

    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    @ArrayMinSize(1, { message: "AT_LEAST_ONE_EDUCATION_REQUIRED" })
    education: EducationDto[];
}
