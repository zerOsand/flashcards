import { useState, useEffect } from 'react';
import { useCards } from '../state/CardProvider.js';
import Searchbar from '../components/Searchbar';
import ClickList from '../components/ClickList';
import PreviewPane from './preview';
import CustomButton from '../components/CustomButton';
import EditCard from './editCard.js';

const Home = () => {
    const { cards, handleExportFlashcards } = useCards();
    const [activeIndex, setActiveIndex] = useState(undefined);
    const [filteredCards, setFilteredCards] = useState(cards);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 
    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    const handleCardClick = (index) => {
        setActiveIndex(index); 
    };

    const handleFilteredCardsChange = (newFilteredCards) => {
        setFilteredCards(newFilteredCards); 
    };

    const handleTagSelected = (tag) => {
        setSearchTerm((prev) => {
            const newTerm =
                typeof prev === "string" && prev.length > 0 ? `${prev},${tag}` : tag;
            return newTerm;
        });
    };

    return (
        <div style={contentContainer}>
            <div style={contentArea}>
                <div style={searchBarStyle}>
                    <Searchbar
                        onFilteredCardsChange={handleFilteredCardsChange}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <CustomButton
                        text="Export"
                        event={() => handleExportFlashcards(filteredCards)}
                        stylesOverride={{ backgroundColor: '#c9c9c9' }}
                    />
                    <CustomButton
                        text="Practice"
                        event={() => console.log('Practice!')}
                        stylesOverride={{ backgroundColor: '#3366ff' }}
                    />
                </div>
                <div style={container}>
                    <div style={leftContainer}>
                        <ClickList
                            active={activeIndex}
                            list={filteredCards}
                            item={(flashcard, active) => (
                                <div>
                                    <div style={{ ...textListStyle, ...(active && { color: 'white' }) }}>
                                        {flashcard.front}
                                    </div>
                                </div>
                            )}
                            event={handleCardClick}
                            styles={previewStyles}
                            prependItem={() => (
                                <div
                                    style={{
                                        ...previewStyles.item,
                                        backgroundColor: '#6bc879',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={togglePopup}
                                >
                                    <div style={{ ...textListStyle, color: 'white' }}>+</div>
                                </div>
                            )}
                        />
                    </div>
                    <div style={rightContainer}>
                        <PreviewPane activeIndex={activeIndex} setSearchTerm={handleTagSelected} />
                    </div>
                </div>
                {isPopupOpen && <EditCard togglePopup={togglePopup} />}
            </div>
        </div>
    );
};

const contentArea = {
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
	marginTop: '20px',
	borderStyle: 'solid',
	borderRadius: '4px',
	overflow: 'hidden',
};

const contentContainer = {
	display: 'flex',
	flexDirection: 'column',
	height: 'calc(100vh - 60px)',
	padding: 0,
	overflow: 'hidden',
};

const searchBarStyle = {
	margin: '3px',
	display: 'flex',
};

const container = {
	display: 'flex',
	overflow: 'hidden',
};

const leftContainer = {
	flex: '1 0 40%',
	overflow: 'auto',
	padding: '10px',
};

const rightContainer = {
	flex: '1 0 60%',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '#f8f8f8',
	justifyContent: 'center',
	alignItems: 'center',
};

const previewStyles = {
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	item: {
		flex: '0 0 calc(100% / 2 - 5px)', 
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

const textListStyle = {
	fontSize: 'clamp(1rem, 5vw, 1.2rem)',
	lineHeight: '1.2',
	overflow: 'hidden',
}

export default Home;



