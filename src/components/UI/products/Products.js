import style, { TableOptions as options } from '../_style/TableStyle'
import Button from "@material-ui/core/Button";
import {Paper, Grid, Box, Toolbar, CircularProgress} from "@material-ui/core";
import { ProductTable as columns, InsertProduct as insert } from '../../../utils/tableColumn/ProductTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState, Fragment} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {productList} from "../../../utils/ServerEndPoint";
import ProductRegister from "./ProductRegister";
import StoreRegister from "../store_branch/StoreRegister";
import ProductPhoto from "./ProductPhoto";



export const Products = () => {
    const classes = style()

    const [registerDialog, setRegisterDialog] = useState(false);
    const [photoUpload, setPhotoUpload] = useState(false)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const insertData = (supplier) => {
        const newData = [supplier,...data]
        setData(newData)
    }
    useEffect(async () => {
        setLoading(true)
        const temp = []
        await Axios.get(productList).then((products) => {
            products.data.map(product =>
                temp.push(insert(product.id,product.brand,product.name,product.type,product.price,product.Supplier.name,product.Store.name,product.status))
            )
        })
        setData(...data,temp)
        setLoading(false)
    }, [])



    return (
        <Fragment>
             {/*Pop up*/}
            <ProductRegister dialog={registerDialog} closeDialog={() => setRegisterDialog(false)} insertData={insertData}/>
            <ProductPhoto dialog={photoUpload} closeDialog={() => setPhotoUpload(false)}/>

            {/*Table*/}
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Button onClick={() => setRegisterDialog(true)} variant="outlined" color="primary">
                                Add Product
                            </Button>
                            <Button onClick={() => setRegisterDialog(true)} style={{margin:'0px 20px'}} variant="outlined" color="secondary">
                                Delete Product
                            </Button>
                            <Button onClick={() => setRegisterDialog(true)} variant="outlined" color="primary">
                                Update Product
                            </Button>
                        </Box>
                        <Button variant="outlined" color="primary">
                            Transfer Product
                        </Button>
                        <Button onClick={() => setPhotoUpload(true)} variant="outlined" color="primary" style={{marginLeft: 10}}>
                            Upload Photo
                        </Button>
                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Product List
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


