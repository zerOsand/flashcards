import { useState } from 'react'
import { cardPaneStyle, previewStyles, textListStyle, textPreviewStyle, contentContainer, contentArea, searchBarStyle, buttonStyle, container, leftContainer, rightContainer } from '../utils/styles'
import Searchbar from '../components/Searchbar'
import ClickList from '../components/ClickList'
import CreatePopup from '../components/Popup'
import CustomButton from '../components/CustomButton'

const Flashcard = (flashcard, active) => {
	return (
		<div>
			<div style={textListStyle}>{flashcard.value}</div>
		</div>
	)
};

/* TODO */
const initialFlashcards = [
	{ value: 'beren', text: 'empty-handed', tags: ['human', 'outlaw', 'mortal']},
	{ value: 'thingol', text: 'king of doriath', tags: ['elf']},
	{ value: 'luthien', text: 'princess of doriath', tags: ['elf']},
	{ value: 'huan', text: 'hound of valinor', tags: ['dog']},
	{ value: 'mablung', text: 'captain of doriath', tags: ['elf']},
	{ value: 'beleg', text: 'the strongbow', tags: ['elf']},
	{ value: 'carcharoth', text: 'the greatest werewolf to ever live', tags: ['werewolf']},
	{ value: 'the answer is really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really long', text: 'It happened that the cat met the fox in a forest, and as she thought to herself: ‘He is clever and full of experience, and much esteemed in the world,’ she spoke to him in a friendly way. ‘Good day, dear Mr Fox, how are you? How is all with you? How are you getting on in these hard times?’ The fox, full of all kinds of arrogance, looked at the cat from head to foot, and for a long time did not know whether he would give any answer or not. At last he said: ‘Oh, you wretched beard-cleaner, you piebald fool, you hungry mouse-hunter, what can you be thinking of? Have you the cheek to ask how I am getting on? What have you learnt? How many arts do you understand?’ ‘I understand but one,’ replied the cat, modestly. ‘What art is that?’ asked the fox. ‘When the hounds are following me, I can spring into a tree and save myself.’ ‘Is that all?’ said the fox. ‘I am master of a hundred arts, and have into the bargain a sackful of cunning. You make me sorry for you; come with me, I will teach you how people get away from the hounds.’ Just then came a hunter with four dogs. The cat sprang nimbly up a tree, and sat down at the top of it, where the branches and foliage quite concealed her. ‘Open your sack, Mr Fox, open your sack,’ cried the cat to him, but the dogs had already seized him, and were holding him fast. ‘Ah, Mr Fox,’ cried the cat. ‘You with your hundred arts are left in the lurch! Had you been able to climb like me, you would not have lost your life.’', tags: ['human', 'outlaw', 'mortal']},
	{ value: 'newlines', text: `Awaken, Angantyr!
Hervor awakens you;
your only daughter
by Sváfa!
Yield up from the mound
the sharp sword
that which dwarves forged
for Svafrlami.`, tags: ['poetry']},
	{ value: `True
or
false:
blah blah blah blah?
blah blah?`, text: 'multiline false', tags: ['elf']},
	{ value: '4', text: 'hound of valinor', tags: ['dog']},
	{ value: '5', text: 'empty-handed', tags: ['human', 'outlaw', 'mortal']},
	{ value: '6', text: 'king of doriath', tags: ['elf']},
	{ value: '7', text: 'princess of doriath', tags: ['elf']},
	{ value: 'singlelineoverflowsinglelineoverflowsinglelineoverflowsinglelineoverflowsinglelineoverflowsinglelineoverflow', text: 'princess of doriath', tags: ['elf']},
	{ value: '9', text: 'hound of valinor', tags: ['dog']},
	{ value: '10', text: 'empty-handed', tags: ['human', 'outlaw', 'mortal']},
];

const Home = () => {
	const [activeIndex, setActiveIndex] = useState(undefined)
	const [flipped, setFlipped] = useState(false)
	const [showPopup, setShowPopup] = useState(false);

	const [flashcards, setFlashcards] = useState(initialFlashcards);

	const addFlashcard = (newFlashcard) => {
		setFlashcards((prevFlashcards) => [...prevFlashcards, newFlashcard]);
	};

	const handleCreateClick = () => {
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const handleCardClick = (index) => {
		setFlipped(false)
		setActiveIndex(index)
	};

	// const printActiveTags = () {
	// }

	const previewPane = () => {
		return (
			<>
				<div style={{ ...cardPaneStyle.front, ...(flipped ? cardPaneStyle.back : {}) }} onClick={(e) => {
					e.stopPropagation()
					setFlipped(!flipped)
				}}>
					{(activeIndex === undefined) ?
					 <div style={{ ...textPreviewStyle, ...{color: 'lightgrey'}}}>
							Select a card for preview...
					 </div> : <div style={textPreviewStyle}>
					 {flipped ? flashcards[activeIndex].text : flashcards[activeIndex].value}
					 </div>}
					</div>
					<div>
						
					</div>
			</>
		)
	};

	return (
		<div style={contentContainer}>
			<div style={contentArea}>
				<div style={searchBarStyle}>
				<Searchbar />
					<CustomButton text="Practice" event={console.log("practice!")} stylesOverride={{backgroundColor: '#3366ff'}} />
					<CustomButton text="Create" event={handleCreateClick} stylesOverride={{backgroundColor: '#49a658', marginLeft: '3px'}} />
				</div>
				<div style={container}>
					<div style={leftContainer}>
						<ClickList active={activeIndex} list={flashcards} item={Flashcard} event={handleCardClick} styles={previewStyles} />
					</div>
					<div style={rightContainer}>
						{previewPane()}
					</div>
				</div>
				{showPopup && <CreatePopup onClose={handleClosePopup} addFlashcard={addFlashcard}/>}
			</div>
		</div>
	)
};


export default Home
