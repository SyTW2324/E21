// index.js
import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import'; 
import resolvers from './resolvers';

const typeDefs = gql(importSchema('./schema.graphql'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url } : any) => {
  console.log(`Server ready at ${url}`);
});