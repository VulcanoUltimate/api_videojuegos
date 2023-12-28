import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {Videogame, VideogameRelations} from '../models';

export class VideogameRepository extends DefaultCrudRepository<
  Videogame,
  typeof Videogame.prototype.id,
  VideogameRelations
> {
  constructor(
    @inject('datasources.postgreSQL') dataSource: PostgreSqlDataSource,
  ) {
    super(Videogame, dataSource);
  }
}
