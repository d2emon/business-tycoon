import * as CODES from './codes';

// Event creators

const adminMessage = (message) => ({
  code: CODES.ADMIN_MESSAGE,
  payload: message,
});

const localMessage = (sender, channelId, message) => ({
  code: CODES.LOCAL_MESSAGE,
  channelId,
  sender,
  payload: message,
});

// Event senders

const eventEnterGame = (player) => {
  const {
    channelId,
    name,
    userId,
  } = player;

  return [
    // TODO: Hide messages for hidden players
    adminMessage(`${name} входит в игру`),
    localMessage(
      userId,
      channelId,
      `${name} входит в игру`,
    ),
  ];
};

const senders = {
  eventEnterGame,
};

export default senders;
