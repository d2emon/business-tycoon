import database from '../database';
import { mockResponse } from '../utils';
import fieldsData, { collectionId } from './data';

(async () => {
  const collection = await database.addCollection(collectionId);
  collection.fill(fieldsData);
})();

const getFields = async () => {
  const collection = await database.getCollection(collectionId);
  return collection
    .query()
    .all();
};

const fieldAPI = {
  getFields: mockResponse('GET /fields/', getFields),
};

export default fieldAPI;
