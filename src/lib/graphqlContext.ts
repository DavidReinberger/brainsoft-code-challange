import { BaseContext } from '@apollo/server';
import { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import db from '~services/database';
import { Pokemon } from '~domains/pokemon/models/Pokemon.model';
import { PokemonsAttacks } from '~domains/pokemon/models/PokemonsAttacks.model';

export interface ContextServices {
  db: typeof db
}

export interface ContextModels {
  pokemon: typeof Pokemon;
  pokemonsAttacks: typeof PokemonsAttacks
}

export interface AppContext extends BaseContext {
  services: ContextServices
  models: ContextModels
}

// A Dependency injection container would be a better choice for a bigger project
const context: ApolloFastifyContextFunction<AppContext> = async () => ({
  services: { db },
  models: {
    pokemon: Pokemon,
    pokemonsAttacks: PokemonsAttacks,
  },
});

export default context;
