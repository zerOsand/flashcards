import { act } from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from '../../utils/theme';
import Home from '../../pages/index';
import mockFlashcards from '../images/mockFlashcards.json';
import { CardProvider } from '../../state/CardProvider'; 
import "@testing-library/jest-dom";

// Mock unnecessary components
jest.mock('@mui/icons-material/Upload', () => () => <div data-testid="upload-icon" />);
jest.mock('@mui/icons-material/Download', () => () => <div data-testid="download-icon" />);
jest.mock('@mui/icons-material/Delete', () => () => <div data-testid="delete-icon" />);
jest.mock('@mui/icons-material/Edit', () => () => <div data-testid="edit-icon" />);
jest.mock('@mui/icons-material/Search', () => () => <div data-testid="search-icon" />);
jest.mock('../../components/Searchbar', () => ({ onFilteredCardsChange }) => (
    <input data-testid="searchbar" onChange={(e) => onFilteredCardsChange(e.target.value)} />
));

const setSnackbarMessage = jest.fn();
const setSnackbarSeverity = jest.fn();

jest.mock("../../components/Navbar", () => ({
    __esModule: true,
    default: () => <div data-testid="mock-navbar">Navbar</div>,
  }));
  
  jest.mock("../../components/Searchbar", () => ({
    __esModule: true,
    default: ({ onFilteredCardsChange }) => (
      <div data-testid="mock-searchbar">
        <input
          placeholder="Search tags"
          onChange={(e) => onFilteredCardsChange([])}
        />
      </div>
    ),
  }));
  jest.mock("../../components/Searchbar/SearchContext", () => ({
      __esModule: true,
      SearchContext: ({ children }) => (
        <div data-testid="search-context">{children}</div>
      ),
      useSearch: () => ({
        searchTerm: "test",
        setSearchTerm: jest.fn(),
      }),
    }));
  
    jest.mock('../../pages/preview', () => {
        return {
            __esModule: true,
            default: jest.fn(() => <div data-testid="mock-preview-pane">Mock PreviewPane</div>),
        };
    });
    

// Test cases
describe('Flashcard Import Tests', () => {
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
    });

    test('Invalid flashcard file displays error message', () => {
		const fileInput = screen.getByTestId('import-input')
        const invalidFile = new File([JSON.stringify({ invalid: 'data' })], 'invalid.json', {
            type: 'application/json',
        });

		act(() => {
			userEvent.upload(fileInput, invalidFile);
		})

		// (both of these methods are probably valid)
		expect(setSnackbarMessage).toHaveBeenCalledWith("Invalid JSON format.");
		// expect(screen.getByText("Invalid JSON format.")).toBeInTheDocument();
    });

    // test('Valid flashcard file imports successfully and updates ClickList', async () => {
    //     const validFile = new File([JSON.stringify(mockFlashcards)], 'valid.json', {
    //         type: 'application/json',
    //     });

    //     await userEvent.upload(fileInput, validFile);
		

    //     await waitFor(() => {
    //         expect(screen.getByText(/flashcards imported successfully/i)).toBeInTheDocument();
    //     });

        // const clicklistContainer = screen.getByRole('list'); // Assumes `List` component renders as a <ul> or <ol>.
        // expect(clicklistContainer).toBeInTheDocument();

        // const clicklistItems = clicklistContainer.querySelectorAll('li'); // Assumes `ListItem` renders as <li>.
        // expect(clicklistItems.length).toBe(mockFlashcards.length);

        // Check individual flashcard rendering
        // mockFlashcards.forEach((card) => {
        //     expect(
        //         screen.getByText((content, element) =>
        //             element?.textContent?.includes(card.front)
        //         )
        //     ).toBeInTheDocument();
        // });
    // });
});
