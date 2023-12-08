// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { type PokemonsId } from './Pokemons';
import { type AttacksId } from './Attacks';

/** Identifier type for public.pokemons_attacks */
export type PokemonsAttacksId = string & { __brand: 'PokemonsAttacksId' };

/** Represents the table public.pokemons_attacks */
export default interface PokemonsAttacks {
  id: PokemonsAttacksId;

  pokemon_id: PokemonsId | null;

  attack_id: AttacksId | null;
}

/** Represents the initializer for the table public.pokemons_attacks */
export interface PokemonsAttacksInitializer {
  /** Default value: gen_random_uuid() */
  id?: PokemonsAttacksId;

  pokemon_id?: PokemonsId | null;

  attack_id?: AttacksId | null;
}

/** Represents the mutator for the table public.pokemons_attacks */
export interface PokemonsAttacksMutator {
  id?: PokemonsAttacksId;

  pokemon_id?: PokemonsId | null;

  attack_id?: AttacksId | null;
}