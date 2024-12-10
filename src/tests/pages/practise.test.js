import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Practice from "../../../src/pages/Practice/index";
import "@testing-library/jest-dom";

// Mock the CardProvider module
jest.mock("../../state/CardProvider", () => ({
	useCards: () => ({
		cards: mockCards,
		modifyMastery: mockModifyMastery,
	}),
}));

// Mock the router hooks
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockNavigate,
	useLocation: () => ({
		state: { cards: mockCards },
	}),
}));

const mockNavigate = jest.fn();
const mockModifyMastery = jest.fn();
const mockCards = [
	{ id: 1, front: "Front 1", back: "Back 1", mastery: 0 },
	{ id: 2, front: "Front 2", back: "Back 2", mastery: 0 },
];

describe("Practice Component", () => {
	const theme = createTheme();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const renderPractice = () => {
		return render(
			<MemoryRouter>
				<ThemeProvider theme={theme}>
					<Practice />
				</ThemeProvider>
			</MemoryRouter>
		);
	};

	test("shuffles and displays the first card front side on initial render", () => {
		renderPractice();
		expect(screen.getByText("Front Side")).toBeInTheDocument();
		expect(screen.getByText(/Front [12]/)).toBeInTheDocument();
		expect(screen.queryByText("Back Side")).not.toBeInTheDocument();
	});

	test("clicking home button navigates to home page", () => {
		renderPractice();
		fireEvent.click(screen.getByText("Home"));
		expect(mockNavigate).toHaveBeenCalledWith("/");
	});

	test("clicking flip button shows back side of card", () => {
		renderPractice();
		const flipButton = screen.getByText("Flip");

		fireEvent.click(flipButton);

		expect(screen.getByText("Back Side")).toBeInTheDocument();
		expect(screen.getByText(/Back [12]/)).toBeInTheDocument();
		expect(screen.getByText("Again")).not.toBeDisabled();
		expect(screen.getByText("Good")).not.toBeDisabled();
		expect(flipButton).toBeDisabled();
	});

	test('"Again" button decrements mastery and moves card to end', () => {
		renderPractice();

		fireEvent.click(screen.getByText("Flip"));
		fireEvent.click(screen.getByText("Again"));

		// Get current card ID from displayed text
		let currentCard = screen.getByText(/Front [12]/).textContent;
		let cardId = parseInt(currentCard.charAt(currentCard.length - 1));

		expect(mockModifyMastery).toHaveBeenCalledWith(expect.any(Number), -2);
		expect(mockModifyMastery.mock.calls[0][1]).toBe(-2); // Check points value
		expect(screen.queryByText("Back Side")).not.toBeInTheDocument();
		expect(screen.getByText("Front Side")).toBeInTheDocument();
	});

	test('"Good" button increments mastery and advances to next card', () => {
		renderPractice();

		fireEvent.click(screen.getByText("Flip"));
		fireEvent.click(screen.getByText("Good"));

		// Get current card ID from displayed text
		let currentCard = screen.getByText(/Front [12]/).textContent;
		let cardId = parseInt(currentCard.charAt(currentCard.length - 1));

		expect(mockModifyMastery).toHaveBeenCalledWith(expect.any(Number), 1);
		expect(mockModifyMastery.mock.calls[0][1]).toBe(1); // Check points value
		expect(screen.queryByText("Back Side")).not.toBeInTheDocument();
		expect(screen.getByText("Front Side")).toBeInTheDocument();
	});

	test("buttons have correct enabled/disabled states", () => {
		renderPractice();

		// Initial state
		expect(screen.getByText("Flip")).not.toBeDisabled();
		expect(screen.getByText("Again")).toBeDisabled();
		expect(screen.getByText("Good")).toBeDisabled();

		// After flip
		fireEvent.click(screen.getByText("Flip"));
		expect(screen.getByText("Flip")).toBeDisabled();
		expect(screen.getByText("Again")).not.toBeDisabled();
		expect(screen.getByText("Good")).not.toBeDisabled();
	});

	test("handles completion of all cards", () => {
		renderPractice();

		// Go through all cards
		mockCards.forEach(() => {
			fireEvent.click(screen.getByText("Flip"));
			fireEvent.click(screen.getByText("Good"));
		});

		expect(screen.getByText("Flip")).toBeDisabled();
	});
});
