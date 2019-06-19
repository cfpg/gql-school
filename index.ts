import { ApolloServer, makeExecutableSchema } from "apollo-server";
import { importSchema } from "graphql-import";
import * as path from "path";
import { prisma } from "./generated/prisma-client";

import { QueryResolvers, MutationResolvers } from "./generated/graphql";
const Query: QueryResolvers = {
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
const Mutation: MutationResolvers = {
  createStudent: (parent, args, ctx) => {
    return ctx.prisma.createStudent({
      name: args.name
    });
  },
  createTeacher: (parent, args, ctx) => {
    return ctx.prisma.createTeacher({
      name: args.name
    });
  },
  updateTeacherAndConnectStudent: (parent, args, ctx) => {
    return ctx.prisma.updateTeacher({
      where: {
        id: args.where.id
      },
      data: {
        students: { connect: [{ id: args.data.students.connect }] }
      }
    });
  }
};

const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  }
});

const server = new ApolloServer({
  schema,
  context: { prisma }
});

server.listen({ port: 4141 }, () => {
  console.log(`🚀 Server ready at http://localhost:4141`);
});
