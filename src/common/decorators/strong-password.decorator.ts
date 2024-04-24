import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: "strongPassword", async: false })
export class StrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string) {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    return strongRegex.test(password);
  }

  defaultMessage() {
    return "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ cái in hoa, một chữ cái thường, một chữ số và một ký tự đặc biệt.";
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "isStrongPassword",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: StrongPasswordConstraint
    });
  };
}
