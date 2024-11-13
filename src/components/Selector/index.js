import { useState, useEffect } from 'react'
import ClickList from '../ClickList'
import { tagStyles, textTagStyle } from '../../utils/styles'

const defaultStyles = {
	searchItem: { ...tagStyles.item, ...{backgroundColor: '#6bc879'}
	},
	clickList: { ...tagStyles, item: {...tagStyles.item, ...{backgroundColor: '#3366ff'}}
	},
}

const Box = (text) => {
	return (
		<div style={{ ...textTagStyle, ...{minWidth: '200px'}}}>
				{text}
			</div>
	);
}

const Selector = ({onSelect, entries, item, styles}) => {
	const [inputValue, setInputValue] = useState('')
	const [matchedEntries, setMatchedEntries] = useState(entries)
	item = item || Box
	styles = styles || defaultStyles

	useEffect(() => {
		const matchEntries = () => {
			const match = entries.filter((entry) =>
				entry.toLowerCase().includes(inputValue.toLowerCase())
			);
			setMatchedEntries(match)
		}
		matchEntries()
	}, [inputValue, entries]);

	const handleInputChange = (event) => {
		setInputValue(event.target.value)
	}

	const handleEntryClick = (index) => {
		onSelect(matchedEntries[index])
	}

	const AddNew = () => {
		return (
			<div style={{ ...styles.searchItem, cursor: 'pointer'}} onClick={(e) => {
					 e.stopPropagation()
					 onSelect(inputValue)
				 }}>
				{item('+ '.concat(inputValue))}
			</div>
		)
	}

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Search..."
			/>
			<div style={{marginTop: '5px', display: 'flex', justifyContent: 'center', overflowY: 'auto', height: '200px'}} >
				<ClickList list={matchedEntries} item={item} event={handleEntryClick} styles={styles.clickList} prependItem={(inputValue !== '' && matchedEntries.length === 0) ? AddNew : undefined} />
			</div>
		</div>
	);
}


export default Selector
