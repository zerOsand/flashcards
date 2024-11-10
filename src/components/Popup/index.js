import React from 'react';
// import { styles } from './popupElements'
// import { useCards } from '../../state/CardProvider.js'
// import CustomButton from '../CustomButton'

function CreatePopup({ isOpen, onClose, children }) {
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

// function CreatePopup({ onClose }) {

// 	const { addCard } = useCards()
//     const [front, setFront] = useState('');
//     const [back, setBack] = useState('');

//     const handleSave = () => {
//         if (front.trim() && back.trim()) {
//             addCard(front.trim(), back.trim(), []);
//             onClose();
//         }
//     };

//     return (
//         <div style={styles.overlay}>
//             <div style={styles.modal}>
//                 <h2>Create Flashcard</h2>
//                 <div style={styles.inputContainer}>
//                     <label style={styles.label}>Front</label>
//                     <textarea 
//                         style={styles.textarea} 
//                         value={front}
//                         onChange={(e) => setFront(e.target.value)}/>
//                 </div>

//                 <div style={styles.inputContainer}>
//                     <label style={styles.label}>Back</label>
//                     <textarea 
//                         style={styles.textarea} 
//                         value={back}
//                         onChange={(e) => setBack(e.target.value)}/>
//                 </div>

// 				<div style={styles.buttonContainer}>
// 					<CustomButton text="Cancel" event={onClose} /* TODO #15; confirm cancel */ stylesOverride={{backgroundColor: '#b53550'}}/>
// 					<CustomButton text="Save" event={handleSave} stylesOverride={{backgroundColor: '#6bc879'}}/>
// 				</div>

//             </div>
//         </div>
//     );
// };


export default CreatePopup;
