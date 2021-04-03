import {Button, makeStyles, Paper} from "@material-ui/core";
import {Fragment} from "react";
import Phone from '../../../assets/img/cellphone/iphone.png'


const ProductCard = ({classes}) => {


    return (
        <Paper className={classes.product} variant={'outlined'}>
            <img src={Phone} />
            <p>IPhone 4 asdlfkasldkfj</p>
            <Button color={'primary'} variant='contained'>Copy Barcode</Button>
        </Paper>
    )
}

export default ProductCard