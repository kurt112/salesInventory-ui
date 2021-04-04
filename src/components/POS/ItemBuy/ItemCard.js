const ItemCard = ({classes}) => {
    return (
        <div className={classes.itemCard}>
            <div className={classes.titlePrice}>
                <p>Product Title</p>
                <p>price</p>
            </div>
            <div className={classes.productDescription}>
                <p>Product Description</p>
                <p>QTY</p>
            </div>
        </div>
    )
}

export default  ItemCard