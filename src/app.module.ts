import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BooksModule } from './books/books.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
