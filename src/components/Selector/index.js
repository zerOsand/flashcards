import { useState, useEffect } from 'react'
import ClickList from '../ClickList'

const Box = (text) => {
	return (
			<div styles>
				{text}
			</div>
	);
}

const Selector = ({onSelect, entries}) => {
	const [inputValue, setInputValue] = useState('')
	const [matchedEntries, setMatchedEntries] = useState(entries)
	const [selection, setSelection] = useState(null)

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

	const handleEntryClick = (entry) => {
		setSelection(entry)
		onSelect(entry)
	}

	const handleButtonClick = (entry) => {
		setSelection(inputValue);
		onSelect(inputValue);
	}

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Search..."
			/>
			<ClickList list={matchedEntries} item={Box} event={handleEntryClick} />
			<p>Selected: {entries[selection]}</p>
		</div>
	);
}


export default Selector
