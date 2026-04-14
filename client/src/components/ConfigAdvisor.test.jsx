import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ConfigAdvisor from './ConfigAdvisor';

describe('ConfigAdvisor Hardware Engine', () => {
  it('should render the empty state initially', () => {
    render(<ConfigAdvisor />);
    // Checks if the initial placeholder text is visible
    expect(screen.getByText(/Awaiting system parameters/i)).toBeInTheDocument();
  });

  it('should generate a suitability score when the user clicks analyze', async () => {
    render(<ConfigAdvisor />);
    
    // Find the submit button and simulate a click
    const submitBtn = screen.getByText(/Analyze Architecture/i);
    fireEvent.click(submitBtn);

    // Wait for the UI to update after the 1200ms timeout
    const scoreTitle = await screen.findByText(/Suitability Index/i, {}, { timeout: 2000 });
    const optimalBadge = await screen.findByText(/Sufficient for 400ms block production/i, {}, { timeout: 2000 });
    
    // Verify the results rendered correctly
    expect(scoreTitle).toBeInTheDocument();
    expect(optimalBadge).toBeInTheDocument();
  });
});