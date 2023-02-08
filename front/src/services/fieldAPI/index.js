import { mockResponse } from '../utils';
import FIELDS from './data';

const getFields = () => [...FIELDS];

const fieldAPI = {
  getFields: mockResponse(getFields),
};

export default fieldAPI