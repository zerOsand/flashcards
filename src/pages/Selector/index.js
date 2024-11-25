import { useState, useEffect } from 'react'
import ClickList from '../../components/ClickList'
import { tagStyles, textTagStyle  } from '../../utils/styles'
import { useCards } from '../../state/CardProvider.js'

const Box = (text) => {
	return (
			<div style={{ ...textTagStyle, ...{minWidth: '200px'}}}>
			{text}
		</div>
	);
}

const Selector = ({onAdd, onRemove, tags}) => {
	const { getTags } = useCards();
 	const [inputValue, setInputValue] = useState('')
	const getMissingTags = () => {
		return getTags().filter((tag) =>
			!tags.includes(tag))
	}
	const [matchedTags, setMatchedTags] = useState(getMissingTags())

	useEffect(() => {
		const matchTags = () => {
			const match = getMissingTags().filter((tag) =>
				tag.toLowerCase().includes(inputValue.toLowerCase())
			);
			setMatchedTags(match)
		}
		matchTags()
	}, [inputValue, tags]);

	const handleInputChange = (event) => {
		setInputValue(event.target.value)
	}

	const handleAdd = (index) => {
		onAdd(matchedTags[index])
	}

	const handleRemove = (index) => {
		onRemove(tags[index])
	}

	const AddNew = () => {
		return (
			<div style={{ ...styles.searchItem, cursor: 'pointer'}} onClick={(e) => {
					 e.stopPropagation()
					 onAdd(inputValue)
					 setInputValue('')
				 }}>
				{Box('+ '.concat(inputValue))}
			</div>
		)
	}

	return (
			<div style={styles.body}>
				<div style={styles.lg}>
					<input
						style={{ height: '12px' }}
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						placeholder="Search..."
					/>
					<div style={{marginTop: '5px', display: 'flex', justifyContent: 'center', overflowY: 'auto', height: '200px'}} >
						<ClickList list={matchedTags} item={Box} event={handleAdd} styles={styles.clickList} prependItem={(inputValue !== '' && matchedTags.length === 0) ? AddNew : undefined} />
					</div>
				</div>
				<div style={styles.rg}>
					<ClickList list={tags} item={Box} event={handleRemove} styles={{ container: { ...tagStyles.container, ...{maxHeight: '200px', minHeight: '200px', justifyContent: 'center'}}, item: { ...tagStyles.item, ...{backgroundColor: '#b53550'}}}} />
				</div>
			</div>
	);
}


const styles  = {
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
	},
	searchItem: { ...tagStyles.item, ...{backgroundColor: '#6bc879'}
	},
	clickList: { ...tagStyles, container: {}, item: {...tagStyles.item, ...{backgroundColor: '#3366ff', marginBottom: '2px'}}
	},
}

export default Selector

