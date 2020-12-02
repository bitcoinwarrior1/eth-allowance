import { render, screen } from '@testing-library/react';
import allowance from './components/allowance';

test('renders learn react link', () => {
  render(<header />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
