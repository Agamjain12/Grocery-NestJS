import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGrocerydto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { SaveToRecordInterceptor } from './interceptors/save-to-record/save-to-record.interceptor';

@Injectable()
export class GroceryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateGrocerydto) {
    return await this.prismaService.grocery.create({
      data: {
        category: body.category,
        description: body.description,
        image: body.image,
        price: body.price,
        quantity: body.quantity,
        name: body.name,
        rating: body.rating,
      },
    });
  }

  async getAll() {
    return await this.prismaService.grocery.findMany();
  }

  async findById(id: string) {
    const groc = await this.prismaService.grocery.findUnique({ where: { id } });

    if (!groc) {
      throw new NotFoundException('grocery by this ID does not exists');
    }

    return groc;
  }

  @UseInterceptors(SaveToRecordInterceptor)
  async updateById(id: string, grocery: UpdateGroceryDto) {
    const groc = this.prismaService.grocery.update({
      where: { id },
      data: {
        category: grocery.category,
        description: grocery.description,
        image: grocery.image,
        price: grocery.price,
        quantity: grocery.quantity,
        name: grocery.name,
        rating: grocery.rating,
      },
    });

    if (!groc) {
      throw new NotFoundException('grocery by this ID does not exists');
    }

    return groc;
  }

  async deleteById(id: string) {
    const groc = await this.prismaService.grocery.delete({ where: { id } });
    return groc;
  }
}
