import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Game from './index';

const onStart = jest.fn();

describe('Main method', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('throws error on no user', () => {
    render((
      <Game
        userId="USER_ID"
        onStart={onStart}
      >
        Content
      </Game>
    ));

    expect(screen.getByTestId('error'))
      .toHaveTextContent('Пользователь не найден!');

    expect(screen.queryByTestId('main'))
      .toBeNull();

    expect(onStart.mock.calls)
      .toHaveLength(0);
  });

  it('throws error on no user id', () => {
    render((
      <Game
        user="USER"
        onStart={onStart}
      >
        Content
      </Game>
    ));

    expect(screen.getByTestId('error'))
      .toHaveTextContent('Пользователь не найден!');

    expect(screen.queryByTestId('main'))
      .toBeNull();

    expect(onStart.mock.calls)
      .toHaveLength(0);
  });

  it('is runned by custom user', async () => {
    render((
      <Game
        name="USER"
        userId="USER_ID"
        onStart={onStart}
      >
        Content
      </Game>
    ));

    expect(screen.queryByTestId('error'))
      .toBeNull();

    const loaded = within(await screen.findByTestId('main'));

    expect(loaded.getByTestId('greetings'))
      .toHaveTextContent('Добро пожаловать, USER!');

    expect(loaded.getByTestId('game'))
      .toHaveTextContent('Content');

    expect(onStart.mock.calls)
      .toHaveLength(1);

    expect(onStart.mock.calls[0])
      .toEqual(['USER_ID', 'USER']);
  });
});
