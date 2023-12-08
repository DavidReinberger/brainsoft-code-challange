// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { type default as PokemonClassification } from './PokemonClassification';
import { type default as PokemonClass } from './PokemonClass';
import { type default as NatureType } from './NatureType';
import { type ItemsId } from './Items';

/** Identifier type for public.pokemons */
export type PokemonsId = number & { __brand: 'PokemonsId' };

/** Represents the table public.pokemons */
export default interface Pokemons {
  id: PokemonsId;

  name: string | null;

  classification: PokemonClassification | null;

  'class': PokemonClass | null;

  type: NatureType[] | null;

  resistant: NatureType[] | null;

  weaknesses: NatureType[] | null;

  common_capture_area: string | null;

  favorite: boolean | null;

  height_min: number | null;

  height_max: number | null;

  weight_min: number | null;

  weight_max: number | null;

  flee_rate: number | null;

  evolution_requirement: ItemsId | null;

  evolution_requirement_amount: number | null;

  max_cp: number | null;

  max_hp: number | null;
}

/** Represents the initializer for the table public.pokemons */
export interface PokemonsInitializer {
  /** Default value: nextval('pokemons_id_seq'::regclass) */
  id?: PokemonsId;

  name?: string | null;

  classification?: PokemonClassification | null;

  /** Default value: 'Normal'::pokemon_class */
  'class'?: PokemonClass | null;

  type?: NatureType[] | null;

  resistant?: NatureType[] | null;

  weaknesses?: NatureType[] | null;

  common_capture_area?: string | null;

  /** Default value: false */
  favorite?: boolean | null;

  height_min?: number | null;

  height_max?: number | null;

  weight_min?: number | null;

  weight_max?: number | null;

  flee_rate?: number | null;

  evolution_requirement?: ItemsId | null;

  evolution_requirement_amount?: number | null;

  max_cp?: number | null;

  max_hp?: number | null;
}

/** Represents the mutator for the table public.pokemons */
export interface PokemonsMutator {
  id?: PokemonsId;

  name?: string | null;

  classification?: PokemonClassification | null;

  'class'?: PokemonClass | null;

  type?: NatureType[] | null;

  resistant?: NatureType[] | null;

  weaknesses?: NatureType[] | null;

  common_capture_area?: string | null;

  favorite?: boolean | null;

  height_min?: number | null;

  height_max?: number | null;

  weight_min?: number | null;

  weight_max?: number | null;

  flee_rate?: number | null;

  evolution_requirement?: ItemsId | null;

  evolution_requirement_amount?: number | null;

  max_cp?: number | null;

  max_hp?: number | null;
}