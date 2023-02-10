import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorCard from './index';

describe('ErrorCard', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('shows messages', () => {
    render((
      <ErrorCard
        messages="MESSAGES"
      >
        Message
      </ErrorCard>
    ));

    expect(screen.getByTestId('messages'))
      .toHaveTextContent('MESSAGES');

    expect(screen.getByTestId('errorMessage'))
      .toHaveTextContent('Message');
  });
});
