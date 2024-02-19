import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'password length has to be between 3 and 20' })
  public password: string;
}
