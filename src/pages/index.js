import { contentArea, searchBarStyle, buttonStyle } from '../utils/styles'
import Searchbar from '../components/Searchbar'

const handleCreateClick = () => {
    /* TODO 13 */
    console.log("Create!");
};

const Home = () => {
    return (
	    <div style={contentArea}>
	    <div style={searchBarStyle}>
	    <Searchbar />
	    <button onClick={handleCreateClick} style={buttonStyle}>Create</button>
	    </div>
	    {/* TODO 16 */}
	    <h2>Text here
	</h2>
	    <p>More text here
	</p>
	    </div>
    )
}


export default Home
