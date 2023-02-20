import database from '../database';
import withGame, { eventsCollectionId } from './withGame';

(async () => {
  await database.addCollection(eventsCollectionId);
})();

const Event = (values) => ({
  gameId: null,
  id: null,
  /*
  channelId: DEFAULT_CHANNEL,
  eventId: null,
  name: null,
  userId: null,
  //
  money: 60000,
  position: '1',
  //
  */
  ...values,
});

const getLastEventId = withGame(async (context) => {
  const {
    eventsCollection,
  } = context;

  const events = await eventsCollection
    .query()
    .all();
  return events.reduce(
    (lastEventId, event) => ((event.id > lastEventId) ? event.id : lastEventId),
    0,
  );
});

export const createEvent = withGame(async (context, data) => {
  const {
    eventsCollection,
    getLastUpdate,
    setLastUpdate,
  } = context;
  const {
    gameId,
    event,
    onUpdate,
  } = data;

  eventsCollection.addItem(Event(event));

  const lastEventId = await getLastEventId({
    gameId,
  });
  const lastUpdate = getLastUpdate();
  if ((lastEventId - lastUpdate) > 100) {
    onUpdate();
    setLastUpdate(lastEventId);
  }
});

export const getEvents = withGame(async (context, data) => {
  const {
    eventsCollection,
    playersCollection,
  } = context;
  const {
    eventId,
    playerId,
  } = data;

  const lastEventId = await getLastEventId();
  playersCollection.update(playerId, {
    eventId: lastEventId,
  });

  if (eventId === null) {
    return [];
  }

  return eventsCollection
    .query()
    .find((event) => (event.id >= eventId))
    .sort((a, b) => (b.eventId - a.eventId))
    .all();
});
