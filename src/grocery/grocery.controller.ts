import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGrocerydto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { SaveToRecordInterceptor } from './interceptors/save-to-record/save-to-record.interceptor';
import { SaveToRecord2Interceptor } from './interceptors/save-to-record2/save-to-record2.interceptor';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Get()
  async getAll() {
    return await this.groceryService.getAll();
  }

  @Get(':id')
  async findById(
    @Param('id')
    id: string,
  ) {
    return await this.groceryService.findById(id);
  }

  @Post()
  async create(
    @Body()
    grocery: CreateGrocerydto,
  ) {
    return await this.groceryService.create(grocery);
  }

  @UseInterceptors(SaveToRecordInterceptor)
  @Patch(':id')
  async updateById(
    @Param('id')
    id: string,
    @Body()
    grocery: UpdateGroceryDto,
  ) {
    return await this.groceryService.updateById(id, grocery);
  }

  @UseInterceptors(SaveToRecord2Interceptor)
  @Delete(':id')
  async deleteById(
    @Param('id')
    id: string,
  ) {
    return await this.groceryService.deleteById(id);
  }
}
