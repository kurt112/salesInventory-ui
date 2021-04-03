const ItemCard = ({classes}) => {
    return (
        <div className={classes.itemCard}>
            <div className={classes.titlePrice}>
                <p>product Title</p>
                <p>price</p>
            </div>
            <div className={classes.productDescription}>

            </div>
        </div>
    )
}

export default  ItemCard