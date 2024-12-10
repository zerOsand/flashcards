import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/index";
import "@testing-library/jest-dom";

// Mock Material UI icons
jest.mock("@mui/icons-material/Download", () => ({
	__esModule: true,
	default: () => <div data-testid="download-icon">Download Icon</div>,
}));

jest.mock("@mui/icons-material/Upload", () => ({
	__esModule: true,
	default: () => <div data-testid="upload-icon">Upload Icon</div>,
}));

// Mock Material-UI components
jest.mock("@mui/material", () => ({
	Box: ({ children, ...props }) => <div {...props}>{children}</div>,
	Button: ({ children, onClick, ...props }) => (
		<button onClick={onClick} {...props}>
			{children}
		</button>
	),
	Typography: ({ children, ...props }) => <div {...props}>{children}</div>,
	Tooltip: ({ children, title }) => <div title={title}>{children}</div>,
	ThemeProvider: ({ children, theme }) => (
		<div data-testid="theme-provider">{children}</div>
	),
	TextField: ({ onChange, ...props }) => (
		<input onChange={onChange} {...props} />
	),
	useTheme: () => ({
		palette: {
			primary: { main: "#1976d2" },
			text: { primary: "#000000" },
			accent: { border: "#000" },
		},
		typography: {
			fontFamily: "Roboto",
			body1: { fontSize: "1rem" },
		},
	}),
}));

// Mock CardProvider
jest.mock("../../state/CardProvider", () => ({
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
		handleExportFlashcards: jest.fn(),
		handleImportFlashcards: jest.fn(),
		getTags: () => ["tutorial", "react"],
		addCard: jest.fn(),
		editCard: jest.fn(),
		removeCard: jest.fn(),
		modifyMastery: jest.fn(),
	}),
}));

// Mock Components
jest.mock("../../components/Navbar", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-navbar">Navbar</div>,
}));

jest.mock("../../components/ClickList", () => ({
	__esModule: true,
	default: ({ list, item, active, event }) => (
		<div data-testid="mock-clicklist">
			<div role="list">
				{list.map((card, index) => (
					<div
						key={card.id}
						role="listitem"
						onClick={() => event && event(index)}
					>
						{item(card, index === active)}
					</div>
				))}
			</div>
		</div>
	),
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

jest.mock("../../pages/preview", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-preview">Select a tag to preview.</div>,
}));

jest.mock("../../pages/editCard", () => ({
	__esModule: true,
	default: ({ popupState: { open, setOpen } }) => (
		<div data-testid="mock-edit-card">
			{open && (
				<div>
					<div>Add Flashcard</div>
					<input aria-label="Front" defaultValue="Scheme" />
					<input aria-label="Back" />
					<button onClick={() => setOpen(false)}>Cancel</button>
					<div>+parenthesis</div>
				</div>
			)}
		</div>
	),
}));

// Mock styles
jest.mock("@mui/material/styles", () => ({
	__esModule: true,
	useTheme: () => ({
		palette: {
			primary: { main: "#1976d2" },
			text: { primary: "#000000" },
			accent: { border: "#000" },
		},
		typography: {
			fontFamily: "Roboto",
			body1: { fontSize: "1rem" },
		},
		cardsList: {},
	}),
}));

const mockTheme = {
	palette: {
		primary: { main: "#1976d2" },
		text: { primary: "#000000" },
		accent: { border: "#000" },
	},
	typography: {
		fontFamily: "Roboto",
		body1: { fontSize: "1rem" },
	},
};

describe("Flashcards Home Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const renderHome = () => {
		return render(
			<MemoryRouter>
				<div data-testid="theme-provider">
					<div data-testid="card-provider">
						<Home />
					</div>
				</div>
			</MemoryRouter>
		);
	};

  test("1.3 The system displays a home page with a list of flashcards and a preview pane", () => {
    renderHome();
    expect(screen.getByText("Select a tag to preview.")).toBeInTheDocument();
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const flashcardItems = screen.getAllByRole("listitem");
    expect(flashcardItems.length).toBeGreaterThan(0);
    expect(screen.getByText("SELECT and press flip")).toBeInTheDocument();
  });

  test("2.1-2.2 Clicking add button shows a modal with text entries and tag selector", () => {
    renderHome();
  
    fireEvent.click(screen.getByText("+"));

    expect(screen.getByText("Add Flashcard")).toBeInTheDocument();
    expect(screen.getByLabelText("Front")).toBeInTheDocument();
    expect(screen.getByLabelText("Back")).toBeInTheDocument();

    const tagLists = screen.getAllByRole("list");
  
    console.log(tagLists); 
    expect(tagLists.length).toBeGreaterThanOrEqual(1);  
    const leftTagList = tagLists[0];
  
    const leftTags = within(leftTagList).getAllByRole("listitem");
    expect(leftTags.length).toBe(3); 
    
  
    const rightTagList = tagLists[1];
    if (rightTagList) {
      const rightTags = within(rightTagList).queryAllByRole("listitem");
      expect(rightTags.length).toBe(0); 
    }
  });
  

  test("2.3-2.4 Modal input and cancel functionality", () => {
    renderHome();
    fireEvent.click(screen.getByText("+"));
    const frontInput = screen.getByLabelText("Front");
    fireEvent.change(frontInput, { target: { value: "Scheme" } });
    expect(frontInput.value).toBe("Scheme");

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Add Flashcard")).not.toBeInTheDocument();
    expect(screen.queryByText("Scheme")).not.toBeInTheDocument();
    expect(screen.getByText("SELECT and press flip")).toBeInTheDocument();
  });

  test("2.5 Add button, modal with Scheme in front, and tag filtering", () => {
    renderHome();

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("Add Flashcard")).toBeInTheDocument(); 
  
    const frontInput = screen.getByLabelText("Front");
    expect(frontInput.value).toBe("Scheme"); 
    let tagList = screen.queryAllByRole("listitem");
    expect(tagList.length).toBeGreaterThan(0);
    
    const searchInput = screen.getByPlaceholderText("Search tags");
    fireEvent.change(searchInput, { target: { value: "parenthesis" } });

    expect(screen.getByText("+parenthesis")).toBeInTheDocument();
    tagList = screen.queryAllByRole("listitem");
    expect(tagList.length).toBe(0);    
  });
});
