import { CreateBookInput } from './create-book.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  authorName: string;
}
