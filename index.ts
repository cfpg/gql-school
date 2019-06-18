import { ApolloServer, makeExecutableSchema } from "apollo-server";
import { importSchema } from "graphql-import";
import * as path from "path";
import { prisma } from "./generated/prisma-client";

import { QueryResolvers } from "./generated/graphql";
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

const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query
  }
});

const server = new ApolloServer({
  schema,
  context: { prisma }
});

server.listen({ port: 4141 }, () => {
  console.log(`🚀 Server ready at http://localhost:4141`);
});
