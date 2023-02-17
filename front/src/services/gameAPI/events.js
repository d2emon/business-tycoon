import withGame from './withGame';

export const createEvent = withGame((context, data) => {
  const {
    appendEvent,
  } = context;

  const {
    event,
  } = data;

  appendEvent(
    event,
    () => {
      // TODO: Cleanup events
      // TODO: Perform onUpdate events
    },
  );
});

export const getEvents = withGame((context, data) => {
  const {
    events,
    getEventId,
    updatePlayer,
  } = context;

  const {
    eventId,
    playerId,
  } = data;

  updatePlayer(playerId, {
    eventId: getEventId(),
  });

  if (eventId === null) {
    return [];
  }

  return events
    .filter((event) => (event.id >= eventId))
    .sort((a, b) => (b.eventId - a.eventId));
});
