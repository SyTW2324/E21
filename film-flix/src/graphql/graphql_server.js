// index.js
import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import'; 
import resolvers from './resolvers.js';
import '../services/db.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './resolvers.js';

const typeDefs = gql(importSchema('./src/graphql/schema.graphql'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7);
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});