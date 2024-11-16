import { useState, useEffect } from 'react'
import ClickList from '../ClickList'
import { tagStyles } from '../../utils/styles'

const defaultStyles = {
	searchItem: { ...tagStyles.item, ...{backgroundColor: '#6bc879'}
	},
	clickList: { ...tagStyles, container: {}, item: {...tagStyles.item, ...{backgroundColor: '#3366ff', marginBottom: '2px'}}
	},
}

const Box = (text) => {
	return (
			<div>
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
					 setInputValue('')
				 }}>
				{item('+ '.concat(inputValue))}
			</div>
		)
	}

	return (
		<div>
			<input
				style={{ height: '12px' }}
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
