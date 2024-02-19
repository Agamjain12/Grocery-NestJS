import { IsFiles, MemoryStoredFile } from 'nestjs-form-data';

export class CreateGrocerydto {
  @IsFiles()
  files: MemoryStoredFile[];

  name: string;
  price: string;
  rating: string;
  quantity: string;
  category: string;
  description: string;
}
