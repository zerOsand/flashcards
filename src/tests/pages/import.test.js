import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from '../../utils/theme';
import Home from '../../pages/index';
import mockFlashcards from '../images/mockFlashcards.json';
import { CardProvider } from '../../state/CardProvider';
import '@testing-library/jest-dom';

// Mock necessary icons and components
jest.mock('@mui/icons-material/Upload', () => () => <div data-testid="upload-icon" />);
jest.mock('@mui/icons-material/Download', () => () => <div data-testid="download-icon" />);
jest.mock('@mui/icons-material/Delete', () => () => <div data-testid="delete-icon" />);
jest.mock('@mui/icons-material/Edit', () => () => <div data-testid="edit-icon" />);
jest.mock('../../components/Searchbar', () => ({ onFilteredCardsChange }) => (
    <input data-testid="searchbar" onChange={(e) => onFilteredCardsChange(e.target.value)} />
));
jest.mock('../../components/Navbar', () => () => <div data-testid="mock-navbar">Navbar</div>);
jest.mock('../../pages/preview', () => () => <div data-testid="mock-preview-pane">Mock PreviewPane</div>);

// Test cases
describe('Flashcard Import Tests', () => {
    let fileInput;

    beforeEach(() => {
        render(
            <MemoryRouter>
                <ThemeProvider theme={createTheme(theme)}>
                    <CardProvider>
                        <Home />
                    </CardProvider>
                </ThemeProvider>
            </MemoryRouter>
        );
        fileInput = screen.getByTestId('import-input');
    });


    test('Invalid flashcard file displays error message and retains old cards', async () => {

        const clicklistContainer = screen.getByRole('list');
        const oldCardCount = clicklistContainer.querySelectorAll('li').length;
    
        const invalidFile = new File([JSON.stringify({ invalid: 'data' })], 'invalid.json', {
            type: 'application/json',
        });
    
        act(() => {
            userEvent.upload(fileInput, invalidFile);
        });
    
        await waitFor(() => {
            expect(screen.getByText(/invalid json format/i)).toBeInTheDocument();
        });

        const newCardCount = clicklistContainer.querySelectorAll('li').length;
        expect(newCardCount).toBe(oldCardCount);
    });
    

    test('Valid flashcard file imports successfully and updates ClickList', async () => {
        const validFile = new File([JSON.stringify(mockFlashcards)], 'valid.json', {
            type: 'application/json',
        });

        act(() => {
            userEvent.upload(fileInput, validFile);
        });

        await waitFor(() => {
            expect(screen.getByText(/flashcards imported successfully/i)).toBeInTheDocument();
        });

        const clicklistContainer = screen.getByRole('list');
        expect(clicklistContainer).toBeInTheDocument();

        const clicklistItems = clicklistContainer.querySelectorAll('li');
        expect(clicklistItems.length).toBe(mockFlashcards.length);

        mockFlashcards.forEach((card) => {
            expect(
                screen.getByText((content, element) =>
                    element?.textContent?.includes(card.front)
                )
            ).toBeInTheDocument();
        });
    });

});
