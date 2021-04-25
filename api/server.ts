import express from 'express';
import cors from 'cors';
import router from './routes';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './controllers/graphql/index';

const port = 8000;
const server: express.Application = express();
const app = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

app.start();
app.applyMiddleware({ app: server });
server.use(cors());
server.use(router);

server.listen(port, () => {
  console.log(`Server listen on port ${port} && ${app.graphqlPath} for graphql playground`);
});
