import { useState } from 'react'
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
	const { cards } = useCards();
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
							prependItem={AddFlashcard}
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
					/>
				)}

			</div>
		</div>
	)
};


export const contentArea = {
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
	marginTop: '20px',
	borderStyle: 'solid',
	borderRadius: '4px',
	overflow: 'hidden',
};

export const contentContainer = {
	display: 'flex',
	flexDirection: 'column',
	height: 'calc(100vh - 60px)',
	padding: 0,
	overflow: 'hidden',
};

export const searchBarStyle = {
	margin: '3px',
	display: 'flex',
};

export const container = {
	display: 'flex',
	overflow: 'hidden',
};

export const leftContainer = {
	flex: '1 0 40%',
	overflow: 'auto',
	padding: '10px',
};

export const rightContainer = {
	flex: '1 0 60%',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '#f8f8f8',
	justifyContent: 'center',
	alignItems: 'center',
};

export const previewStyles = {
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	item: {
		flex: '0 0 calc(100% / 2 - 5px)', // items/spacing per row
		marginBottom: '15px',
		borderStyle: 'solid',
		borderRadius: '4px',
		borderWidth: 'thin',
		background: '#e0e0e0',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '75px',
		overflow: 'hidden',
		boxSizing: 'border-box',
	},
	active_item: {
		background: '#3366ff',
		color: '#000',
		borderWidth: 'medium',
	},
};

export const textListStyle = {
	fontSize: 'clamp(1rem, 5vw, 1.2rem)',
	lineHeight: '1.2',
	overflow: 'hidden',
}


export default Home
