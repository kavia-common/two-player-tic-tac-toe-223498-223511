import { render, screen } from '@testing-library/react';
import App from './App';

test("renders status indicator", () => {
  render(<App />);
  // Status can include annotations like (You) or (AI) now
  const status = screen.getByText(/'s turn|wins|Draw/i);
  expect(status).toBeInTheDocument();
});
