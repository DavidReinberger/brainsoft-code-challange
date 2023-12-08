# "Domácí úkol" pro brainsoft s.r.o.

Bohužel jsem se úkolu dostal později než jsem chtěl, měl jsem několik dotazů, které by mi pomohly při vypracování a hlavně zkrátili čas.

- Jak moc má být řešení robustní/rozšířitelné?

V případě, kdy by nebylo potřeba rozbíjet pokemona na entity, vybral bych mongodb + prisma, pročistil jednodušše data (např. commonCaptureArea), introspectnul a měl schema databáze.

- Může mít pokemon jiné než metrické jednotky?
- Může pokemon mít víc "requirements" na evoluci?
- Může mít `attack` u každého pokemona jiný damage?

Použitý stack je stejný jako v readme zadání.

## První spuštění

1. `npm ci`
2. `docker-compose up`
3. `npm run knex:migrate:up`  
4. `npm run knex:seed:run`
5. `npm run ts-dev` 

GraphQl server běží na `localhost:4000/graphql`.

## Poznámky:

## Schema Databáze

- některé pole pro pokemony a útoky jsou naimplemontovány jako ENUMy. Jsem zvyklý používat generátory ze schémat (ať už GraphQl code gen na FE nebo mít schéma databáze vygenerování na BE).

## Modely

- asi největší pain u modelů je funkce `processPGArrayToArray`, nanašel jsem způsob jak genericky procesovat array z databaze do js array

### Testy

Bohužel mi nezbyl čas na setup a napsání testů, nicméně kdybych byl setup hotový, otestoval bych následující:
- Unit Test na helper `processPGArrayToArray`
- Integration testy pro Query Resolvery a Favorite Mutace, že vrací data, které chceme
