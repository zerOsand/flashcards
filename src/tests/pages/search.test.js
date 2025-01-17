import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { SearchProvider } from "../../components/Searchbar/SearchContext";
import { CardProvider } from "../../state/CardProvider";
import Searchbar from "../../components/Searchbar";
import { tagsMatchExpression } from "../../components/Searchbar/TagMatchExpression";

jest.mock("../../components/Searchbar/TagMatchExpression", () => ({
  tagsMatchExpression: jest.fn(),
}));

describe("Searchbar Component", () => {
  const mockOnFilteredCardsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <SearchProvider>
        <CardProvider>
          <Searchbar onFilteredCardsChange={mockOnFilteredCardsChange} />
        </CardProvider>
      </SearchProvider>
    );
  };

  test("renders the search bar with placeholder text", () => {
    renderComponent();
    const inputElement = screen.getByTestId("default-search-input");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates the search term state when the user types", () => {
    renderComponent();
    const inputElement = screen.getByTestId("default-search-input").querySelector("input");
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    expect(inputElement.value).toBe("tag1");
  });


  test("filters cards based on tags and updates the filtered cards list", () => {
    tagsMatchExpression.mockImplementation((expression, tags) => expression === "tag1" && tags.includes("tag1"));
    renderComponent();
    const inputElement = screen.getByTestId("default-search-input").querySelector("input");
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    const lastCall = mockOnFilteredCardsChange.mock.calls[mockOnFilteredCardsChange.mock.calls.length - 1][0];
    expect(lastCall).toEqual([]); // Ensure "tag1" does not match any cards
  });

  test("opens the expand modal when the expand button is clicked", () => {
    renderComponent();

    const expandButton = screen.getByRole("button", { name: /expand input/i });
    fireEvent.click(expandButton);

    const modalInput = screen.getByTestId("modal-search-input").querySelector("textarea");
    expect(modalInput).toBeInTheDocument();
  });

  test("maintains consistent search functionality inside the expanded modal", () => {
    renderComponent();

    const expandButton = screen.getByRole("button", { name: /expand input/i });
    fireEvent.click(expandButton);

    const modalInput = screen.getByTestId("modal-search-input").querySelector("textarea");
    fireEvent.change(modalInput, { target: { value: "tag3" } });

    expect(modalInput.value).toBe("tag3");

    const lastCall = mockOnFilteredCardsChange.mock.calls[mockOnFilteredCardsChange.mock.calls.length - 1][0];
    expect(lastCall).toEqual([]); // Ensure "tag3" does not match any cards
  });
});



  

