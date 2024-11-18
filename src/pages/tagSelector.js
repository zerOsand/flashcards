import CustomButton from '../components/CustomButton'
import DefaultPopup from '../components/Popup'
import { defaultPopupStyle, tagStyles, textTagStyle } from '../utils/styles'
import Selector from '../components/Selector'
import { useCards } from '../state/CardProvider.js'
import ClickList from '../components/ClickList'


const TagSelector = ({ isPopupOpen, togglePopup, index}) => {
	const { cards, getTags, addTag, removeTag } = useCards()

	const TagBox = (text) => {
		return (
				<div style={{ ...textTagStyle, ...{minWidth: '200px'}}}>
					{text}
				</div>
		);
	}

	const getMissingTags = () => {
		return getTags().filter((tag) =>
			!cards[index].tags.includes(tag))
	}

	const handleAdd = (tag) => {
		addTag(index, tag)
	}

	const handleRemove = (tag) => {
		removeTag(index, tag)
	}

	return (
		<DefaultPopup
			onClose={togglePopup}>
			<div style={defaultPopupStyle.overlay}>
				<div style={defaultPopupStyle.modal}>
					<h2>Edit Tags</h2>
					<div style={tagGrid.body}>
						<div style={tagGrid.lg}>
							<Selector onSelect={handleAdd} item={TagBox} entries={getMissingTags()} />
						</div>
						<div style={tagGrid.rg}>
			<ClickList list={cards[index].tags} item={TagBox} event={handleRemove} styles={{ container: { ...tagStyles.container, ...{maxHeight: '200px', minHeight: '200px', justifyContent: 'center'}}, item: { ...tagStyles.item, ...{backgroundColor: '#b53550'}}}} />
						</div>
					</div>
					<div style={defaultPopupStyle.buttonContainer}>
						<CustomButton text="Done" event={togglePopup} />
					</div>
				</div>
			</div>
		</DefaultPopup>
	)
}


export const tagGrid = {
	body: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridGap: '10px',
		alignItems: 'end',
	},
	lg: {
		gridRow: 1,
		gridColumn: 1,
	},
	rg: {
		gridRow: 1,
		gridColumn: 2,
		overflowY: 'auto'
	}
}


export default TagSelector
