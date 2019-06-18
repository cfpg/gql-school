const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const { makeExecutableSchema } = require("graphql-tools");
const path = require("path");
const { prisma } = require("./generated/prisma-client");

// Import schema using Prisma Datamodel
const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
const resolvers = {
  Query: {
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
  },

  Mutation: {
    createStudent: (parent, args, ctx) => {
      return ctx.prisma.createStudent({
        data: { name: args.name }
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
          id: args.id
        },
        data: {
          students: { connect: [{ id: args.studentId }] }
        }
      });
    }
  }
};
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return { prisma };
  }
});
server
  .listen({
    port: 4141
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
