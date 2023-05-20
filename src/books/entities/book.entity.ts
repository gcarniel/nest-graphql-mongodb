import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  authorName: string;
}
