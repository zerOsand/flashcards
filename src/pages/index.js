import { useState } from 'react'
import { cardPaneStyle, cardTextStyle, cardDimmedTextStyle, contentContainer, contentArea, searchBarStyle, buttonStyle, container, leftContainer, rightContainer } from '../utils/styles'
import Searchbar from '../components/Searchbar'
import ClickList from '../components/ClickList'
import CreatePopup from '../components/Popup'

const Flashcard = (flashcard, active) => {
	return (
		<div>
			<div style={cardTextStyle}>{flashcard.value}</div>
		</div>
	)
};

/* TODO */
const flashcards = [
	{ value: 'beren', text: 'empty-handed', tags: ['human', 'outlaw', 'mortal']},
	{ value: 'thingol', text: 'king of doriath', tags: ['elf']},
	{ value: 'luthien', text: 'princess of doriath', tags: ['elf']},
	{ value: 'huan', text: 'hound of valinor', tags: ['dog']},
	{ value: 'the answer is really really really really really long', text: 'It happened that the cat met the fox in a forest, and as she thought to herself: ‘He is clever and full of experience, and much esteemed in the world,’ she spoke to him in a friendly way. ‘Good day, dear Mr Fox, how are you? How is all with you? How are you getting on in these hard times?’ The fox, full of all kinds of arrogance, looked at the cat from head to foot, and for a long time did not know whether he would give any answer or not. At last he said: ‘Oh, you wretched beard-cleaner, you piebald fool, you hungry mouse-hunter, what can you be thinking of? Have you the cheek to ask how I am getting on? What have you learnt? How many arts do you understand?’ ‘I understand but one,’ replied the cat, modestly. ‘What art is that?’ asked the fox. ‘When the hounds are following me, I can spring into a tree and save myself.’ ‘Is that all?’ said the fox. ‘I am master of a hundred arts, and have into the bargain a sackful of cunning. You make me sorry for you; come with me, I will teach you how people get away from the hounds.’ Just then came a hunter with four dogs. The cat sprang nimbly up a tree, and sat down at the top of it, where the branches and foliage quite concealed her. ‘Open your sack, Mr Fox, open your sack,’ cried the cat to him, but the dogs had already seized him, and were holding him fast. ‘Ah, Mr Fox,’ cried the cat. ‘You with your hundred arts are left in the lurch! Had you been able to climb like me, you would not have lost your life.’', tags: ['human', 'outlaw', 'mortal']},
	{ value: '2', text: 'king of doriath', tags: ['elf']},
	{ value: '3', text: 'princess of doriath', tags: ['elf']},
	{ value: '4', text: 'hound of valinor', tags: ['dog']},
];

const Home = () => {
	const [activeIndex, setActiveIndex] = useState(undefined)
	const [flipped, setFlipped] = useState(false)
	const [showPopup, setShowPopup] = useState(false);

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

	const previewPane = () => {
		return (
				<div style={cardPaneStyle} onClick={(e) => {
					e.stopPropagation()
					setFlipped(!flipped)
				}}>
					{(activeIndex === undefined) ?
					<div style={cardDimmedTextStyle}>
							Select a card for preview...
					</div> : <div style={cardTextStyle}>
					 {flipped ? flashcards[activeIndex].text : flashcards[activeIndex].value}
					</div>}
				</div>
		)
	};

	return (
		<div style={contentContainer}>
			<div style={contentArea}>
				<div style={searchBarStyle}>
					<Searchbar />
					<button onClick={handleCreateClick} style={buttonStyle}>Create</button>
				</div>
				<div style={container}>
					<div style={leftContainer}>
						<ClickList active={activeIndex} list={flashcards} item={Flashcard} event={handleCardClick} />
					</div>
					<div style={rightContainer}>
						{previewPane()}
					</div>
				</div>
				{showPopup && <CreatePopup onClose={handleClosePopup} />}
			</div>
		</div>
	)
}


export default Home
