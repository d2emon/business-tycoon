import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App', () => {
  it('renders hello world', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello, world!');  
  });
})
