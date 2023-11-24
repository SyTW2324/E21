// index.js
import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import'; 
import resolvers from './resolvers.js';
import '../services/db.js';

const typeDefs = gql(importSchema('./src/graphql/schema.graphql'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});