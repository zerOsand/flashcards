import { useState } from 'react'
import DefaultPopup from '../components/Popup'
import CustomButton from '../components/CustomButton'
import ConfirmationPopup from './confirmPopup'
import Selector from '../components/Selector'
import { defaultPopupStyle, textTagStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'

const RemoveCard = ({togglePopup, cardIndex, styles}) => {
	styles = styles || defaultPopupStyle

	const { removeCard } = useCards();

	const handleYes = () => {
		removeCard(cardIndex)
        togglePopup()
	};

    const handleNo = () => {
        togglePopup()
    };

	return (
        <DefaultPopup        
            onClose={togglePopup}>
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <h2>Are you sure you want to remove this flashcard?</h2>
                    <CustomButton text="No" event={() => handleNo()} stylesOverride={{backgroundColor: '#b53550'}}/>
                    <CustomButton text="Yes" event={() => handleYes()} stylesOverride={{backgroundColor:'#6bc879'}}/>
                </div>
            </div>
        </DefaultPopup>
	)
};


export default RemoveCard;
