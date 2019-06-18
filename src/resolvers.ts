import { QueryResolvers } from "../generated/graphql";

export const Query: QueryResolvers = {
  students: (parent, args, ctx, info) => ctx.prisma.students(),
  teachers: (parent, args, ctx, info) => {
    return ctx.prisma.teachers().$fragment(`
        fragment TeacherWithStudents on Teacher {
          id
          name
          students {
            id
            name
          }
        }
      `);
  }
};
