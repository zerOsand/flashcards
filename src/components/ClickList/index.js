import { cardPreviewStyle } from '../../utils/styles'

const Box = (value) => {
    return <div>{value}</div>
}

const ClickList = ({ active, list, item, event, styles }) => {
    return list.map((value, index) => {
        let style = styles ? (Array.isArray(styles) ? styles[index] : styles) : cardPreviewStyle
        style = JSON.parse(JSON.stringify(style));
        style.cursor = 'pointer'
        return (
            <div key={index} style={style} onClick={(e) => {
                e.stopPropagation()
                event(index);
            }}>
                {item ? item(value, active === index) : Box(value)}
            </div>
        )
    })
}

export default ClickList
