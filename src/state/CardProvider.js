import { createContext, useContext, useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import cookie from '../utils/cookie.js';

const CardContext = createContext();

const initialCard = [
	{ id: 1,
	  front: 'SELECT and press flip',
	  back: `This is a tag-based flashcard app.

There are no 'sets' or 'decks'. By using the search bar on the top left, you can filter which cards you want to review, and then press 'Practice'. Try searching for 'foo', and see that no cards are matched, as this card does not have the 'foo' tag (listed below this text).

To add a card, press the red plus button, also on the top left.
New tags can be created by searching for a tag that does not exist in the menu that appears.

You can import or export your created flashcards to send to others. Only cards that match the filter will be exported, allowing you to select what you'd like to send.

You can edit a selected card by pressing the pencil icon below. When ready, delete this card!


This application was created as part of the CS520 Software Testing class at the University of Massachusetts Amherst.
`,
	  tags: ['tutorial', 'cs520', 'group 13'],
	  master: 0,
	}
]

/**
 * `CardProvider` provides context for managing flashcards.
 * 
 * @param {Object} children - Child components that will have access to the CardContext.
 * 
 * @returns {JSX.Element} A `CardContext.Provider` wrapping the child components.
 */
export const CardProvider = ({children}) => {
	const [cards, setCards] = useState(() => {
		const cookieValue = cookie.get('cards');
		return cookieValue !== undefined ?
			JSON.parse(cookieValue) : initialCard
	});
	
	const [id, sid] = useState(undefined);
	const [openSnackbar, setOpenSnackbar] = useState(false);  
	const [snackbarMessage, setSnackbarMessage] = useState(""); 
	const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 

	// Updates card ID and saves cards in cookies when cards change
	useEffect(() => {
		if (cards?.length > 0) {
			sid(cards.reduce((max, card) => Math.max(max, card.id), 0));
			cookie.set('cards', JSON.stringify(cards), 90);
		} else {
			sid(0);
			cookie.remove('cards');
		}
	}, [cards]);

	/**
	 * Adds a new card with the specified `front`, `back`, and `tags`.
	 * 
	 * @param {string} front - The front text of the flashcard.
	 * @param {string} back - The back text of the flashcard.
	 * @param {Array} tags - Tags associated with the flashcard.
	 */
	const addCard = (front, back, tags) => {
		assertValidCard(front, back, tags)
		const newCard = { id: id + 1, front, back, tags: tags.sort(), master: 0 };
		setCards(prevCards => [newCard, ...prevCards]); 
	};

	/**
	 * Removes a card at the specified index.
	 * 
	 * @param {number} index - The index of the card to remove.
	 */
	const removeCard = (index) => {
		if (index < 0 || index > cards.length-1)
			throw new Error('invalid index')
		if (typeof index !== 'number')
			throw new Error('index must be an number')
		setCards(prevCards =>
			prevCards.filter((_, i) => i !== index)
		);
	};

	/**
	 * Edits a card by its ID, updating the front, back, and tags.
	 * 
	 * @param {number} id - The ID of the card to edit.
	 * @param {string} front - The new front text of the flashcard.
	 * @param {string} back - The new back text of the flashcard.
	 * @param {Array} tags - The new tags for the flashcard.
	 */
	const editCard = (id, front, back, tags) => {
		assertValidCard(front, back, tags)
		const index = cards.findIndex(card => card.id === id);
		if (index === -1)
			throw new Error('id was not present')
		setCards([...cards.slice(0, index), { ...cards[index], front, back, tags: tags.sort() }, ...cards.slice(index + 1)])
	};

	/**
	 * Returns a sorted list of unique tags from all cards.
	 * 
	 * @returns {Array} A sorted array of unique tags.
	 */
	const getTags = () => {
		const tags = new Set()
		cards.forEach((card) => {
			card.tags.forEach((tag) => {
				tag !== 'learning' && tags.add(tag)
			});
		});
		return Array.from(tags).sort()
	}

	/**
	 * Modifies the mastery level of a card identified by its ID.
	 * 
	 * @param {number} id - The ID of the card to modify.
	 * @param {number} num - The amount to modify the mastery level by.
	 */
	const modifyMastery = (id, num) => {
		if (typeof num !== 'number')
			throw new Error('num must be an number')
		const index = cards.findIndex(card => card.id === id);
		if (index === -1)
			throw new Error('id was not present')

		const master = (cards[index].master || 0) + num
		let tags
		if (master < 0)
			tags = [...new Set(['learning', ...(cards[index].tags || [])])]
		else
			tags = (cards[index].tags || []).filter(tag => tag !== 'learning')

		setCards([...cards.slice(0, index), { ...cards[index],
											  master: master,
											  tags: tags
											}, ...cards.slice(index + 1)])
	}

	/**
	 * Exports filtered flashcards as a JSON file.
	 * 
	 * @param {Array} filteredCards - The cards to export.
	 */
	const handleExportFlashcards = ( filteredCards ) => {
		// first, save the filtered flashcards as a json
		const jsonCards = JSON.stringify(filteredCards, null, 2);

		const blob = new Blob([jsonCards], { type: "application/json" });

		// create a link and download the file
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "Flashcards.json"; 
		link.click();

		// bam, success alert
		setSnackbarMessage('Flashcards exported successfully!');
		setSnackbarSeverity('success');
		setOpenSnackbar(true);

		// frees blob memory
		URL.revokeObjectURL(link.href);
	};

	/**
	 * Handles importing flashcards from a JSON file.
	 * 
	 * @param {Object} event - The file input event containing the uploaded file.
	 */
	const handleImportFlashcards = (event) => {
		const file = event.target.files[0];
	
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const data = JSON.parse(e.target.result);
					
					if (validateFlashcardData(data)) {
						console.log("Valid JSON data:", data);

						const newCards = data.map((card, index) => ({
							...card,
							id: id + index + 1,
						}));

						setCards((prevCards) => [...newCards, ...prevCards]);
						
						// Alert success import
						console.log("Flashcards imported successfully!");
						setSnackbarMessage("Flashcards imported successfully!");
						setSnackbarSeverity("success");
						setOpenSnackbar(true);
					} else {
						// Alert error import
						console.error("Invalid JSON format.");
						setSnackbarMessage("Invalid JSON format.");
						setSnackbarSeverity("error");
						setOpenSnackbar(true);
					}
				} catch (error) {
					// Alert error import
					console.error("Error parsing JSON file:", error);
					setSnackbarMessage("Error parsing JSON file.");
					setSnackbarSeverity("error");
					setOpenSnackbar(true);
				}
			};
			reader.readAsText(file);
		}
	};

	/**
	 * Validates the structure of imported flashcards.
	 * 
	 * @param {Array} data - The imported flashcard data to validate.
	 * @returns {boolean} `true` if data is valid, otherwise `false`.
	 */
	const validateFlashcardData = (data) => {
		if (!Array.isArray(data)) return false; // Ensure the data is an array
	
		return data.every((item) => {
			// check extraneous fields
			const allowedKeys = ["id", "front", "back", "tags", "master"];
			const itemKeys = Object.keys(item);
	
			if (!itemKeys.every((key) => allowedKeys.includes(key))) {
				console.error("Extraneous fields found:", itemKeys.filter((key) => !allowedKeys.includes(key)));
				return false;
			}
	
			return (
				typeof item.id === "number" &&
				typeof item.front === "string" &&
				typeof item.back === "string" &&
				typeof item.master === "number" &&
				Array.isArray(item.tags) &&
				item.tags.every((tag) => typeof tag === "string")
			);
		});
	};

	/**
	 * Checks if card details are valid (front, back, tags).
	 * 
	 * @param {string} front - The front text of the card.
	 * @param {string} back - The back text of the card.
	 * @param {Array} tags - The tags for the card.
	 */
	const assertValidCard = (front, back, tags) => {
		if (typeof front !== 'string') {
			throw new Error('front must be a string');
		}
		if (typeof back !== 'string') {
			throw new Error('back must be a string');
		}
		if (!Array.isArray(tags)) {
			throw new Error('tags must be an array');
		}
		if (!tags.every(tag => typeof tag === 'string')) {
			throw new Error('all elements in tags must be a string');
		}
	}

	/**
	 * Sets a specified list of cards for testing purposes.
	 * This function is not called during normal execution.
	 * 
	 * @param {Array} c - The list of cards to set.
	 */
	const forceCards = (c) => {
		setCards(c)
		sid(c?.length ?? 0)
	}

	return (
			<CardContext.Provider value={{ cards, addCard, editCard, getTags, modifyMastery, removeCard, handleExportFlashcards, handleImportFlashcards, forceCards }}>
				{children}

				<Snackbar
					open={openSnackbar}
					autoHideDuration={3000} // message will disappear after 3 seconds (change ? longer ?)
					onClose={() => setOpenSnackbar(false)}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				>
					<Alert
					onClose={() => setOpenSnackbar(false)}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}
					>
					{snackbarMessage}
					</Alert>
				</Snackbar>

			</CardContext.Provider>
	);
};

export const useCards = () => {
	return useContext(CardContext);
};
