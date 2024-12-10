import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "../../../src/pages/index";
import EditCard from "../../pages/editCard";
import { CardProvider } from "../../../src/state/CardProvider";
import "@testing-library/jest-dom";

jest.mock("../../../src/state/CardProvider", () => ({
    useCards: () => ({
      cards: [
        { id: 1, front: "SELECT and press flip", back: "Tutorial card", tags: ["tutorial"] },
        { id: 2, front: "React Basics", back: "Learn React", tags: ["react"] },
      ],
      handleExportFlashcards: jest.fn(),
      handleImportFlashcards: jest.fn(),
    }),
  }));
  

  jest.mock("../../../src/components/Searchbar/SearchContext", () => ({
    useSearch: jest.fn(() => ({
        searchTerm: "",
        setSearchTerm: jest.fn(),
      })),
  }));

const theme = createTheme({
    palette: {
      accent: {
        border: "#000", 
      },
    },
  });

describe("Flashcards Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderHome = () => {
    return render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
            <CardProvider>
                <Home/>
            </CardProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  test("1.3 The system displays a home page with a list of flashcards and a preview pane", () => {
    renderHome();

   
    const previewPane = screen.getByText("Select a tag to preview.");
    expect(previewPane).toBeInTheDocument();

    
    const flashcardList = screen.getByRole("list");
    expect(flashcardList).toBeInTheDocument();
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
    expect(tagLists.length).toBe(2); 
  
    const leftTagList = tagLists[0];
    const rightTagList = tagLists[1];
  
    
    const leftTags = within(leftTagList).getAllByRole("listitem");
    expect(leftTags.length).toBe(3);
  
    
    const rightTags = within(rightTagList).queryAllByRole("listitem");
    expect(rightTags.length).toBe(0);
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
  
    
    const searchInput = screen.getByPlaceholderText("Search tags");
    fireEvent.change(searchInput, { target: { value: "parenthesis" } });
  
    
    expect(screen.getByText("+parenthesis")).toBeInTheDocument();
  });
});