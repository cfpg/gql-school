import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class Teacher {
  @Field()
  id: string;

  @Field()
  name: string;
}
