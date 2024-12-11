import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from '../../utils/theme';
import Home from '../../pages/index';
import { CardProvider } from '../../state/CardProvider';
import '@testing-library/jest-dom';


jest.mock('@mui/icons-material')

jest.mock('../../components/Searchbar', () => ({ onFilteredCardsChange }) => (
    <input data-testid="searchbar" onChange={(e) => onFilteredCardsChange(e.target.value)} />
));
jest.mock('../../components/Navbar', () => () => <div data-testid="mock-navbar">Navbar</div>);
jest.mock('../../pages/preview', () => () => <div data-testid="mock-preview-pane">Mock PreviewPane</div>);


const mockFlashcards = [
    {
		"id": 1,
		"front": "What is React?",
		"back": "A JavaScript library for building user interfaces.",
		"tags": ["javascript", "library", "react"],
		"master": 0
    },
    {
		"id": 2,
		"front": "What is JSX?",
		"back": "A syntax extension for JavaScript that allows you to write HTML in React.",
		"tags": ["javascript", "jsx", "syntax"],
		"master": 0
    },
    {
		"id": 3,
		"front": "What is a component?",
		"back": "An independent, reusable piece of UI in a React application.",
		"tags": ["react", "component", "ui"],
		"master": 0
    },
    {
		"id": 4,
		"front": "What is state in React?",
		"back": "An object that determines the behavior and rendering of a component.",
		"tags": ["react", "state", "behavior"],
		"master": 0
    },
    {
		"id": 5,
		"front": "What is a hook in React?",
		"back": "A special function that lets you hook into React features.",
		"tags": ["react", "hook", "function"],
		"master": 0
    }
]

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

		let listItems = screen.getAllByTestId('cl-item');
		expect(listItems.length).toBe(1);
    
        const invalidFile = new File([JSON.stringify({ invalid: 'data' })], 'invalid.json', {
            type: 'application/json',
        });
    
        act(() => {
            userEvent.upload(fileInput, invalidFile);
        });
    
        await waitFor(() => {
            expect(screen.getByText(/invalid json format/i)).toBeInTheDocument();
        });

		listItems = screen.getAllByTestId('cl-item');
        expect(listItems.length).toBe(1);
    });
    

    test('Valid flashcard file imports successfully and updates ClickList', async () => {
        const validFile = new File([JSON.stringify(mockFlashcards)], 'valid.json', {
            type: 'application/json',
        });

		let listItems = screen.getAllByTestId('cl-item');
		expect(listItems.length).toBe(1);

        act(() => {
            userEvent.upload(fileInput, validFile);
        });

        await waitFor(() => {
            expect(screen.getByText(/flashcards imported successfully/i)).toBeInTheDocument();
        });

		await waitFor(() => {
			listItems = screen.getAllByTestId('cl-item');
			expect(listItems.length).toBe(1 + mockFlashcards.length);
		});


        // mockFlashcards.forEach((card) => {
        //     expect(
        //         screen.getByText((content, element) =>
        //             element?.textContent?.includes(card.front)
        //         )
        //     ).toBeInTheDocument();
        // });
    });

});

// Local Variables:
// compile-command: "guix shell -m manifest.scm -- npm run test"
// End:
