import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as path from "path";
import { prisma } from "./generated/prisma-client";
import { buildSchema } from "type-graphql";

import StudentResolver from "./src/resolvers/StudentResolver";
import TeacherResolver from "./src/resolvers/TeacherResolver";

const schema = buildSchema({
  resolvers: [StudentResolver, TeacherResolver]
});

const server = new ApolloServer({
  schema,
  context: { prisma }
});

server.listen({ port: 4141 }, () => {
  console.log(`🚀 Server ready at http://localhost:4141`);
});
