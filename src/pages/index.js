import { useState } from 'react'
import { cardPaneStyle, previewStyles, textListStyle, textPreviewStyle, contentContainer, contentArea, searchBarStyle, container, leftContainer, rightContainer } from '../utils/styles'
import { getCards } from '../state/cardList.js'
import Searchbar from '../components/Searchbar'
import ClickList from '../components/ClickList'
import CreatePopup from '../components/Popup'
import CustomButton from '../components/CustomButton'

const Flashcard = (flashcard, active) => {
	return (
		<div>
			<div style={textListStyle}>{flashcard.front}</div>
		</div>
	)
};


const Home = () => {
	const [activeIndex, setActiveIndex] = useState(undefined)
	const [flipped, setFlipped] = useState(false)
	const [showPopup, setShowPopup] = useState(false);
	const flashcards = getCards()

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
					 {flipped ? flashcards[activeIndex].back : flashcards[activeIndex].front}
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
				{showPopup && <CreatePopup onClose={handleClosePopup} />}
			</div>
		</div>
	)
};


export default Home
