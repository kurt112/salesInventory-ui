import style, {TableOptions as options} from '../_style/TableStyle'
import Button from "@material-ui/core/Button";
import {Paper, Grid, Box, Toolbar, CircularProgress} from "@material-ui/core";
import {ProductTable as columns, InsertProduct as insert} from '../../../utils/tableColumn/ProductTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState, Fragment} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {productImages, productList, storeList, supplierList} from "../../../utils/ServerEndPoint";
import ProductRegister from "./ProductRegister";
import ProductPhoto from "./ProductPhoto";
import DeleteProduct from "./DeleteProduct";
import TransferProduct from "./TransferProduct";


export const Products = () => {
    const classes = style()

    // for dialog
    const [registerDialog, setRegisterDialog] = useState(false);
    const [photoUpload, setPhotoUpload] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [transferDialog, setTransferDialog] = useState(false)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false);

    // for autoComplete in Dialog
    const [stores, setStores] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [images, setImages] = useState([])

    useEffect(async () => {
        setLoading(true)
        const temp = []
        await Axios.get(productList).then((products) => {
            products.data.map(product =>
                temp.push(insert(product.code, product.brand, product.name, product.type, product.price, product.Supplier.name, product.Store.name, product.status))
            )
        })
        setData(...data, temp)
        setLoading(false)

        Axios.get(storeList).then(e => {
            setStores(e.data)
        })

        Axios.get(supplierList).then(e => {
            setSuppliers(e.data)
        })

        Axios.get(productImages).then(e => {
            setImages(e.data)
        })

    }, [])

    const openDialog = (isUpdate) => {
        setUpdate(isUpdate)
        setRegisterDialog(true)
    }

    const insertData = (product) => {
        const temp = data;
        temp.unshift(product)
        const newData = [product, ...data]
        setData(newData)
    }


    const deleteProduct = (item) => {

        const tempData = [...data]
        let tempQ = item.qty
        const code = item.code

        while (tempQ !== 0) {
            let current;

            tempData.find((e, index) => {
                current = index
                return e.code.toString() === code
            })

            tempData.splice(current, 1)

            tempQ--

        }

        setData(tempData)
    }

    return (
        <Fragment>
            {/*Pop up*/}

            <ProductRegister images={images} stores={stores} suppliers={suppliers} update={update}
                             dialog={registerDialog} closeDialog={() => setRegisterDialog(false)}
                             insertData={insertData}/>
            <ProductPhoto dialog={photoUpload} closeDialog={() => setPhotoUpload(false)}/>

            <DeleteProduct
                dialog={deleteDialog}
                closeDialog={() => setDeleteDialog(false)}
                deleteProduct={deleteProduct}
            />

                <TransferProduct dialog={transferDialog} closeDialog={() => setTransferDialog(false)}/>

            {/*Table*/}
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Button onClick={() => openDialog(false)} variant="outlined" color="primary">
                                Add Product
                            </Button>
                            <Button onClick={() => setDeleteDialog(true)} style={{margin: '0px 20px'}}
                                    variant="outlined" color="secondary">
                                Delete Product
                            </Button>
                            <Button onClick={() => openDialog(true)} variant="outlined" color="primary">
                                Update Product
                            </Button>
                        </Box>
                        <Button onClick={() => setTransferDialog(true)} variant="outlined" color="primary">
                            Transfer Product
                        </Button>
                        <Button onClick={() => setPhotoUpload(true)} variant="outlined" color="primary"
                                style={{marginLeft: 10}}>
                            Upload Photo
                        </Button>
                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Product List
                                {loading &&
                                <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}}/>}
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


