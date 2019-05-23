const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

const { prisma } = require("./generated/prisma-client");

// Import schema using Prisma Datamodel
const typeDefs = importSchema("./generated/prisma-client/schema.graphql");

// Create a Resolver to
const resolvers = {
  Query: {
    users: (parent, args, ctx, info) => ctx.prisma.users()
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
