import {
    IsEmail,
    IsString,
    Length,
    IsInt,
    Min,
    Max,
} from 'class-validator';

export class CreateUser6Dto {
    @IsString()
    @Length(2, 50, { message: 'First name must be between 2 and 50 characters long.' })
    firstName: string;

    @IsString()
    @Length(2, 50, { message: 'Last name must be between 2 and 50 characters long.' })
    lastName: string;

    @IsEmail()
    email: string;

    @IsInt()
    @Min(18)
    @Max(65)
    age: number;
}
