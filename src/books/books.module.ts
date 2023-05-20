import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BooksResolver, BooksService, PrismaService],
})
export class BooksModule {}
