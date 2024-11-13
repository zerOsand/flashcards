import { useState } from 'react'
import { previewStyles, textListStyle, contentContainer, contentArea, searchBarStyle, container, leftContainer, rightContainer } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'
import Searchbar from '../components/Searchbar'
import ClickList from '../components/ClickList'
import PreviewPane from './preview'
import CustomButton from '../components/CustomButton'
import CreateCard from './createCard.js'

const Flashcard = (flashcard, active) => {
	return (
		<div>
			<div style={{ ...textListStyle, ...(active && { color: 'white' })}}>{flashcard.front}</div>
		</div>
	)
};

const Home = () => {
	const { cards, addCard } = useCards();
	const [activeIndex, setActiveIndex] = useState(undefined)
	const [filteredCards, setFilteredCards] = useState(cards);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const convertIndex = (array, target) => {
		return array.findIndex(item => {
			return item.id === target.id;
		});
	};

	const togglePopup = () => setIsPopupOpen(!isPopupOpen);

	const handleCardClick = (index) => {
		// use the 'true' index
		setActiveIndex(convertIndex(cards, filteredCards[index]));
	};

	const AddFlashcard = () => {
		return (
				<div style={{ ...previewStyles.item, ...{backgroundColor: '#6bc879', border: 'none', cursor: 'pointer'}}} 
				onClick={togglePopup}>
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
						<ClickList 
							active={(activeIndex === undefined) ? activeIndex : convertIndex(filteredCards, cards[activeIndex])} 
							list={filteredCards} 
							item={Flashcard} 
							event={handleCardClick} 
							styles={previewStyles} 
							appendItem={AddFlashcard} 
						/>
					</div>
					<div style={rightContainer}>
						<PreviewPane activeIndex={activeIndex} />
					</div>
				</div>
				
				{isPopupOpen && (
					<CreateCard
						isPopupOpen={isPopupOpen}
						togglePopup={togglePopup}
						addCard={addCard}
					/>
				)}

			</div>
		</div>
	)
};


export default Home
