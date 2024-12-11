import React, { act } from "react";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../utils/theme";
import "@testing-library/jest-dom";


jest.mock('@mui/icons-material')

jest.mock("../../state/CardProvider", () => {
    const addCard = jest.fn();
    return {
        __esModule: true,
        CardProvider: ({ children }) => (
            <div data-testid="card-provider">{children}</div>
        ),
        useCards: () => ({
            cards: [
                {
                    id: 1,
                    front: "SELECT and press flip",
                    back: "Tutorial card",
                    tags: ["tutorial"],
                },
                {
                    id: 2,
                    front: "React Basics",
                    back: "Learn React",
                    tags: ["react"],
                },
            ],
            addCard,
            editCard: jest.fn(),
            removeCard: jest.fn(),
            handleExportFlashcards: jest.fn(),
            handleImportFlashcards: jest.fn(),
            getTags: jest.fn(() => ["tutorial", "react"]),
        }),
    };
});


jest.mock('../../components/Searchbar/SearchContext.js', () => ({
	__esModule: true,
	SearchContext: ({ children }) => (
		<div data-testid="search-provider">{children}</div>
	),
	useSearch: () => ({
		searchTerm: 'a useless search',
		setSearchTerm: jest.fn()
	})
}));

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

describe("Flashcards Home Page", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	});

	const renderHome = () => {
		return render(
			<MemoryRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<ThemeProvider theme={createTheme(theme)}>
					<div data-testid="card-provider">
						<div data-testid="search-provider">
							<Home />
						</div>
					</div>
				</ThemeProvider>
			</MemoryRouter>
		);
	};

	test("1.3 The system displays a home page with a list of flashcards and a preview pane", () => {
		renderHome();
		expect(screen.getByText("Select a card for preview.")).toBeInTheDocument();
		const flashcardItems = screen.getAllByTestId("cl-item")
		expect(flashcardItems.length).toBe(2);
		expect(screen.getByText("SELECT and press flip")).toBeInTheDocument();
	});

	test("2.1-2.2 Clicking add button shows a modal with text entries and tag selector", () => {
		renderHome()

		fireEvent.click(screen.getByTestId("add-card"))
		expect(screen.getByTestId("front-text")).toBeInTheDocument()
		expect(screen.getByTestId("back-text")).toBeInTheDocument()

		const tagLists = screen.getAllByRole("list")

		expect(tagLists.length).toBeGreaterThanOrEqual(1)
		const leftTagList = tagLists[0]

		const leftTags = within(leftTagList).getAllByRole("listitem")
		expect(leftTags.length).toBe(2)


		const rightTagList = tagLists[1];
		if (rightTagList) {
			const rightTags = within(rightTagList).queryAllByRole("listitem")
			expect(rightTags.length).toBe(0)
		}
	});

	test("2.3-2.4 Modal input and cancel functionality", async () => {
		renderHome();

		fireEvent.click(screen.getByTestId("add-card"));
		expect(screen.getByTestId("front-text")).toBeInTheDocument();
		expect(screen.getByTestId("back-text")).toBeInTheDocument();

		const frontInput = screen.getByTestId("front-text").querySelector("textarea");
		expect(frontInput).not.toBeNull();
		act(() => {
			userEvent.type(frontInput, "Scheme");
		})
		waitFor (() => {
			expect(frontInput.value).toBe("Scheme");
		})

		fireEvent.click(screen.getByText("Cancel"));
		expect(screen.queryByText("Create Flashcard")).not.toBeInTheDocument();
		expect(screen.queryByText("Scheme")).not.toBeInTheDocument();
		expect(screen.getByText("SELECT and press flip")).toBeInTheDocument();
	  });

	test("2.5 Add button, modal with Scheme in front, and tag filtering", async () => {
		renderHome();

		fireEvent.click(screen.getByTestId("add-card"));
		expect(screen.getByTestId("front-text")).toBeInTheDocument()
		expect(screen.getByTestId("back-text")).toBeInTheDocument()

		const frontInput = screen.getByTestId("front-text").querySelector("textarea");
		expect(frontInput).not.toBeNull();
		expect(frontInput.value).toBe("");
		let tagList = screen.queryAllByRole("listitem");
		expect(tagList.length).toBe(2);

		const searchInput = screen.getByPlaceholderText('new-tag');
		expect(searchInput).not.toBeNull();
		act(() => {
			userEvent.type(searchInput, "parenthesis");
		})

		expect(await screen.findByTestId("create-tag")).toBeInTheDocument();

		tagList = screen.queryAllByRole("listitem");
		expect(tagList.length).toBe(1);
	});

	test("4.4-4.5 Clicking '+parenthesis' adds tag and clears search input", async () => {
		renderHome();

		fireEvent.click(screen.getByTestId("add-card"));
		expect(screen.getByTestId("front-text")).toBeInTheDocument();
		expect(screen.getByTestId("back-text")).toBeInTheDocument();

		
		const searchInput = screen.getByPlaceholderText("new-tag");
		expect(searchInput).toBeInTheDocument();

		
	    userEvent.type(searchInput, "parenthesis");
		

		const createTagButton = await screen.findByTestId("create-tag");
		expect(createTagButton).toBeInTheDocument();
		expect(createTagButton.textContent).toBe("+ parenthesis");

	
		fireEvent.click(createTagButton);

		expect(searchInput.value).toBe("");
		const addedTagsList = screen.getAllByRole("list")[1]; 
		const addedTags = within(addedTagsList).getAllByRole("listitem");
		expect(addedTags.length).toBe(1);
		expect(addedTags[0].textContent).toBe("parenthesis");
	});

	
	test("2.3-2.6 Add new card with 'Scheme' in front and 'I love parenthesis' in back", async () => {
		const { addCard } = require("../../state/CardProvider").useCards(); 
	
		renderHome();

		fireEvent.click(screen.getByTestId("add-card"));
		expect(screen.getByTestId("front-text")).toBeInTheDocument();
		expect(screen.getByTestId("back-text")).toBeInTheDocument();
	
		const frontInput = screen.getByTestId("front-text").querySelector("textarea");
		const backInput = screen.getByTestId("back-text").querySelector("textarea");
	
		expect(frontInput).not.toBeNull();
		expect(backInput).not.toBeNull();
		expect(frontInput.value).toBe("");
		expect(backInput.value).toBe("");
	
		act(() => {
			userEvent.type(frontInput, "Scheme");
			userEvent.type(backInput, "I love parenthesis");
		});
	
		await waitFor(() => {
			expect(frontInput.value).toBe("Scheme");
			expect(backInput.value).toBe("I love parenthesis");
		});
	
		fireEvent.click(screen.getByText("Save"));

		console.log("addCard calls:", addCard.mock.calls);
	
		expect(screen.queryByTestId("front-text")).not.toBeInTheDocument();
		expect(screen.queryByTestId("back-text")).not.toBeInTheDocument();
	
		expect(addCard).toHaveBeenCalled();
		const lastCallArgs = addCard.mock.calls[addCard.mock.calls.length - 1];
		expect(lastCallArgs).toEqual(["Scheme", "I love parenthesis", []]);
	});
	
	

});
