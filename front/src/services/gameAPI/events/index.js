import withGame from '../withGame';

export const createEvent = withGame(async (context, data) => {
  const {
    game,
  } = context;

  const {
    event,
  } = data;

  return game
    .events
    .addEvent(event);
});

export const getEvents = withGame(async (context, data) => {
  const {
    game,
  } = context;

  const {
    playerId,
    timestamp,
  } = data;

  const lastEvent = await game
    .events
    .getLastEvent();

  const events = game
    .events
    .getLaterThen(timestamp)
    .all();

  game
    .players
    .update(playerId, {
      eventId: lastEvent,
    });

  return events;
});
