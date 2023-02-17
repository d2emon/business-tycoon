import {
  mockResponse,
} from '../utils';
import {
  createEvent,
  getEvents,
} from './events';
import {
  addNewPlayer,
} from './players';

const gameAPI = {
  // Events
  createEvent: mockResponse(createEvent),
  getEvents: mockResponse(getEvents),

  // Players
  addNewPlayer: mockResponse(addNewPlayer),
};

export default gameAPI;
