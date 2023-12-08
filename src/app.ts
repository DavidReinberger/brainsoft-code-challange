import './lib/dotenv';
import fastifyApollo from '@as-integrations/fastify';
import * as process from 'process';
import apollo from '~services/apollo';
import server from '~services/server';
import context from '~lib/graphqlContext';

(async () => {
  await apollo.start();

  await server.register(
    fastifyApollo(apollo),
    { context },
  );

  const port = process.env.PORT || 4000;

  await server.listen(port);

  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
})();
