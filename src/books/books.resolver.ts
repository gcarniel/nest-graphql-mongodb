import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  async createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    const newBook = await this.booksService.create(createBookInput);

    await pubSub.publish('bookAdded', {
      BookAdded: newBook,
    });
    return newBook;
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book, { nullable: true })
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.booksService.remove(id);
  }

  @Subscription(() => Book)
  BookAdded() {
    return pubSub.asyncIterator('bookAdded');
  }
}
