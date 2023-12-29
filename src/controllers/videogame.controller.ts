import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Videogame} from '../models';
import {VideogameRepository} from '../repositories';

export class VideogameController {
  constructor(
    @repository(VideogameRepository)
    public videogameRepository : VideogameRepository,
  ) {}

  @post('/videogames')
  @response(200, {
    description: 'Videogame model instance',
    content: {'application/json': {schema: getModelSchemaRef(Videogame)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Videogame, {
            title: 'NewVideogame',
            exclude: ['id'],
          }),
        },
      },
    })
    videogame: Omit<Videogame, 'id'>,
  ): Promise<Videogame> {
    return this.videogameRepository.create(videogame);
  }

  @get('/videogames/count')
  @response(200, {
    description: 'Videogame model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Videogame) where?: Where<Videogame>,
  ): Promise<Count> {
    return this.videogameRepository.count(where);
  }

  @get('/videogames')
  @response(200, {
    description: 'Array of Videogame model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Videogame, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Videogame) filter?: Filter<Videogame>,
  ): Promise<Videogame[]> {
    return this.videogameRepository.find(filter);
  }

  @patch('/videogames')
  @response(200, {
    description: 'Videogame PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Videogame, {partial: true}),
        },
      },
    })
    videogame: Videogame,
    @param.where(Videogame) where?: Where<Videogame>,
  ): Promise<Count> {
    return this.videogameRepository.updateAll(videogame, where);
  }

  @get('/videogames/{id}')
  @response(200, {
    description: 'Videogame model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Videogame, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Videogame, {exclude: 'where'}) filter?: FilterExcludingWhere<Videogame>
  ): Promise<Videogame> {
    return this.videogameRepository.findById(id, filter);
  }

  @patch('/videogames/{id}')
  @response(204, {
    description: 'Videogame PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Videogame, {partial: true}),
        },
      },
    })
    videogame: Videogame,
  ): Promise<void> {
    await this.videogameRepository.updateById(id, videogame);
  }

  @put('/videogames/{id}')
  @response(204, {
    description: 'Videogame PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() videogame: Videogame,
  ): Promise<void> {
    await this.videogameRepository.replaceById(id, videogame);
  }

  @del('/videogames/{id}')
  @response(204, {
    description: 'Videogame DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.videogameRepository.deleteById(id);
  }
}
