import React from 'react';

function DefaultPopup({ onClose, children }) {

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default DefaultPopup;

