import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Practice from "../../../src/pages/Practice/index";
import "@testing-library/jest-dom";
import * as CardContext from "../../state/CardProvider";

// Mock the router hooks
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
}));

describe("Practice Component", () => {
	const mockNavigate = jest.fn();
	const theme = createTheme();
	const mockModifyMastery = jest.fn();

	const mockCards = [
		{ id: 1, front: "Front 1", back: "Back 1", mastery: 0 },
		{ id: 2, front: "Front 2", back: "Back 2", mastery: 0 },
	];

	beforeEach(() => {
		jest.clearAllMocks();
		useNavigate.mockImplementation(() => mockNavigate);
		useLocation.mockImplementation(() => ({
			state: { cards: mockCards },
		}));

		// Mock the useCards hook
		jest.spyOn(CardContext, "useCards").mockImplementation(() => ({
			cards: mockCards,
			modifyMastery: mockModifyMastery,
		}));
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

		// Verify front side is displayed
		expect(screen.getByText("Front Side")).toBeInTheDocument();
		expect(screen.getByText(/Front [12]/)).toBeInTheDocument();

		// Back side should not be visible initially
		expect(screen.queryByText("Back Side")).not.toBeInTheDocument();
	});

	test("clicking home button navigates to home page", () => {
		renderPractice();

		const homeButton = screen.getByText("Home");
		fireEvent.click(homeButton);

		expect(mockNavigate).toHaveBeenCalledWith("/");
	});

	test("clicking flip button shows back side of card", () => {
		renderPractice();

		const flipButton = screen.getByText("Flip");
		fireEvent.click(flipButton);

		// Verify back side is now visible
		expect(screen.getByText("Back Side")).toBeInTheDocument();
		expect(screen.getByText(/Back [12]/)).toBeInTheDocument();

		// Verify feedback buttons are enabled
		expect(screen.getByText("Again")).toBeEnabled();
		expect(screen.getByText("Good")).toBeEnabled();
		// Verify flip button is disabled
		expect(flipButton).toBeDisabled();
	});

	test('"Again" button decrements mastery and moves card to end', () => {
		renderPractice();

		// Flip card first
		fireEvent.click(screen.getByText("Flip"));

		// Click "Again" button
		fireEvent.click(screen.getByText("Again"));

		// Verify mastery was decremented
		expect(mockModifyMastery).toHaveBeenCalledWith(1, -2);

		// Verify card was moved and new card is showing
		expect(screen.queryByText("Back Side")).not.toBeInTheDocument();
		expect(screen.getByText("Front Side")).toBeInTheDocument();
	});

	test('"Good" button increments mastery and advances to next card', () => {
		renderPractice();

		// Flip card first
		fireEvent.click(screen.getByText("Flip"));

		// Click "Good" button
		fireEvent.click(screen.getByText("Good"));

		// Verify mastery was incremented
		expect(mockModifyMastery).toHaveBeenCalledWith(1, 1);

		// Verify new card is showing
		expect(screen.queryByText("Back Side")).not.toBeInTheDocument();
		expect(screen.getByText("Front Side")).toBeInTheDocument();
	});

	test("buttons have correct enabled/disabled states", () => {
		renderPractice();

		// Initial state
		expect(screen.getByText("Flip")).toBeEnabled();
		expect(screen.getByText("Again")).toBeDisabled();
		expect(screen.getByText("Good")).toBeDisabled();

		// After flip
		fireEvent.click(screen.getByText("Flip"));
		expect(screen.getByText("Flip")).toBeDisabled();
		expect(screen.getByText("Again")).toBeEnabled();
		expect(screen.getByText("Good")).toBeEnabled();
	});

	test("handles completion of all cards", () => {
		renderPractice();

		// Go through all cards
		mockCards.forEach(() => {
			fireEvent.click(screen.getByText("Flip"));
			fireEvent.click(screen.getByText("Good"));
		});

		// Verify final state
		expect(screen.getByText("Flip")).toBeDisabled();
	});
});
