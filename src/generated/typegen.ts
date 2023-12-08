/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { AppContext } from "./../lib/graphqlContext"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  Class: "Legendary" | "Mythic" | "Normal" | "Rare"
  Classification: "Atrocious" | "Ball" | "Balloon" | "Barrier" | "Bat" | "Beak" | "Bird" | "Bivalve" | "Bone Keeper" | "Bubble Jet" | "Butterfly" | "Classy Cat" | "Cobra" | "Coconut" | "Cocoon" | "Dopey" | "Dragon" | "Drill" | "Duck" | "Egg" | "Electric" | "Evolution" | "Fairy" | "Fire Horse" | "Fish" | "Flame" | "Flower" | "Flycatcher" | "Fossil" | "Fox" | "Freeze" | "Gas" | "Genetic" | "Goldfish" | "Hairy" | "Hermit Crab" | "Humanshape" | "Hypnosis" | "Insect" | "Jellyfish" | "Kicking" | "Legendary" | "Licking" | "Lightning" | "Lizard" | "Lonely" | "Magnet" | "Mantis" | "Megaton" | "Mole" | "Mouse" | "Mushroom" | "Mysterious" | "New Species" | "Parent" | "Pig Monkey" | "Pincer" | "Poison Bee" | "Poison Gas" | "Poison Moth" | "Poison Pin" | "Psi" | "Punching" | "Puppy" | "River Crab" | "Rock" | "Rock Snake" | "Scratch Cat" | "Sea Lion" | "Seed" | "Shadow" | "Shellfish" | "Sleeping" | "Sludge" | "Snake" | "Spikes" | "Spiral" | "Spitfire" | "Stagbeetle" | "Starshape" | "Superpower" | "Tadpole" | "Tiny Bird" | "Tiny Turtle" | "Transform" | "Transport" | "Triple Bird" | "Turtle" | "Twin Bird" | "Vine" | "Virtual" | "Weed" | "Wild Bull" | "Wild Duck" | "Worm"
  Nature: "Bug" | "Dark" | "Dragon" | "Electric" | "Fairy" | "Fighting" | "Fire" | "Flying" | "Ghost" | "Grass" | "Ground" | "Ice" | "Normal" | "Poison" | "Psychic" | "Rock" | "Steel" | "Water"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Attack: { // root type
    damage: number; // Int!
    name: string; // String!
    type: NexusGenEnums['Nature']; // Nature!
  }
  Attacks: { // root type
    fast: Array<NexusGenRootTypes['Attack'] | null>; // [Attack]!
    special: Array<NexusGenRootTypes['Attack'] | null>; // [Attack]!
  }
  EvolutionRequirement: { // root type
    amount: number; // Int!
    name: string; // String!
  }
  MinMax: { // root type
    maximum: string; // String!
    minimum: string; // String!
  }
  Mutation: {};
  Pokemon: { // root type
    class: NexusGenEnums['Class']; // Class!
    classification: NexusGenEnums['Classification']; // Classification!
    commonCaptureArea?: string | null; // String
    favorite: boolean; // Boolean!
    fleeRate: number; // Float!
    height: NexusGenRootTypes['MinMax']; // MinMax!
    id: number; // Int!
    maxCP: number; // Int!
    maxHP: number; // Int!
    name: string; // String!
    resistances: Array<NexusGenEnums['Nature'] | null>; // [Nature]!
    types: Array<NexusGenEnums['Nature'] | null>; // [Nature]!
    weight: NexusGenRootTypes['MinMax']; // MinMax!
  }
  PokemonList: { // root type
    count: number; // Int!
    list: Array<NexusGenRootTypes['Pokemon'] | null>; // [Pokemon]!
    totalPages: number; // Int!
  }
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Attack: { // field return type
    damage: number; // Int!
    name: string; // String!
    type: NexusGenEnums['Nature']; // Nature!
  }
  Attacks: { // field return type
    fast: Array<NexusGenRootTypes['Attack'] | null>; // [Attack]!
    special: Array<NexusGenRootTypes['Attack'] | null>; // [Attack]!
  }
  EvolutionRequirement: { // field return type
    amount: number; // Int!
    name: string; // String!
  }
  MinMax: { // field return type
    maximum: string; // String!
    minimum: string; // String!
  }
  Mutation: { // field return type
    TriggerFavorite: NexusGenRootTypes['Pokemon']; // Pokemon!
  }
  Pokemon: { // field return type
    attacks: NexusGenRootTypes['Attacks']; // Attacks!
    class: NexusGenEnums['Class']; // Class!
    classification: NexusGenEnums['Classification']; // Classification!
    commonCaptureArea: string | null; // String
    evolutionRequirements: NexusGenRootTypes['EvolutionRequirement'] | null; // EvolutionRequirement
    evolutions: Array<NexusGenRootTypes['Pokemon'] | null>; // [Pokemon]!
    favorite: boolean; // Boolean!
    fleeRate: number; // Float!
    height: NexusGenRootTypes['MinMax']; // MinMax!
    id: number; // Int!
    maxCP: number; // Int!
    maxHP: number; // Int!
    name: string; // String!
    previousEvolutions: Array<NexusGenRootTypes['Pokemon'] | null>; // [Pokemon]!
    resistances: Array<NexusGenEnums['Nature'] | null>; // [Nature]!
    types: Array<NexusGenEnums['Nature'] | null>; // [Nature]!
    weaknesses: Array<NexusGenEnums['Nature'] | null>; // [Nature]!
    weight: NexusGenRootTypes['MinMax']; // MinMax!
  }
  PokemonList: { // field return type
    count: number; // Int!
    list: Array<NexusGenRootTypes['Pokemon'] | null>; // [Pokemon]!
    totalPages: number; // Int!
  }
  Query: { // field return type
    ListPokemon: NexusGenRootTypes['PokemonList']; // PokemonList!
    PokemonNatures: Array<NexusGenEnums['Nature'] | null>; // [Nature]!
    SearchPokemon: NexusGenRootTypes['Pokemon'] | null; // Pokemon
  }
}

export interface NexusGenFieldTypeNames {
  Attack: { // field return type name
    damage: 'Int'
    name: 'String'
    type: 'Nature'
  }
  Attacks: { // field return type name
    fast: 'Attack'
    special: 'Attack'
  }
  EvolutionRequirement: { // field return type name
    amount: 'Int'
    name: 'String'
  }
  MinMax: { // field return type name
    maximum: 'String'
    minimum: 'String'
  }
  Mutation: { // field return type name
    TriggerFavorite: 'Pokemon'
  }
  Pokemon: { // field return type name
    attacks: 'Attacks'
    class: 'Class'
    classification: 'Classification'
    commonCaptureArea: 'String'
    evolutionRequirements: 'EvolutionRequirement'
    evolutions: 'Pokemon'
    favorite: 'Boolean'
    fleeRate: 'Float'
    height: 'MinMax'
    id: 'Int'
    maxCP: 'Int'
    maxHP: 'Int'
    name: 'String'
    previousEvolutions: 'Pokemon'
    resistances: 'Nature'
    types: 'Nature'
    weaknesses: 'Nature'
    weight: 'MinMax'
  }
  PokemonList: { // field return type name
    count: 'Int'
    list: 'Pokemon'
    totalPages: 'Int'
  }
  Query: { // field return type name
    ListPokemon: 'PokemonList'
    PokemonNatures: 'Nature'
    SearchPokemon: 'Pokemon'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    TriggerFavorite: { // args
      pokemonId?: number | null; // Int
    }
  }
  Query: {
    ListPokemon: { // args
      favorite?: boolean | null; // Boolean
      limit?: number | null; // Int
      name?: string | null; // String
      nature?: NexusGenEnums['Nature'] | null; // Nature
      skip?: number | null; // Int
    }
    SearchPokemon: { // args
      name?: string | null; // String
      number?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: AppContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}