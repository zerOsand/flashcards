import { useState, useEffect } from 'react'
import { cardPaneStyle, tagStyles, textPreviewStyle, textTagStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'
import ClickList from '../components/ClickList'

const AddTag = () => {
	return (
			<div style={{ ...tagStyles.item, ...{backgroundColor: '#6bc879'}}}>
					<div style={textTagStyle}>
						{'+'}
					</div>
				</div>
		);
}

const TagBox = (text) => {
	return (
			<div style={textTagStyle}>
				{text}
				<span>&times;</span>
			</div>
	);
}

const PreviewPane = ({activeIndex}) => {
	const { cards, removeTag } = useCards();
	const [flipped, setFlipped] = useState(false)

	const handleTagClick = (tagIndex) => {
		removeTag(activeIndex, tagIndex)
	};

	useEffect(() => {
        setFlipped(false);
    }, [activeIndex]);

	return (
			<>
				<div style={{ ...cardPaneStyle.front, ...(flipped ? cardPaneStyle.back : {}) }} onClick={(e) => {
					e.stopPropagation()
					setFlipped(!flipped)
				}}>
					{(activeIndex === undefined) ?
					 <div style={{ ...textPreviewStyle, ...{color: 'lightgrey'}}}>
							Select a card for preview...
					 </div> : <div style={textPreviewStyle}>
						 {flipped ? cards[activeIndex].back : cards[activeIndex].front}
					</div>}
				</div>
				{activeIndex !== undefined && <ClickList list={cards[activeIndex].tags} item={TagBox} event={ handleTagClick} styles={tagStyles} appendItem={AddTag} />}
			</>
	)
}


export default PreviewPane
