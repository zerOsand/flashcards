class Card {
	constructor(front, back, tags) {
		this.front = front
		this.back = back
		this.tags = tags
	}
}

const cards = [
	/* Test Cards */
	new Card('beren', 'the empty-handed', ['human', 'outlaw', 'mortal']),
	new Card('thingol', 'king of doriath', ['elf', 'mortal']),
	new Card('luthien', 'princess of doriath', ['elf', 'immortal', 'maia', 'magician']),
	new Card('huan', 'hound of valinor', ['wolf', 'immortal']),
	new Card('mablung', 'captian of doriath', ['elf', 'mortal']),
	new Card('beleg', 'the archer', ['elf', 'mortal']),
	new Card('carcharoth', 'the red maw', ['wolf', 'werewolf']),

	new Card('awk', '1977', ['interpreted', 'garbage collected', 'memory safe']),
	new Card('c', '1972', ['compiled', 'macros', 'functional', 'fast']),
	new Card('c++', '1985', ['compiled', 'macros', 'object-oriented', 'fast']),
	new Card('go', '2009', ['compiled', 'garbage collected', 'reflective', 'object-oriented', 'memory safe']),
	new Card('java', '1995', ['compiled*', 'garbage collected', 'reflective', 'object-oriented', 'memory safe']),
	new Card('javascript', '1995', ['interpreted', 'garbage collected', 'object-oriented', 'memory safe']),
	new Card('lisp', '1960', ['interpreted', 'garbage collected', 'macros', 'reflective', 'functional']),
	new Card('python', '1994', ['interpreted', 'garbage collected', 'reflective', 'object-oriented', 'memory safe']),
	new Card('rust', '2015', ['compiled', 'macros', 'functional', 'memory safe', 'fast']),

	new Card('waking of angantyr', `Awaken, Angantyr!
Hervor awakens you;
your only daughter
by Sváfa!
Yield up from the mound
the sharp sword
that which dwarves forged
for Svafrlami`, ['poetry', 'fornyrðislag']),
	new Card('hail the givers' , `Hail the givers! A guest has come,
where shall he sit?
Hard pressed is he,
who tests his luck by the fire.`, ['poetry']),
	new Card('evil words' , `Thine evil words shall work no ill
Though, giantess, bitter thy baleful threats;
A drink full fair shall Ottar find,
If of all the gods the favor I get.`, ['poetry']),

	new Card('The fox and the cat', 'It happened that the cat met the fox in a forest, and as she thought to herself: ‘He is clever and full of experience, and much esteemed in the world,’ she spoke to him in a friendly way. ‘Good day, dear Mr Fox, how are you? How is all with you? How are you getting on in these hard times?’ The fox, full of all kinds of arrogance, looked at the cat from head to foot, and for a long time did not know whether he would give any answer or not. At last he said: ‘Oh, you wretched beard-cleaner, you piebald fool, you hungry mouse-hunter, what can you be thinking of? Have you the cheek to ask how I am getting on? What have you learnt? How many arts do you understand?’ ‘I understand but one,’ replied the cat, modestly. ‘What art is that?’ asked the fox. ‘When the hounds are following me, I can spring into a tree and save myself.’ ‘Is that all?’ said the fox. ‘I am master of a hundred arts, and have into the bargain a sackful of cunning. You make me sorry for you; come with me, I will teach you how people get away from the hounds.’ Just then came a hunter with four dogs. The cat sprang nimbly up a tree, and sat down at the top of it, where the branches and foliage quite concealed her. ‘Open your sack, Mr Fox, open your sack,’ cried the cat to him, but the dogs had already seized him, and were holding him fast. ‘Ah, Mr Fox,’ cried the cat. ‘You with your hundred arts are left in the lurch! Had you been able to climb like me, you would not have lost your life.’', ['grimm', 'moral']),
	new Card('newCard(\'verylongline\'\'stresstest\'[\'stresstest\'\'humor\'])', '\n\n\n\n\n\n\n\n\n\n\n\n\nnone\n\n\n\n\n\n\n\n\n\n\n\n\n\n', ['stresstest'])
];

function getCards() {
	return cards;
}

function pushCard(front, back, tags) {
	cards.push(new Card(front, back, tags))
}

function removeCard(front) {
	cards = cards.filter(c => c.front !== front)
}

function exportCards() {
}

function importCards() {
}

export { getCards, pushCard, removeCard, exportCards, importCards };
