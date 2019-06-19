import {
  ObjectType,
  Field,
  Resolver,
  Query,
  ResolverInterface
} from "type-graphql";

@ObjectType()
class Student {
  @Field()
  id: string;

  @Field()
  name: string;
}

@Resolver(of => Student)
export default class StudentResolver {
  @Query(returns => [Student], { description: "Get all Students" })
  async students(): Promise<Student[]> {
    return await this.ctx.prisma.students();
  }
}
