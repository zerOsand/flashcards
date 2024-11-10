import { useState } from 'react'
import { previewStyles, textListStyle, contentContainer, contentArea, searchBarStyle, container, leftContainer, rightContainer } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'
import Searchbar from '../components/Searchbar'
import ClickList from '../components/ClickList'
import PreviewPane from './preview'
import CreatePopup from '../components/Popup'
import CustomButton from '../components/CustomButton'

// Styles for the popup component
import { styles } from '../components/Popup/popupElements'

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
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleSave = () => {
        if (front.trim() && back.trim()) {
            cards(front.trim(), back.trim(), []);
            togglePopup();
        }
    };

	const convertIndex = (array, target) => {
		return array.findIndex(item => {
			return Object.keys(target).every(key => item[key] === target[key]);
		});
	};

	// Turned popup into a toggle to save on code space
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
				
				{/** Start Createpopup for create flashcard*/}

				{<CreatePopup 
					isOpen={isPopupOpen} 
					onClose={togglePopup}>
					<div style={styles.overlay}>
						<div style={styles.modal}>
							<h2>Create Flashcard</h2>
							<div style={styles.inputContainer}>
								<label style={styles.label}>Front</label>
								<textarea 
									style={styles.textarea} 
									value={front}
									onChange={(e) => setFront(e.target.value)}/>
							</div>

							<div style={styles.inputContainer}>
								<label style={styles.label}>Back</label>
								<textarea 
									style={styles.textarea} 
									value={back}
									onChange={(e) => setBack(e.target.value)}/>
							</div>

							<div style={styles.buttonContainer}>
								<CustomButton text="Cancel" event={togglePopup} /* TODO #15; confirm cancel */ stylesOverride={{backgroundColor: '#b53550'}}/>
								<CustomButton text="Save" event={handleSave} stylesOverride={{backgroundColor: '#6bc879'}}/>
							</div>

						</div>
					</div>
				</CreatePopup>}

				{/** End Createpopup for create flashcard*/}

			</div>
		</div>
	)
};


export default Home
