import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { join } from 'path';
import { GroceryService } from './grocery.service';
import { CreateGrocerydto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
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
  async findById(@Param('id') id: string) {
    return await this.groceryService.findById(id);
  }

  @Post()
  @FormDataRequest({
    storage: MemoryStoredFile,
  })
  async create(@Body() grocery: CreateGrocerydto) {
    return await this.groceryService.create(grocery);
  }

  @Patch(':id')
  @UseInterceptors(SaveToRecordInterceptor)
  async updateById(@Param('id') id: string, @Body() grocery: UpdateGroceryDto) {
    return await this.groceryService.updateById(id, grocery);
  }

  @Delete(':id')
  @UseInterceptors(SaveToRecord2Interceptor)
  async deleteById(@Param('id') id: string) {
    return await this.groceryService.deleteById(id);
  }
}
