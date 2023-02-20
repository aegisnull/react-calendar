// Imports
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// To Test
import Calendar from './Calendar';

// Tests
describe('Renders main page correctly', async () => {
  it('Should render Back and Next Buttons', async () => {
    // Setup
    render(<Calendar />);
    const backButton = await screen.findByText('Back');
    const nextButton = await screen.findByText('Next');

    // Expectations
    expect(backButton).not.toBeNull();
    expect(nextButton).not.toBeNull();
  });

  it('Should render Today Button', async () => {
    // Setup
    render(<Calendar />);
    const todayButton = await screen.findByText('Today');

    // Expectations
    expect(todayButton).not.toBeNull();
  });
});
