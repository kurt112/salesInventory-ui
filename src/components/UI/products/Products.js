import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip, FormControl, InputLabel, Select} from "@material-ui/core";
import {ProductTable as columns, InsertProduct as insert} from '../../../utils/tableColumn/ProductTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState, Fragment} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {ListProductType, productImages, productList, storeList, supplierList} from "../../../utils/ServerEndPoint";
import ProductRegister from "./ProductRegister";
import ProductPhoto from "./ProductPhoto";
import DeleteProduct from "./DeleteProduct";
import TransferProduct from "./TransferProduct";

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import UpdateProduct from "./UpdateProduct";

export const Products = ({user}) => {
    const classes = style()

    // for dialog
    const [registerDialog, setRegisterDialog] = useState(false);
    const [photoUpload, setPhotoUpload] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [transferDialog, setTransferDialog] = useState(false)
    const [updateDialog, setUpdateDialog] = useState(false)


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    // for autoComplete in Dialog
    const [stores, setStores] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [images, setImages] = useState([])
    const [productType, setProductType] = useState([])
    const [productStatus, setProductStatus] = useState('Available')
    const [branch, setBranch] = useState(user.StoreId)
    const role = user.role

    // for table
    const [page,setPage] = useState(0)
    const [size,setSize] = useState(10)
    const [search, setSearch] = useState('')
    const [count,setCount] = useState(10)

    // function for table
    const changePage = (page) => {
        setPage(page)
    }

    const changeSearch = (s) => {

        setPage(0)
        if(s === null) {
            setSearch('')
            return
        }

        setData([])
        setSearch(s)
    }

    const changeRowsPerPage = (s) => {
        setPage(0)
        setData([])
        setSize(s)
    }


    useEffect(() => {
        const data = async () => {

            await baseUrlWithAuth.get(storeList).then(e => {
                setStores(e.data)
            })

            await baseUrlWithAuth.get(supplierList).then(e => {
                setSuppliers(e.data)
            })

            await baseUrlWithAuth.get(productImages).then(e => {
                setImages(e.data)
            })

        }

        getProductType().then(ignored => {})
        data().then(ignored => {})
    }, [])

    useEffect(() => {
        getProducts().then(ignored => {})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, branch, size, search, productStatus])

    const insertImage = () => {

        baseUrlWithAuth.get(productImages).then(e => {
            setImages(e.data)
        })
    }

    const getProducts = async () => {
        setLoading(true)
        const temp = []
        await baseUrlWithAuth.get(productList, {
            params: {
                branch,
                status: productStatus,
                page,
                size,
                search
            }
        }).then((products) => {

            setCount(products.data.count)

            products.data.rows.map(product => temp.push(insert(product.code, product.brand, product.name, product.ProductType.name, product.price, product.Supplier.name, product.Store.location, product.status,product.id, product.createdAt)))
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            setLoading(false)
        })
        const tempData = [...data, ...temp]
        setData(tempData)

    }


    const changeBranch =  (value) => {
        setData([])
        setPage(0)
        setBranch(value)
    }


    const changeProductStatus = (status) => {
        setData([])
        setPage(0)
        setProductStatus(status)
    }

    const getProductType = async () => {
        await baseUrlWithAuth.get(ListProductType)
            .then(e => {
                const temp = []
                e.data.map(productType => temp.push(productType))
                setProductType(temp)
            })
            .catch(error => {
                console.log(error)
            })
    }


    const Reload = () => {
        setData([])
        setPage(0)
        getProducts().then(ignored => {})
    }


    return (
        <Fragment>
            {/*Pop up*/}

            <ProductRegister
                branch={branch}
                role={role}
                images={images}
                stores={stores}
                suppliers={suppliers}
                dialog={registerDialog}
                closeDialog={() => setRegisterDialog(false)}
                reload={Reload}
                type={productType}
            />

            <UpdateProduct
                user={user}
                branch={branch}
                role={role}
                images={images}
                stores={stores}
                suppliers={suppliers}
                dialog={updateDialog}
                closeDialog={() => setUpdateDialog(false)}
                reload={Reload}
                type={productType}
            />

            <ProductPhoto insertPicture={insertImage} dialog={photoUpload} closeDialog={() => setPhotoUpload(false)}/>

            <DeleteProduct
                branch={branch}
                dialog={deleteDialog}
                closeDialog={() => setDeleteDialog(false)}
                Reload={Reload}
            />

            <TransferProduct
                userId={user.id}
                branch={branch}
                data={data}
                transfer={Reload}
                dialog={transferDialog}
                closeDialog={() => setTransferDialog(false)
                }/>


            {/*Table*/}
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Tooltip title="Add Product" aria-label="add">
                                <IconButton onClick={() => setRegisterDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <AddCircleIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Product" aria-label="add">
                                <IconButton onClick={() => setDeleteDialog(true)} aria-label="deleteProduct"
                                            color={"primary"}>
                                    <DeleteIcon fontSize={"large"} aria-label="Delete Product" color={"secondary"}/>
                                </IconButton>

                            </Tooltip>

                            <Tooltip title="Update Product" aria-label="add">
                                <IconButton onClick={() => setUpdateDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <UpdateIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={'Transfer Product'} aria-label={'Transfer Product'}>
                                <IconButton onClick={() => setTransferDialog(true)} aria-label={'Transfer Product'}
                                            color={"primary"}>
                                    <CompareArrowsIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Upload Photo" aria-label="add">
                                <IconButton onClick={() => setPhotoUpload(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <PhotoCameraIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box style={{display: 'flex'}}>
                            <FormControl variant="outlined" margin='dense' fullWidth>
                                <InputLabel htmlFor="Branch">Status</InputLabel>
                                <Select
                                    native
                                    value={productStatus}
                                    label="Status"
                                    inputProps={{
                                        name: 'branch',
                                        id: 'Branch',
                                    }}
                                    onChange={(e) => changeProductStatus(e.target.value)}
                                >
                                    <option value={'Available'}>Available</option>
                                    <option value={'Sold'}>Sold</option>
                                </Select>
                            </FormControl>

                            <FormControl style={{marginLeft: 10}} variant="outlined" margin='dense' fullWidth>
                                <InputLabel htmlFor="Status">Branch</InputLabel>
                                <Select
                                    native
                                    value={branch}
                                    label="Branch"
                                    inputProps={{
                                        name: 'Status',
                                        id: 'Status',
                                    }}
                                    onChange={(e) => role === 3 ? changeBranch(e.target.value) : null}
                                >
                                    <option value='0'>All</option>
                                    {
                                        stores.map((e) => {
                                            return <option key={e.id} value={e.id}>{e.location}</option>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        rowSel
                        title={
                            <Typography variant="h6">
                                Product List
                                {loading &&
                                <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}}/>}
                            </Typography>
                        }
                        data={data}
                        columns={columns}
                        options={options(loading, page,changePage,changeSearch,changeRowsPerPage,count,size)}
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}


