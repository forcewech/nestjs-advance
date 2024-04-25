import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class ListClassDto {
  @Transform(({ value }) => {
    const newVal = (value as string).split(",").map((item) => Number(item));
    console.log("newVal: ", newVal);
    return newVal;
  })
  @IsInt({ each: true })
  readonly classes: number[];
}
