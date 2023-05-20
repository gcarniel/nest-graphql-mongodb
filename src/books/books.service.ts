import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(public prismaBook: PrismaService) {}
  private _books: Book[] = [];

  async create(createBookInput: CreateBookInput) {
    const book = await this.prismaBook.books.create({
      data: {
        ...createBookInput,
      },
    });

    return book;
  }

  async findAll() {
    return await this.prismaBook.books.findMany();
  }

  async findOne(id: string) {
    return await this.prismaBook.books.findUnique({ where: { id } });
  }

  async update(id: string, updateBookInput: UpdateBookInput) {
    const book = await this.findOne(id);

    if (!book) {
      return null;
    }

    const { id: updatedId, ...data } = updateBookInput;

    return await this.prismaBook.books.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async remove(id: string) {
    const book = await this.findOne(id);

    if (!book) {
      return null;
    }

    return await this.prismaBook.books.delete({ where: { id } });
  }
}
