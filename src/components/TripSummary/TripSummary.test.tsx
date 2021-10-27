import React from 'react';
import { render, screen } from '@testing-library/react';
import TripSummary from './TripSummary';

test('renders learn react link', () => {
  render(<TripSummary />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
