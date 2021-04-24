import {Paper, TextField} from "@material-ui/core";
import {serverEndpoint} from "../../../utils/ServerEndPoint";

const ProductCard = ({classes,price, name, id,picture}) => {


    return (
        <Paper className={classes.product} variant={'outlined'}>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={`${serverEndpoint}/product/getImage/${picture}`} alt={`Product Picture${id}`}/>
            <p style={{margin:0}}>{name}</p>
            <p style={{margin:0}}>{`${price} $`}</p>
            <TextField
                inputProps={{min: 0, style: {textAlign: 'center'}}}
                value={id}/>
        </Paper>
    )
}

export default ProductCard