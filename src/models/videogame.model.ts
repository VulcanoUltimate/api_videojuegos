import {Entity, model, property} from '@loopback/repository';

@model()
export class Videogame extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  acronym: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  developer: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;


  constructor(data?: Partial<Videogame>) {
    super(data);
  }
}

export interface VideogameRelations {
  // describe navigational properties here
}

export type VideogameWithRelations = Videogame & VideogameRelations;
