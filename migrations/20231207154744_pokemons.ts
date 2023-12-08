import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').raw('CREATE TYPE pokemon_class AS ENUM (\'Normal\', \'Rare\', \'Legendary\', \'Mythic\')');
  await knex.schema.withSchema('public').raw('CREATE TYPE pokemon_classification AS ENUM (\'Seed\', \'Lizard\', \'Flame\', \'Tiny Turtle\', \'Turtle\', \'Shellfish\', \'Worm\', \'Cocoon\', \'Butterfly\', \'Hairy\', \'Poison Bee\', \'Tiny Bird\', \'Bird\', \'Mouse\', \'Beak\', \'Snake\', \'Cobra\', \'Poison Pin\', \'Drill\', \'Fairy\', \'Fox\', \'Balloon\', \'Bat\', \'Weed\', \'Flower\', \'Mushroom\', \'Insect\', \'Poison Moth\', \'Mole\', \'Scratch Cat\', \'Classy Cat\', \'Duck\', \'Pig Monkey\', \'Puppy\', \'Legendary\', \'Tadpole\', \'Psi\', \'Superpower\', \'Flycatcher\', \'Jellyfish\', \'Rock\', \'Megaton\', \'Fire Horse\', \'Dopey\', \'Hermit Crab\', \'Magnet\', \'Wild Duck\', \'Twin Bird\', \'Triple Bird\', \'Sea Lion\', \'Sludge\', \'Bivalve\', \'Gas\', \'Shadow\', \'Rock Snake\', \'Hypnosis\', \'River Crab\', \'Pincer\', \'Ball\', \'Egg\', \'Coconut\', \'Lonely\', \'Bone Keeper\', \'Kicking\', \'Punching\', \'Licking\', \'Poison Gas\', \'Spikes\', \'Vine\', \'Parent\', \'Dragon\', \'Goldfish\', \'Starshape\', \'Mysterious\', \'Barrier\', \'Mantis\', \'Humanshape\', \'Electric\', \'Spitfire\', \'Stagbeetle\', \'Wild Bull\', \'Fish\', \'Atrocious\', \'Transport\', \'Transform\', \'Evolution\', \'Bubble Jet\', \'Lightning\', \'Virtual\', \'Spiral\', \'Fossil\', \'Sleeping\', \'Freeze\', \'Genetic\', \'New Species\')');
  await knex.schema.withSchema('public').raw('CREATE TYPE nature_type AS ENUM (\'Normal\', \'Grass\', \'Poison\', \'Fire\', \'Flying\', \'Dragon\', \'Water\', \'Dark\', \'Ice\', \'Steel\', \'Bug\', \'Psychic\', \'Ground\', \'Electric\', \'Fighting\', \'Rock\', \'Fairy\', \'Ghost\')');
  await knex.schema.withSchema('public').raw('CREATE TYPE attack_type AS ENUM (\'Fast\', \'Special\')');

  await knex.schema.withSchema('public').createTableIfNotExists('pokemons', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.specificType('classification', 'pokemon_classification');
    table.specificType('class', 'pokemon_class').defaultTo('Normal');
    table.specificType('type', 'nature_type[]');
    table.specificType('resistant', 'nature_type[]');
    table.specificType('weaknesses', 'nature_type[]');
    table.string('common_capture_area').nullable();
    table.boolean('favorite').defaultTo(false);

    // Since the world is a chaotic place, and americans use stupid units,
    // normally I would also create a "height/weight_unit" to represent either m/ft, kg/pounds etc.
    // For the sake of this exercise I'm going to assume we live in an ideal world
    // where metric system is king
    table.float('height_min');
    table.float('height_max');

    table.float('weight_min');
    table.float('weight_max');

    table.float('flee_rate');

    // The dataset indicates that a single pokemon
    // needs single type of "item" as evolution requirement
    // For the sake of this exercise I'm going to assume that is the case
    // In "real" world this would probably be better implemented
    // as a separate table (pokemon_id|requirement_id|amount)
    table.uuid('evolution_requirement_id');
    table.integer('evolution_requirement_amount');

    table.integer('max_cp');
    table.integer('max_hp');
  });

  await knex.schema.withSchema('public').createTableIfNotExists('items', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name').unique();
  });

  await knex.schema.withSchema('public').createTableIfNotExists('pokemons_evolutions', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.integer('evolution_id');
    table.integer('pokemon_id');
  });

  await knex.schema.withSchema('public').createTableIfNotExists('pokemons_attacks', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.integer('pokemon_id');
    table.uuid('attack_id');
  });

  await knex.schema.withSchema('public').createTableIfNotExists('attacks', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name');
    table.specificType('nature', 'nature_type');
    table.specificType('type', 'attack_type');

    // The dataset again indicates, that each attack has the same amount of damage
    // on every pokemon. For the sake of this exercise I'm going to assume that is the case.
    // In the event that this is not true, it can be implemented
    // in the one-to-many relationship table as a "damage" column
    table.integer('damage');

    table.unique(['name', 'nature', 'type']);
  });

  await knex.schema.withSchema('public').alterTable('pokemons', (table) => {
    table.foreign('evolution_requirement_id').references('id').inTable('items');
  });

  await knex.schema.withSchema('public').alterTable('pokemons_evolutions', (table) => {
    table.foreign('pokemon_id').references('id').inTable('pokemons');
    table.foreign('evolution_id').references('id').inTable('pokemons');
  });

  await knex.schema.withSchema('public').alterTable('pokemons_attacks', (table) => {
    table.foreign('pokemon_id').references('id').inTable('pokemons');
    table.foreign('attack_id').references('id').inTable('attacks');
  });
}

export async function down(): Promise<void> {}
