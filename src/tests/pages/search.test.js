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

  it("renders the search bar with placeholder text", () => {
    renderComponent();
    const inputElement = screen.getAllByPlaceholderText("tag1 ^ (tag2 | !tag3) & tag4")[0];
    expect(inputElement).toBeInTheDocument();
  });

  it("updates the search term state when the user types", () => {
    renderComponent();
    const inputElement = screen.getAllByPlaceholderText("tag1 ^ (tag2 | !tag3) & tag4")[0];
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    expect(inputElement.value).toBe("tag1");
  });

  it("filters cards based on tags and updates the filtered cards list", () => {
    tagsMatchExpression.mockImplementation((expression, tags) => tags.includes(expression));

    renderComponent();

    const inputElement = screen.getAllByPlaceholderText("tag1 ^ (tag2 | !tag3) & tag4")[0];
    fireEvent.change(inputElement, { target: { value: "tag1" } });

    expect(tagsMatchExpression).toHaveBeenCalledWith("tag1", ["tutorial", "cs520", "group 13"]);
    expect(mockOnFilteredCardsChange).toHaveBeenCalledWith([
      { id: 1, front: "SELECT and press flip", back: expect.any(String), tags: ["tutorial", "cs520", "group 13"], master: 0 },
    ]);
  });

  it("opens the expand modal when the expand button is clicked", () => {
    renderComponent();

    const expandButton = screen.getByRole("button", { name: /expand input/i });
    fireEvent.click(expandButton);

    const modalInput = screen.getAllByPlaceholderText("tag1 ^ (tag2 | !tag3) & tag4")[1];
    expect(modalInput).toBeInTheDocument();
  });

  it("maintains consistent search functionality inside the expanded modal", () => {
    renderComponent();

    const expandButton = screen.getByRole("button", { name: /expand input/i });
    fireEvent.click(expandButton);

    const modalInput = screen.getAllByPlaceholderText("tag1 ^ (tag2 | !tag3) & tag4")[1];
    fireEvent.change(modalInput, { target: { value: "tag3" } });

    expect(modalInput.value).toBe("tag3");
    expect(mockOnFilteredCardsChange).toHaveBeenCalled();
  });
});
