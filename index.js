const { ApolloServer } = require("apollo-server");

const { prisma } = require("./generated/prisma-client");

// Import schema using Prisma Datamodel
const typeDefs = gql`
  type Query {
    students: [Student]
    teachers: [Teacher]
  }

  type Student {
    id: ID!
    name: String!
  }

  type Teacher {
    id: ID!
    name: String!
  }

  type Mutation {
    createStudent(name: String!): Student!
    createTeacher(name: String!): Teacher!
    updateTeacherAndConnectStudent(where: {id: ID!}, data: {students: {connect: {id: ID!}}})
  }
`;

// Create a Resolver to
const resolvers = {
  Query: {
    students: (parent, args, ctx, info) => ctx.prisma.students(),
    teachers: (parent, args, tx, info) => ctx.prisma.teachers()
  },

  Mutation: {
    createStudent: (parent, args, ctx) => {
      return ctx.prisma.createStudent({
        data: { name: args.name }
      });
    },
    createTeacher: (parent, args, ctx) => {
      return ctx.prisma.createTeacher({
        data: { name: args.name }
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
