import { ApolloServer } from '@apollo/server';
import { fastifyApolloDrainPlugin } from '@as-integrations/fastify';
import schema from '~lib/schema';
import { AppContext } from '~lib/graphqlContext';
import server from './server';

const apollo = new ApolloServer<AppContext>({
  schema,
  plugins: [
    fastifyApolloDrainPlugin(server),
  ],
});

export default apollo;
