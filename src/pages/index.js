import { useEffect, useState } from 'react'
import { contentArea, searchBarStyle, buttonStyle } from '../utils/styles'
import Searchbar from '../components/Searchbar'
import ClickList from '../components/ClickList'

const Flashcard = (flashcard, active) => {
    /* TODO */
    return (
            <div>
            <div>{flashcard.value}</div>
            {active === true ? console.log(flashcard.text) : null}
        </div>
    )
};

/* TODO */
const flashcards = [
    { value: 'beren', text: 'empty-handed', tags: ['human', 'outlaw', 'mortal']},
    { value: 'thingol', text: 'king of doriath', tags: ['elf']},
    { value: 'luthien', text: 'princess of doriath', tags: ['elf']},
    { value: 'huan', text: 'hound of valinor', tags: ['dog']},
    { value: '1', text: 'empty-handed', tags: ['human', 'outlaw', 'mortal']},
    { value: '2', text: 'king of doriath', tags: ['elf']},
    { value: '3', text: 'princess of doriath', tags: ['elf']},
    { value: '4', text: 'hound of valinor', tags: ['dog']},
];

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(null)

    const handleCreateClick = () => {
        /* TODO 13 */
        console.log("Create!");
    };

    const handleCardClick = (index) => {
        setActiveIndex(index)
    }

    return (
        <div style={contentArea}>
        <div style={searchBarStyle}>
          <Searchbar />
          <button onClick={handleCreateClick} style={buttonStyle}>Create
          </button>
        </div>
          <div className="container">
        <div className="left">
          <ClickList active={activeIndex} list={flashcards} item={Flashcard} event={handleCardClick} />
        </div>
        <div className="right">
          <h2>This displays a close-up view of a single flashcard.
          </h2>
        </div>
          </div>
      </div>
    )
}


export default Home
