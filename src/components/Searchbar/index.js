import { useState, useEffect, useMemo } from "react";
import { useCards } from "../../state/CardProvider.js";

const defaultStyle = {
		container: {
			flexGrow: 1,
		},
		input: {
			width: '100%',
			height: '85%',
		},
	}

const Searchbar = ({ onFilteredCardsChange, searchTerm, setSearchTerm, styles }) => {
    const { cards } = useCards();
    styles = styles || defaultStyle;

    const handleSearchChange = (e) => {
        const newValue = e.target.value.toLowerCase();
        setSearchTerm(newValue);
    };

    const sortedAndFilteredCards = useMemo(() => {
        if (typeof searchTerm !== "string") return cards;
        return searchTerm.length === 0
            ? cards
            : cards.filter((card) =>
                  card.tags.some((tag) =>
                      searchTerm.split(",").some((term) => tag.toLowerCase().includes(term))
                  )
              );
    }, [cards, searchTerm]);

    useEffect(() => {
        onFilteredCardsChange(sortedAndFilteredCards);
    }, [sortedAndFilteredCards, onFilteredCardsChange]);

    return (
        <div style={styles.container}>
            <input
                style={styles.input}
                type="text"
                placeholder="tag1,tag2,tag3"
                value={typeof searchTerm === "string" ? searchTerm : ""}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default Searchbar;

