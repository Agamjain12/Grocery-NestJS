import { CreateGrocerydto } from './create-grocery.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGroceryDto extends PartialType(CreateGrocerydto) {}
