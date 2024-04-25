import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { IsStrongPassword } from "src/common/decorators/strong-password.decorator";
export class CreateStudentDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly roleNumber: number;

  @IsNumber()
  @IsNotEmpty()
  readonly class: number;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly gender: string;

  @IsNumber()
  @IsNotEmpty()
  readonly marks: number;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ message: "Mật khẩu không đủ mạnh." })
  readonly password: string;
}
