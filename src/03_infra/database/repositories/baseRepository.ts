import { Document, Model, Types, DocumentQuery, MongooseFilterQuery } from 'mongoose';

class BaseRepository {
  _model: Model<Document>;

  constructor(model: Model<Document>) {
    this._model = model;
  }

  get(skip = 0, limit = 10, query: MongooseFilterQuery<unknown>): DocumentQuery<Document[], Document, unknown> {
    return this._model.find(query).skip(skip).limit(limit);
  }

  getOneById(id: Types.ObjectId | string): DocumentQuery<Document | null, Document, unknown> {
    return this._model.findById(id);
  }

  getOne(query: MongooseFilterQuery<unknown>): DocumentQuery<Document | null, Document, unknown> {
    return this._model.findOne(query);
  }

  create(model: unknown): Promise<Document> {
    return new this._model(model).save();
  }

  async count(query: MongooseFilterQuery<unknown>): Promise<number> {
    return await this._model.estimatedDocumentCount(query);
  }
}

export default BaseRepository;
