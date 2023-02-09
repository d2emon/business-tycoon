import { mockResponse } from '../utils';
import FIELDS from './data';

const getFields = () => Object.values(FIELDS);

const fieldAPI = {
  getFields: mockResponse(getFields),
};

export default fieldAPI;
