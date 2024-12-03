import { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const CardContext = createContext();

const initialCards = [
	/* Test Cards */
	{ id: 1, front: 'beren', back: 'the empty-handed', tags: ['human', 'outlaw', 'mortal'] },
	{ id: 2, front: 'thingol', back: 'king of doriath', tags: ['elf', 'mortal'] },
	{ id: 3, front: 'luthien', back: 'princess of doriath', tags: ['ainur', 'elf', 'immortal', 'maia', 'magician'] },
	{ id: 4, front: 'huan', back: 'hound of valinor', tags: ['wolf', 'immortal'] },
	{ id: 5, front: 'mablung', back: 'captian of doriath', tags: ['elf', 'mortal'] },
	{ id: 6, front: 'beleg', back: 'the archer', tags: ['elf', 'mortal'] },
	{ id: 7, front: 'carcharoth', back: 'guard of angband', tags: ['wolf', 'werewolf'] },
	{ id: 8, front: 'sauron', back: 'lord of the rings', tags: ['ainur', 'valar', 'immortal', 'immoral'] },
	{ id: 9, front: 'manwe', back: 'lord of the valar', tags: ['ainur', 'valar', 'immortal', 'moral'] },
	{ id: 10, front: 'ulmo', back: 'lord of waters', tags: ['ainur', 'valar', 'immortal', 'moral'] },
	{ id: 11, front: 'melkor', back: 'lord of the dark', tags: ['ainur', 'valar', 'immortal', 'immoral'] },

	{ id: 12, front: 'awk', back: '1977', tags: ['interpreted', 'garbage collected', 'memory safe'] },
	{ id: 13, front: 'c', back: '1972', tags: ['compiled', 'macros', 'functional', 'fast'] },
	{ id: 14, front: 'c++', back: '1985', tags: ['compiled', 'macros', 'object-oriented', 'fast'] },
	{ id: 15, front: 'go', back: '2009', tags: ['compiled', 'garbage collected', 'reflective', 'object-oriented', 'memory safe'] },
	{ id: 16, front: 'java', back: '1995', tags: ['compiled*', 'garbage collected', 'reflective', 'object-oriented', 'memory safe'] },
	{ id: 17, front: 'javascript', back: '1995', tags: ['interpreted', 'garbage collected', 'object-oriented', 'memory safe'] },
	{ id: 18, front: 'lisp', back: '1960', tags: ['interpreted', 'garbage collected', 'macros', 'reflective', 'functional'] },
	{ id: 19, front: 'python', back: '1994', tags: ['interpreted', 'garbage collected', 'reflective', 'object-oriented', 'memory safe'] },
	{ id: 20, front: 'rust', back: '2015', tags: ['compiled', 'macros', 'functional', 'memory safe', 'fast'] },
	{ id: 21, front: 'ruby', back: '1995', tags: ['interpreted', 'macros', 'functional', 'memory safe', 'reflective'] },
	{ id: 22, front: 'perl', back: '1987', tags: ['interpreted', 'functional', 'object-oriented'] },
	{ id: 23, front: 'haskell', back: '2010', tags: ['compiled', 'garbage collected' ] },

	{ id: 24, front: 'waking of angantyr', back: `Awaken, Angantyr!
Hervor awakens you;
your only daughter
by Sváfa!
Yield up from the mound
the sharp sword
that which dwarves forged
for Svafrlami`, tags: ['poetry', 'fornyrðislag'] },
	{ id: 25, front: 'hail the givers' , back: `Hail the givers! A guest has come,
where shall he sit?
Hard pressed is he,
who tests his luck by the fire.`, tags: ['poetry'] },
	{ id: 26, front: 'evil words' , back: `Thine evil words shall work no ill
Though, giantess, bitter thy baleful threats;
A drink full fair shall Ottar find,
If of all the gods the favor I get.`, tags: ['poetry'] },

	{ id: 27, front: 'Old Sultan', back: `A farmer once had a faithful dog called Sultan, who had grown old, and lost all his teeth, so that he could no longer hold anything fast. One day the farmer was standing with his wife before the house-door, and said, "To-morrow I intend to shoot Old Sultan, he is no longer of any use."

His wife, who felt pity for the faithful beast, answered, "He has served us so long, and been so faithful, that we might well give him his keep."

"Eh! what?" said the man. "You are not very sharp. He has not a tooth left in his mouth, and not a thief is afraid of him; now he may be off. If he has served us, he has had good feeding for it."

The poor dog, who was lying stretched out in the sun not far off, had heard everything, and was sorry that the morrow was to be his last day. He had a good friend, the wolf, and he crept out in the evening into the forest to him, and complained of the fate that awaited him. "Hark ye, gossip," said the wolf, "be of good cheer, I will help you out of your trouble. I have thought of something. To-morrow, early in the morning, your master is going with his wife to make hay, and they will take their little child with them, for no one will be left behind in the house. They are wont, during work-time, to lay the child under the hedge in the shade; you lay yourself there too, just as if you wished to guard it. Then I will come out of the wood, and carry off the child. You must rush swiftly after me, as if you would seize it again from me. I will let it fall, and you will take it back to its parents, who will think that you have saved it, and will be far too grateful to do you any harm; on the contrary, you will be in high favor, and they will never let you want for anything again."

The plan pleased the dog, and it was carried out just as it was arranged. The father screamed when he saw the Wolf running across the field with his child, but when Old Sultan brought it back, then he was full of joy, and stroked him and said, "Not a hair of yours shall be hurt, you shall eat my bread free as long as you live." And to his wife he said, "Go home at once and make Old Sultan some bread-sop that he will not have to bite, and bring the pillow out of my bed, I will give him that to lie upon."

Henceforth Old Sultan was as well off as he could wish to be.

Soon afterwards the wolf visited him, and was pleased that everything had succeeded so well. "But, gossip," said he, "you will just wink an eye if when I have a chance, I carry off one of your master's fat sheep." "Do not reckon upon that," answered the dog; "I will remain true to my master; I cannot agree to that." The wolf, who thought that this could not be spoken in earnest, came creeping about in the night and was going to take away the sheep. But the farmer, to whom the faithful Sultan had told the wolf's plan, caught him and dressed his hide soundly with the flail. The wolf had to pack off, but he cried out to the dog, "Wait a bit, you scoundrel, you shall pay for this."

The next morning the wolf sent the boar to challenge the dog to come out into the forest so that they might settle the affair. Old Sultan could find no one to stand by him but a cat with only three legs, and as they went out together the poor cat limped along, and at the same time stretched out her tail into the air with pain.

The wolf and his friend were already on the spot appointed, but when they saw their enemy coming they thought that he was bringing a sabre with him, for they mistook the outstretched tail of the cat for one. And when the poor beast hopped on its three legs, they could only think every time that it was picking up a stone to throw at them. So they were both afraid; the wild boar crept into the under-wood and the wolf jumped up a tree.

The dog and the cat, when they came up, wondered that there was no one to be seen. The wild boar, however, had not been able to hide himself altogether; and one of his ears was still to be seen. Whilst the cat was looking carefully about, the boar moved his ear; the cat, who thought it was a mouse moving there, jumped upon it and bit it hard. The boar made a fearful noise and ran away, crying out, "The guilty one is up in the tree." The dog and cat looked up and saw the wolf, who was ashamed of having shown himself so timid, and made friends with the dog.`, tags: ['stresstest', 'grimm', 'moral'] },
	{ id: 28, front: 'longlinelonglinelonglinelonglinelonglinelonglinelonglinelonglinelonglinelonglinelonglinelongline',  back: '\n\n\n\n\n\n\n\n\n\n\n\n\nnone\n\n\n\n\n\n\n\n\n\n\n\n\n\n', tags: ['stresstest'] },
	{ id: 29, front: `True or false?
Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.`, back: 'falsue', tags: ['stresstest'] },
	{ id: 30, front: 'everything',  back: 'all the tags', tags: ['compiled', 'compiled*', 'elf', 'fast', 'fornyrðislag', 'functional', 'garbage collected', 'grimm', 'human', 'immortal', 'interpreted', 'macros', 'magician', 'maia', 'memory safe', 'moral', 'object-oriented', 'outlaw', 'chrome', 'chromium', 'cs520', 'edge', 'exam', 'firefox', 'general', 'homework1', 'memory', 'mortal', 'poetry', 'other', 'react', 'reflective', 'stresstest', 'theory', 'umass', 'webkit', 'werewolf', 'wolf'] },
];

export const CardProvider = ({children}) => {
	const [cards, setCards] = useState(initialCards);
	const [id, sid] = useState(initialCards.length);

	const [openSnackbar, setOpenSnackbar] = useState(false);  
	const [snackbarMessage, setSnackbarMessage] = useState(""); 
	const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 

	const addCard = (front, back, tags) => {
		assertValidCard(front, back, tags)
		const newCard = { id: id + 1, front, back, tags: tags.sort() };
		setCards(prevCards => [newCard, ...prevCards]); 
		sid(id + 1);
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

		// bam, success alert
		setSnackbarMessage('Flashcards exported successfully!');
		setSnackbarSeverity('success');
		setOpenSnackbar(true);

		// frees blob memory
		URL.revokeObjectURL(link.href);
	};

	const handleImportFlashcards = (event) => {
		const file = event.target.files[0];
	
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const data = JSON.parse(e.target.result);
					
					if (validateFlashcardData(data)) {
						console.log("Valid JSON data:", data);

						// Handle ids; just reassign imported cards' ids
						const maxId = cards.reduce((max, card) => Math.max(max, card.id), 0);

						const newCards = data.map((card, index) => ({
							...card,
							id: maxId + index + 1,
						}));
						
						// Add imporetd cards into current list of cards
						setCards((prevCards) => [...prevCards, ...newCards]);

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

	const validateFlashcardData = (data) => {
		if (!Array.isArray(data)) return false; // Ensure the data is an array
	
		return data.every((item) => {
			// check extraneous fields
			const allowedKeys = ["id", "front", "back", "tags"];
			const itemKeys = Object.keys(item);
	
			if (!itemKeys.every((key) => allowedKeys.includes(key))) {
				console.error("Extraneous fields found:", itemKeys.filter((key) => !allowedKeys.includes(key)));
				return false;
			}
	
			return (
				typeof item.id === "number" &&
				typeof item.front === "string" &&
				typeof item.back === "string" &&
				Array.isArray(item.tags) &&
				item.tags.every((tag) => typeof tag === "string")
			);
		});
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
