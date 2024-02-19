import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGrocerydto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { SaveToRecordInterceptor } from './interceptors/save-to-record/save-to-record.interceptor';
import { v2 as cloudinary } from 'cloudinary';
import toStream from 'buffer-to-stream';
@Injectable()
export class GroceryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateGrocerydto) {
    const uploadResponse = await Promise.all(
      body.files.map((file) => {
        const upload = cloudinary.uploader.upload_stream((error, result) => {
          if (error)
            throw new InternalServerErrorException('error uploading files');
        });

        toStream(file.buffer).pipe(upload);
      }),
    );

    const imageUrlArray = uploadResponse.map((response) => response.secure_url);

    const newGroc = await this.prismaService.grocery.create({
      data: {
        name: body.name,
        category: body.category,
        price: Number(body.price),
        rating: Number(body.rating),
        description: body.description,
        quantity: Number(body.quantity),
      },
    });

    await Promise.all(
      body.files.map((file) =>
        this.prismaService.file.create({
          data: {
            url: '',
            size: file.size,
            name: 'newname',
            mime: file.mimetype,
            groceryId: newGroc.id,
            originalName: file.originalName,
          },
        }),
      ),
    );

    return newGroc;
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
        name: grocery.name,
        category: grocery.category,
        price: Number(grocery.price),
        rating: Number(grocery.rating),
        description: grocery.description,
        quantity: Number(grocery.quantity),
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
