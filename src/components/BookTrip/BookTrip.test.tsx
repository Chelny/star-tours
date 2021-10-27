import React from 'react';
import { render, screen } from '@testing-library/react';
import BookTrip from './BookTrip';

test('renders learn react link', () => {
  render(<BookTrip />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
