import { useMemo, useState } from 'react'
import { createFlashcardStyle, textTagStyle, tagStyles } from '../utils/styles'
import CustomButton from '../components/CustomButton'
import DefaultPopup from '../components/Popup'
import Selector from '../components/Selector'
import { useCards } from '../state/CardProvider.js'


const TagSelector = ({ isPopupOpen, togglePopup, index}) => {
	const { cards, getTags, addTag } = useCards()

	const getMissingTags = () => {
		return getTags().filter((tag) =>
			!cards[index].tags.includes(tag))
	}

	const handleAdd = (tag) => {
		addTag(index, tag)
	}

	return (
		<DefaultPopup
			isOpen={isPopupOpen}
			onClose={togglePopup}>
			<div style={createFlashcardStyle.overlay}>
				<div style={createFlashcardStyle.modal}>
					<h2>Edit Tags</h2>

						<Selector onSelect={handleAdd} entries={getMissingTags()} />
						<div style={createFlashcardStyle.buttonContainer}>
							<CustomButton text="Done" event={togglePopup} />
						</div>

				</div>
			</div>
		</DefaultPopup>
	)
}


export default TagSelector
