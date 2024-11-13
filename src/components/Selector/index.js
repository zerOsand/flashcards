import { useState, useEffect } from 'react'
import ClickList from '../ClickList'

const Box = (text) => {
	return (
			<div>
				{text}
			</div>
	);
}

const Selector = ({onSelect, entries}) => {
	const [inputValue, setInputValue] = useState('')
	const [matchedEntries, setMatchedEntries] = useState(entries)

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
		onSelect(entries[index])
	}

	const AddNew = () => {
		return (
			<div style={{cursor: 'pointer'}} onClick={(e) => {
					 e.stopPropagation()
					 onSelect(inputValue)
				 }}>
				{Box(inputValue)}
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
			<ClickList list={matchedEntries} item={Box} event={handleEntryClick} prependItem={inputValue !== '' ? AddNew : undefined} />
		</div>
	);
}


export default Selector
