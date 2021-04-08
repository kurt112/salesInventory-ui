import style, { TableOptions as options } from '../_style/TableStyle'
import Button from "@material-ui/core/Button";
import {Paper, Grid, Box, Toolbar, CircularProgress} from "@material-ui/core";
import { SupplierTable as columns, InsertSupplier as insert } from '../../../utils/tableColumn/SupplierTable'
import MUIDataTable from 'mui-datatables'
import SupplierRegister from "./SupplierRegister";
import {Fragment, useEffect, useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {supplierList} from "../../../utils/ServerEndPoint";
import Typography from "@material-ui/core/Typography";

export const Supplier = () => {
    const classes = style()
    
    const [dialog, setDialog] = useState(false);
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(false)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setLoading(true)
        const temp = []
        await Axios.get(supplierList).then((suppliers) => {
            suppliers.data.map(supplier =>
                temp.push(insert(supplier.id, supplier.name,supplier.email, supplier.address,supplier.city,supplier.state,supplier.postalCode,supplier.mobile_no, supplier.tel_no))
            )
        })

        setData(...data,temp)
        setLoading(false)
    }, [])


    const insertData = (supplier) => {
        const newData = [supplier,...data]
        setData(newData)
    }

    return (
        <Fragment>
            <SupplierRegister dialog={dialog} closeDialog={() => setDialog(false)} insertData={insertData}/>
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Button onClick={() => setDialog(true)} variant="outlined" color="primary">
                                Add Supplier
                            </Button>
                            <Button onClick={() => setDialog(true)} style={{margin:'0px 20px'}} variant="outlined" color="secondary">
                                Delete Supplier
                            </Button>
                            <Button onClick={() => setDialog(true)} variant="outlined" color="primary">
                                Update Supplier
                            </Button>
                        </Box>

                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Supplier List
                                {loading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                            </Typography>
                        }
                        data={data}
                        columns={columns}
                        options={options(loading)}
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}


