import { useState } from 'react'
import { previewStyles, textListStyle, contentContainer, contentArea, searchBarStyle, container, leftContainer, rightContainer } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'
import Searchbar from '../components/Searchbar'
import ClickList from '../components/ClickList'
import PreviewPane from './preview'
import CreatePopup from '../components/Popup'
import CustomButton from '../components/CustomButton'

const Flashcard = (flashcard, active) => {
	return (
		<div>
			<div style={{ ...textListStyle, ...(active && { color: 'white' })}}>{flashcard.front}</div>
		</div>
	)
};

const Home = () => {
	const { cards } = useCards();
	const [activeIndex, setActiveIndex] = useState(undefined)
	const [showPopup, setShowPopup] = useState(false);
	const [filteredCards, setFilteredCards] = useState(cards);

	const convertIndex = (array, target) => {
		return array.findIndex(item => {
			return item.id === target.id;
		});
	};

	const handleCreateClick = () => {
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const handleCardClick = (index) => {
		// use the 'true' index
		setActiveIndex(convertIndex(cards, filteredCards[index]));
	};

	const AddFlashcard = () => {
		return (
				<div style={{ ...previewStyles.item, ...{backgroundColor: '#6bc879', border: 'none'}}} onClick={handleCreateClick}>
					<div style={{ ...textListStyle, ...{color: 'white'}}}>
						{'+'}
					</div>
				</div>
		);
	}

	const handleFilteredCardsChange = (newFilteredCards) => {
		setFilteredCards(newFilteredCards);
	};

	return (
		<div style={contentContainer}>
			<div style={contentArea}>
				<div style={searchBarStyle}>
					<Searchbar onFilteredCardsChange={handleFilteredCardsChange} />
					<CustomButton text="Practice" event={console.log("practice!")} stylesOverride={{backgroundColor: '#3366ff'}} />
				</div>
				<div style={container}>
					<div style={leftContainer}>
			<ClickList active={(activeIndex === undefined) ? activeIndex : convertIndex(filteredCards, cards[activeIndex])} list={filteredCards} item={Flashcard} event={handleCardClick} styles={previewStyles} appendItem={AddFlashcard} />
					</div>
					<div style={rightContainer}>
						<PreviewPane activeIndex={activeIndex} />
					</div>
				</div>
				{showPopup && <CreatePopup onClose={handleClosePopup} />}
			</div>
		</div>
	)
};


export default Home
