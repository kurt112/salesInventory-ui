import style, { TableOptions as options } from '../_style/TableStyle'
import Button from "@material-ui/core/Button";
import {Paper, Grid, Box, Toolbar, CircularProgress} from "@material-ui/core";
import { SalesTable as columns, InsertSales as insert } from '../../../utils/tableColumn/SalesTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {salesList} from "../../../utils/ServerEndPoint";

export const Sales = () => {
    const classes = style()
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(false)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setLoading(true)
        const temp = []
        await Axios.get(salesList).then((sales) => {
            sales.data.map(sale =>
                temp.push(insert(sale.id, sale.Product.name,sale.Product.price,sale.qty, sale.total,sale.Transaction.id,sale.createdAt))
            )
        })

        setData(...data,temp)
        setLoading(false)
    }, [])

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
                    title={
                        <Typography variant="h6">
                            Sales List
                            {loading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                        </Typography>
                    }
                    data={data}
                    columns={columns}
                    options={options(loading)}
                />
            </Grid>
        </Grid>
    )
}


