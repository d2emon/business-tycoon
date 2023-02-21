import { Subcollection } from '../../database/collection';

export const Event = (values) => ({
  id: null,
  timestamp: 0,
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

const Events = (items) => {
  const collection = Subcollection(items);

  const getLastEvent = async () => {
    const events = await collection
      .query()
      .all();

    return events.reduce(
      (lastEvent, event) => ((event.timestamp > lastEvent) ? event.timestamp : lastEvent),
      0,
    );
  };

  const getLaterThen = async (timestamp) => {
    if (timestamp === null) {
      return [];
    }

    return collection
      .query()
      .find((event) => (event.timestamp >= timestamp))
      .sort((a, b) => (b.timestamp - a.timestamp))
      .all();
  };

  const addEvent = async (value) => {
    const timestamp = await getLastEvent();

    return collection
      .addItem(Event({
        id: timestamp,
        timestamp,
        ...value,
      }));
  };

  return {
    ...collection,
    addEvent,
    getLastEvent,
    getLaterThen,
  };
};

export default Events;
