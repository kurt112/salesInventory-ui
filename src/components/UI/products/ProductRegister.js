import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    Grid, Snackbar,
    TextField
} from "@material-ui/core"
import {useEffect, useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {productImages, productInsert, storeList, supplierInsert, supplierList} from "../../../utils/ServerEndPoint";
import {Alert, AlertTitle, Autocomplete} from "@material-ui/lab";


const ProductRegister = (
    {
        closeDialog,
        dialog,
        insertData
    }) => {

    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState(1)
    const [supplier, setSupplier] = useState('')
    const [store, setStore] = useState('')
    const [photo, setPhoto] = useState()
    const [code, setCode] = useState()


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)


    // for autocomplete
    const [stores, setStores] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [images, setImages] = useState([])
    const close = () => {
        setShow(false)
    }


    const register = (event) => {
        event.preventDefault()
        if (brand.trim() === '') {
            setError(true)
            return
        }

        const data = {
            brand,
            code,
            name,
            type,
            price: parseFloat(price),
            status:'Available',
            photo,
            SupplierId: parseInt(supplier.id),
            StoreId: parseInt(store.id),
            qty: parseInt(qty)
        }

        const insert ={
            amount: price,
            brand,
            productName:name,
            status:'Available',
            store: store.name,
            supplier:supplier.name,
            type:type
        }

        let i =parseInt(qty)

        Axios.post(productInsert, data).then(e => {
            setBrand('')
            setName('')
            setType('')
            setPrice('')
            setCode('')
            setPhoto('')
            setStore('')
            setSupplier('')
            setError(false)
            setShow(true)
        }).catch(error => {
            setError(true)
        })

        while ( i >1){
            insertData(insert)

            i--
        }

    }
    useEffect(async () => {
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
    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
    >
        <form onInvalid onSubmit={register}>


            <DialogTitle id="add-student">Register Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insert if you have any note
                </DialogContentText>

                {
                    error ? <Alert variant="filled" severity="error">
                        <AlertTitle><strong>Error</strong></AlertTitle>
                        <strong>Hotdog</strong>
                    </Alert> : null
                }

                <br/>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={show} autoHideDuration={3000} onClose={close}>
                    <Alert onClose={closeDialog} severity="success">
                        Product Register Success
                    </Alert>
                </Snackbar>

                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={images}
                                getOptionLabel={(option) => option}
                                getOptionSelected={(option, value) => option === value}
                                onChange={(event, value) => setPhoto(value)}
                                renderInput={(params) => <TextField {...params} label="Product Images"
                                                                    variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Product Brand"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={brand}
                                   onChange={(e) => setBrand(e.target.value)}
                        />

                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Product Name"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Product Type"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={type}
                                   onChange={(e) => setType(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Product Price"
                                   type="number"
                                   fullWidth
                                   variant="outlined"
                                   value={price}
                                   onChange={(e) => setPrice(e.target.value <0? 1: e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={stores}
                                getOptionLabel={(option) => option.name + ' ' + option.state}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => setStore(value)}
                                renderInput={(params) => <TextField {...params} label="Store" variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={suppliers}
                                getOptionLabel={(option) => option.name + ' ' + option.state}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => setSupplier(value)}
                                renderInput={(params) => <TextField {...params} label="Supplier" variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Product Code"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={code}
                                   onChange={e => setCode(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="QTY"
                                   type="number"
                                   fullWidth
                                   variant="outlined"
                                   value={qty}
                                   onChange={e => setQty(e.target.value < 0? 1: e.target.value)}
                        />
                    </Grid>

                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='primary' onClick={register}>
                    Register
                </Button>
                <Button onClick={() => closeDialog(false)} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default ProductRegister