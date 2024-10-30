import { useState } from 'react';
import { contentArea, searchBarStyle, buttonStyle } from '../utils/styles'
import Searchbar from '../components/Searchbar'
import CreatePopup from '../components/Popup'

// const handleCreateClick = () => {
//     /* TODO 13 */
//     console.log("Create!");
// };

const Home = () => {

    const [showPopup, setShowPopup] = useState(false);

    const handleCreateClick = () => {
        setShowPopup(true); // Show the popup when the button is clicked
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Hide the popup when the close button is clicked
    };

    return (
	    <div style={contentArea}>
			<div style={searchBarStyle}>
				<Searchbar />
				<button onClick={handleCreateClick} style={buttonStyle}>Create</button>
			</div>
			{/* TODO 16 */}
			<h2>Text here</h2>
			<p>More text here</p>

			{showPopup && <CreatePopup onClose={handleClosePopup} />}
	    </div>
    )
}


export default Home
