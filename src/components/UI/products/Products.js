import style, { TableOptions as options } from '../_style/TableStyle'
import Button from "@material-ui/core/Button";
import {Paper,Grid,Box,Toolbar} from "@material-ui/core";
import { ProductTable as columns, InsertProduct as insert } from '../_utils/tableColumn/ProductTable'
import MUIDataTable from 'mui-datatables'
const rowClicked = (id) => {
}


const data = [
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),
    insert("123123", "Nestle", "BearBrand","Goods",99.5,"ako","Pink","Active"),


]
export const Products = () => {
    const classes = style()
    return (
        <Grid component="main" className={classes.root}>
            <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                <Toolbar>
                    <Box className={classes.tableNavbarBox}>
                        <Button variant="outlined" color="primary">
                            Add Product
                        </Button>
                    </Box>
                    <Button variant="outlined" color="primary">
                        Quit
                    </Button>
                </Toolbar>
            </Grid>
            <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                <MUIDataTable
                    title={"Product List"}
                    data={data}
                    columns={columns}
                    options={options(rowClicked)}
                />
            </Grid>
        </Grid>
    )
}


