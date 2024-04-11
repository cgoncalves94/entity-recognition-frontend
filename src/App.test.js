import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AuthPage when not authenticated', () => {
  render(<App />);
  const authPageElements = screen.getAllByText(/Sign in/i);
  expect(authPageElements.length).toBe(2);
});