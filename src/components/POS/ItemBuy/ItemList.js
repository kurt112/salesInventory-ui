import ItemCard  from "./ItemCard";
import ScrollToBottom from 'react-scroll-to-bottom';
const ItemList = ({classes}) => {
    return (
        <ScrollToBottom className={classes.itemList}>
            <ItemCard classes={classes}/>
            <ItemCard classes={classes}/>
            <ItemCard classes={classes}/>
            <ItemCard classes={classes}/>

        </ScrollToBottom>
    )
}

export default ItemList