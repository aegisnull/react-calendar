// Imports
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

const appointmentDetails = { name: 'Test Appointment', time: '2023-02-20T18:45:00+00:00' };
const onClose = () => {};

// To Test
import Modal from './Modal';

// Tests
describe('Renders Modal component correctly', async () => {
  it('Should render Modal title', async () => {
    // Setup
    render(<Modal appointmentDetails={appointmentDetails} onClose={onClose} />);
    const modalTitle = await screen.findByText('Appointment');

    // Expectations
    expect(modalTitle).not.toBeNull();
  });
});
