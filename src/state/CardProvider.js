import { createContext, useContext, useState, useEffect } from 'react';
import cookie from '../utils/cookie.js'


const CardContext = createContext();

const initialCard = [
	{ id: 1, front: 'SELECT and press flip',
	  back: `This is a tag-based flashcard app.

There are no 'sets' or 'decks'. by using the search bar on the top left, you can filter which cards you want to review, and then press 'Practice'. Try searching for 'foo', and see that no cards are matched, as this card does not have the 'foo' tag (listed below this text).

To add a card, press the red plus button, also on the top left.
New tags can be created by searching for a tag that does not exist in the menu that appears.

You can import or export your created flashcards to send to others. Only cards that match the filter will be exported, allowing you to select what you'd like to send.

You can edit a selected card by pressing the pencil icon below. When ready, delete this card!


This application was created as part of the CS520 Software Testing class at the University of Massachusetts Amherst.
`,
	  tags: ['tutorial', 'cs520', 'group 13'],
	}
]

export const CardProvider = ({children}) => {
	const [cards, setCards] = useState(() => {
		const cookieValue = cookie.get('cards');
		return cookieValue !== undefined ?
			JSON.parse(cookieValue) : initialCard
	});
	const [id, sid] = useState(undefined);

	useEffect(() => {
		sid(cards?.[0]?.id || 0);
		if (cards?.length > 0) {
			cookie.set('cards', JSON.stringify(cards), 90);
		} else {
			cookie.remove('cards');
		}
	}, [cards]);

	const addCard = (front, back, tags) => {
		assertValidCard(front, back, tags)
		const newCard = { id: id + 1, front, back, tags: tags.sort() };
		setCards(prevCards => [newCard, ...prevCards]); 
	};

	const removeCard = (index) => {
		if (index < 0 || index > cards.length-1)
			throw new Error('invalid index')
		if (typeof index !== 'number')
			throw new Error('index must be an number')
		setCards(prevCards =>
			prevCards.filter((_, i) => i !== index)
		);
	};

	const editCard = (id, front, back, tags) => {
		assertValidCard(front, back, tags)
		const index = cards.findIndex(card => card.id === id);
		if (index === -1)
			throw new Error('id was not present')
		setCards([...cards.slice(0, index), { ...cards[index], front, back, tags: tags.sort() }, ...cards.slice(index + 1)])
	};

	const getTags = () => {
		const tags = new Set()
		cards.forEach((card) => {
			card.tags.forEach((tag) => {
				tags.add(tag)
			});
		});
		return Array.from(tags).sort()
	}

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

		// frees blob memory
		URL.revokeObjectURL(link.href);
	};

	const handleImportFlashcards = ( event ) => {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = ( e ) => {
				try {
					const data = JSON.parse(e.target.result);
					console.log("Imported JSON data")
					// can process the imported json data here
				} catch (error) {
					console.error("Error parsing JSON file:", error);
				}
			};
			reader.readAsText(file);
		}
	};

	const removeTag = (cardIndex, tagIndex) => {
		setCards(prevCards =>
			prevCards.map((card, i) => i === cardIndex
						  ? { ...card, tags: card.tags.filter((_, tIndex) => tIndex !== tagIndex) }
						  : card
						 )
		);
	};

	function assertValidCard(front, back, tags) {
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
	 * The following methods only exist for testing purposes.
	 * They are not used during normal execution.
	 */
	const forceCards = (c) => {
		setCards(c)
		sid(c?.length ?? 0)
	}

	return (
			<CardContext.Provider value={{ cards, addCard, editCard, getTags, removeTag, removeCard, handleExportFlashcards, handleImportFlashcards, forceCards }}>
				{children}
			</CardContext.Provider>
	);
};

export const useCards = () => {
	return useContext(CardContext);
};
