import style, { TableOptions as options } from '../_style/TableStyle'
import Button from "@material-ui/core/Button";
import {Paper,Grid,Box,Toolbar} from "@material-ui/core";
import { SalesTable as columns, InsertSales as insert } from '../_utils/tableColumn/SalesTable'
import MUIDataTable from 'mui-datatables'
const rowClicked = (id) => {
}


const data = [
    insert("123123", "Nestle",123, 10,1230,123123,'11-20-30'),
    insert("123123", "Nestle",123, 10,1230,123123,'11-20-30')

]
export const Sales = () => {
    const classes = style()
    return (
        <Grid component="main" className={classes.root}>
            <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                <Toolbar>
                    <Box className={classes.tableNavbarBox}>
                        {/*<Button variant="outlined" color="primary">*/}
                        {/*    Add Users*/}
                        {/*</Button>*/}
                    </Box>
                    <Button variant="outlined" color="primary">
                        Quit
                    </Button>
                </Toolbar>
            </Grid>
            <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                <MUIDataTable
                    title={"Sales List"}
                    data={data}
                    columns={columns}
                    options={options(rowClicked)}
                />
            </Grid>
        </Grid>
    )
}


