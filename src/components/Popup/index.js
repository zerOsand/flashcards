import React from 'react';
// import { styles } from './popupElements'
// import { useCards } from '../../state/CardProvider.js'
// import CustomButton from '../CustomButton'

function DefaultPopup({ isOpen, onClose, children }) {
    if (!isOpen) return null; // Renders nothing if popup is closed

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default DefaultPopup;
