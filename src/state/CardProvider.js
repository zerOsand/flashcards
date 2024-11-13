import Read, { createContext, useContext, useState } from 'react';

const CardContext = createContext();

const initialCards = [
	/* Test Cards */
	{ id: 1, front: 'beren', back: 'the empty-handed', tags: ['human', 'outlaw', 'mortal'] },
	{ id: 2, front: 'thingol', back: 'king of doriath', tags: ['elf', 'mortal'] },
	{ id: 3, front: 'luthien', back: 'princess of doriath', tags: ['elf', 'immortal', 'maia', 'magician'] },
	{ id: 4, front: 'huan', back: 'hound of valinor', tags: ['wolf', 'immortal'] },
	{ id: 5, front: 'mablung', back: 'captian of doriath', tags: ['elf', 'mortal'] },
	{ id: 6, front: 'beleg', back: 'the archer', tags: ['elf', 'mortal'] },
	{ id: 7, front: 'carcharoth', back: 'the red maw', tags: ['wolf', 'werewolf'] },

	{ id: 8, front: 'awk', back: '1977', tags: ['interpreted', 'garbage collected', 'memory safe'] },
	{ id: 9, front: 'c', back: '1972', tags: ['compiled', 'macros', 'functional', 'fast'] },
	{ id: 10, front: 'c++', back: '1985', tags: ['compiled', 'macros', 'object-oriented', 'fast'] },
	{ id: 11, front: 'go', back: '2009', tags: ['compiled', 'garbage collected', 'reflective', 'object-oriented', 'memory safe'] },
	{ id: 12, front: 'java', back: '1995', tags: ['compiled*', 'garbage collected', 'reflective', 'object-oriented', 'memory safe'] },
	{ id: 13, front: 'javascript', back: '1995', tags: ['interpreted', 'garbage collected', 'object-oriented', 'memory safe'] },
	{ id: 14, front: 'lisp', back: '1960', tags: ['interpreted', 'garbage collected', 'macros', 'reflective', 'functional'] },
	{ id: 15, front: 'python', back: '1994', tags: ['interpreted', 'garbage collected', 'reflective', 'object-oriented', 'memory safe'] },
	{ id: 16, front: 'rust', back: '2015', tags: ['compiled', 'macros', 'functional', 'memory safe', 'fast'] },

	{ id: 17, front: 'waking of angantyr', back: `Awaken, Angantyr!
Hervor awakens you;
your only daughter
by Sváfa!
Yield up from the mound
the sharp sword
that which dwarves forged
for Svafrlami`, tags: ['poetry', 'fornyrðislag'] },
	{ id: 18, front: 'hail the givers' , back: `Hail the givers! A guest has come,
where shall he sit?
Hard pressed is he,
who tests his luck by the fire.`, tags: ['poetry'] },
	{ id: 19, front: 'evil words' , back: `Thine evil words shall work no ill
Though, giantess, bitter thy baleful threats;
A drink full fair shall Ottar find,
If of all the gods the favor I get.`, tags: ['poetry'] },

	{ id: 20, front: 'The fox and the cat', back: 'It happened that the cat met the fox in a forest, and as she thought to herself: ‘He is clever and full of experience, and much esteemed in the world,’ she spoke to him in a friendly way. ‘Good day, dear Mr Fox, how are you? How is all with you? How are you getting on in these hard times?’ The fox, full of all kinds of arrogance, looked at the cat from head to foot, and for a long time did not know whether he would give any answer or not. At last he said: ‘Oh, you wretched beard-cleaner, you piebald fool, you hungry mouse-hunter, what can you be thinking of? Have you the cheek to ask how I am getting on? What have you learnt? How many arts do you understand?’ ‘I understand but one,’ replied the cat, modestly. ‘What art is that?’ asked the fox. ‘When the hounds are following me, I can spring into a tree and save myself.’ ‘Is that all?’ said the fox. ‘I am master of a hundred arts, and have into the bargain a sackful of cunning. You make me sorry for you; come with me, I will teach you how people get away from the hounds.’ Just then came a hunter with four dogs. The cat sprang nimbly up a tree, and sat down at the top of it, where the branches and foliage quite concealed her. ‘Open your sack, Mr Fox, open your sack,’ cried the cat to him, but the dogs had already seized him, and were holding him fast. ‘Ah, Mr Fox,’ cried the cat. ‘You with your hundred arts are left in the lurch! Had you been able to climb like me, you would not have lost your life.’', tags: ['grimm', 'moral'] },
	{ id: 21, front: 'longlinelonglinelonglinelonglinelonglinelonglinelonglinelonglinelonglinelonglinelonglinelongline',  back: '\n\n\n\n\n\n\n\n\n\n\n\n\nnone\n\n\n\n\n\n\n\n\n\n\n\n\n\n', tags: ['stresstest'] },
];

export const CardProvider = ({children}) => {
	const [cards, setCards] = useState(initialCards);
	const [id, sid] = useState(initialCards.length);

	const addCard = (front, back, tags) => {
		const newCard = { id: id + 1, front, back, tags: tags };
		setCards(prevCards => [...prevCards, newCard]);
		sid(id + 1);
	};

	// const removeCard = (index) => {
	// };

	// const editCard = (index) => {		
	// };

	const getTags = () => {
		const tags = new Set()
		cards.forEach((card) => {
			card.tags.forEach((tag) => {
				tags.add(tag)
			});
		});
		return Array.from(tags)
	}

	const addTag = (cardIndex, tag) => {
		setCards(prevCards =>
			prevCards.map((card, i) =>
				i === cardIndex ? { ...card, tags: [...card.tags, tag].sort() } : card
			)
		);
	};

	const removeTag = (cardIndex, tagIndex) => {
		setCards(prevCards =>
			prevCards.map((card, i) => i === cardIndex
						  ? { ...card, tags: card.tags.filter((_, tIndex) => tIndex !== tagIndex) }
						  : card
						 )
		);
	};

	return (
			<CardContext.Provider value={{ cards, addCard, getTags, addTag, removeTag }}>
				{children}
			</CardContext.Provider>
	);
};

export const useCards = () => {
	return useContext(CardContext);
};

