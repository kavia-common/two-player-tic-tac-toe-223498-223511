import { render, screen } from '@testing-library/react';
import App from './App';

test("renders status indicator", () => {
  render(<App />);
  const status = screen.getByText(/'s turn|wins|Draw/i);
  expect(status).toBeInTheDocument();
});
