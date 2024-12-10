import { describe, test, expect, beforeEach } from '@jest/globals';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // for additional matchers
import App from '../../App'; // Adjust the import path if necessary

describe('Flashcards Application Tests', () => {
  beforeEach(() => {
    // Render the main application before each test
    render(<App />);
  });

  test('1.3: Displays home page with flashcards and preview pane', () => {
    // Check for the preview pane text
    const previewPane = screen.getByText(/Select a tag to preview/i);
    expect(previewPane).toBeInTheDocument();

    // Check for the flashcards list
    const flashcardList = screen.getByRole('list'); // Ensure your list has the correct role
    expect(flashcardList).toBeInTheDocument();
  });

  test('2.1 - 2.4: Add button opens modal and allows text input; cancels without modification', async () => {
    // Click Add button
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    // Modal appears
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    // Fill in front text and cancel
    const frontInput = screen.getByPlaceholderText(/front/i); // Adjust placeholder if necessary
    fireEvent.change(frontInput, { target: { value: 'Scheme' } });
    expect(frontInput.value).toBe('Scheme');

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Ensure modal closes and list remains unchanged
    await waitFor(() => expect(modal).not.toBeInTheDocument());
    expect(screen.queryByText('Scheme')).not.toBeInTheDocument(); // Validate "Scheme" not added
  });

  test('2.5 - 4.1: Add flashcard and filter tags', async () => {
    // Click Add button
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    // Modal appears
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    // Fill in front text
    const frontInput = screen.getByPlaceholderText(/front/i); // Adjust placeholder if necessary
    fireEvent.change(frontInput, { target: { value: 'Scheme' } });
    expect(frontInput.value).toBe('Scheme');

    // Filter tags
    const tagFilter = screen.getByPlaceholderText(/tag menu/i); // Adjust placeholder if necessary
    fireEvent.change(tagFilter, { target: { value: 'parenthesis' } });

    // Ensure tag list is filtered
    const filteredTag = await screen.findByText('+parenthesis');
    expect(filteredTag).toBeInTheDocument();

    // Confirm addition
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    // Ensure new flashcard is added
    const newFlashcard = await screen.findByText('Scheme');
    expect(newFlashcard).toBeInTheDocument();
  });
});
