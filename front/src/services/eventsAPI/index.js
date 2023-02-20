import gameAPI from '../gameAPI';
import { mockResponse } from '../utils';

const sendAll = (callback) => (data) => {
  const {
    gameId,
  } = data;

  const events = callback(data);

  events.forEach((event) => gameAPI.createEvent({
    gameId,
    event,
  }));
};

const LOCAL_MESSAGE = -10000;
const ADMIN_MESSAGE = -10113;

const localMessage = (sender, channelId, message) => ({
  code: LOCAL_MESSAGE,
  channelId,
  sender,
  payload: message,
});

const adminMessage = (message) => ({
  code: ADMIN_MESSAGE,
  payload: message,
});

const eventEnterGame = sendAll((data) => {
  const {
    player: {
      channelId,
      name,
      userId,
    },
  } = data;

  return [
    // TODO: Hide messages for hidden players
    adminMessage(`${name} входит в игру`),
    localMessage(
      userId,
      channelId,
      `${name} входит в игру`,
    ),
  ];
});

const eventsAPI = {
  eventEnterGame: mockResponse('POST event/enterGame/', eventEnterGame),
};

export default eventsAPI;
