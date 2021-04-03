import {TextField} from "@material-ui/core";

const InputItem = ({classes}) => {
    return (
        <div className={classes.inputItem}>
            <TextField style={{width: '100%', marginLeft: 10}} placeholder="Barcode here" variant="outlined"/>
            <TextField style={{width: '90px', marginRight: 10}} placeholder="QTY" variant="outlined"/>
        </div>
    )
}

export default InputItem