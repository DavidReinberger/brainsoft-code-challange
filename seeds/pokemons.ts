import { Knex } from 'knex';
import fs from 'fs';
import path from 'path';
// import { __dirname } from '~lib/__dirname';
import { Pokemon } from '~domains/pokemon/models/Pokemon.model';
import { Items } from '~domains/pokemon/models/Items.model';
import { Attacks } from '~domains/pokemon/models/Attacks.model';
import NatureType from '~generated/public/NatureType';
import AttackType from '~generated/public/AttackType';

const file = fs.readFileSync(path.join(__dirname, '../pokemons.json')).toString();
const pokemons = JSON.parse(file);

const evolutions = new Map<number, number[]>();
const attacksSet = new Set<string>();
const pokemonsAttacks = new Map<number, string[]>();
const itemsSet = new Set<string>();
const pokemonItem = new Map<number, string>();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const transformedPokemons = pokemons.map(({
  id: pokemonId,
  weight,
  height,
  evolutionRequirements,
  maxCP,
  maxHP,
  attacks,
  types,
  evolutions: pokemonEvolutions,
  LEGENDARY,
  MYTHIC,
  classification,
  ...pokemon
}) => {
  const pokemonNumber = parseInt(pokemonId, 10);

  evolutions.set(pokemonNumber, [
    ...(pokemon['Previous evolution(s)'] ?? []).map(({ id }) => id),
    ...(pokemonEvolutions ?? []).map(({ id }) => id),
  ]);

  // eslint-disable-next-line no-param-reassign
  delete pokemon['Previous evolution(s)'];
  // eslint-disable-next-line no-param-reassign
  delete pokemon['Pokémon Class'];

  const commonCaptureAreaInfo = pokemon['Common Capture Area'] as string;
  let commonCaptureArea;

  if (commonCaptureAreaInfo) {
    // eslint-disable-next-line no-param-reassign
    delete pokemon['Common Capture Area'];
    commonCaptureArea = commonCaptureAreaInfo.match(/: .+/gi)[0].replace(': ', '');
    // eslint-disable-next-line no-param-reassign
    delete pokemon[commonCaptureArea];
  }

  attacks.fast.forEach(({
    name,
    type,
    damage,
  }) => {
    const attackKey = `${name}-${type}-${damage}-fast`;
    attacksSet.add(attackKey);
    const currentAttacks = pokemonsAttacks.get(pokemonNumber) ?? [];
    pokemonsAttacks.set(pokemonNumber, [...currentAttacks, attackKey]);
  });

  attacks.special.forEach(({
    name,
    type,
    damage,
  }) => {
    const attackKey = `${name}-${type}-${damage}-special`;
    attacksSet.add(attackKey);
    const currentAttacks = pokemonsAttacks.get(pokemonNumber) ?? [];
    pokemonsAttacks.set(pokemonNumber, [...currentAttacks, attackKey]);
  });

  if (evolutionRequirements) {
    pokemonItem.set(pokemonNumber, evolutionRequirements.name);
    itemsSet.add(evolutionRequirements.name);
  }

  return ({
    weightMin: parseFloat(weight.minimum.replace(/[a-z]+/gi, '')),
    weightMax: parseFloat(weight.maximum.replace(/[a-z]+/gi, '')),
    heightMin: parseFloat(height.minimum.replace(/[a-z]+/gi, '')),
    heightMax: parseFloat(height.maximum.replace(/[a-z]+/gi, '')),
    maxCp: maxCP,
    maxHp: maxHP,
    type: types,
    classification: classification.replace(' Pokémon', ''),
    ...(commonCaptureArea ? { common_capture_area: commonCaptureArea } : {}),
    ...(evolutionRequirements ? { evolution_requirement_amount: evolutionRequirements.amount } : {}),
    ...(LEGENDARY ? { class: 'Legendary' } : {}),
    ...(MYTHIC ? { class: 'Mythic' } : {}),
    ...pokemon,
  });
});

export async function seed(knex: Knex): Promise<void> {
  const insertedItems = await Items.query(knex).insert([...itemsSet].map((item) => ({ name: item }))).returning('*');

  console.log(`Inserted Items: ${insertedItems.length}`);

  const insertedAttacks = await Attacks.query(knex).insert([...attacksSet].map((attack) => {
    const [name, nature, damage, type] = attack.split('-');
    return {
      name,
      nature: nature as NatureType,
      damage: parseInt(damage, 10),
      type: capitalizeFirstLetter(type) as AttackType,
    };
  })).returning('*');

  console.log(`Inserted Attacks: ${insertedAttacks.length}`);

  const insertedPokemons = await Pokemon.query(knex).insert([...transformedPokemons]).returning('*');
  console.log(`Inserted Pokemons: ${insertedPokemons.length}`);

  const promisesEvolutions = [...evolutions.entries()].map(([pokemon, pokemonEvolutions]) => Pokemon.relatedQuery('evolutions', knex).for(pokemon).relate(pokemonEvolutions).returning('*'));

  try {
    await Promise.all(promisesEvolutions);
  } catch (e) {
    console.log(e);
  }

  console.log('Linked Evolutions');

  const promisesItems = [...pokemonItem.entries()].map(([pokemonId, item]) => {
    const itemId = insertedItems.find(({ name }) => name === item).id;
    return Items.relatedQuery('pokemon', knex).for(itemId).relate(pokemonId);
  });
  try {
    await Promise.all(promisesItems);
  } catch (e) {
    console.log(e);
  }
  console.log('Linked Items');

  const promisesAttacks = [...pokemonsAttacks.entries()].map(([pokemonId, attacks]) => {
    const attackIds = attacks.map((attack) => {
      // names are uniq
      const [_name] = attack.split('-');
      return insertedAttacks.find(({ name }) => name === _name).id;
    });
    return Pokemon.relatedQuery('attacks', knex).for(pokemonId).relate(attackIds);
  });
  try {
    await Promise.all(promisesAttacks);
  } catch (e) {
    console.log(e);
  }
  console.log('Linked Attacks');
}
