import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, Snackbar,
    TextField
} from "@material-ui/core"
import {useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {productPhoto} from "../../../utils/ServerEndPoint";
import {Alert, AlertTitle} from "@material-ui/lab";


const SupplierRegister = (
    {
        closeDialog,
        dialog

    }) => {

    const [file, setFile] = useState(0)


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)

    const close = () => {
        setShow(false)
    }

    const change = (event) => {
        setFile(event.target.files[0])
    }


    const register = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('picture', file)
        // console.log(file)
        Axios.post(productPhoto, formData).then(e => {
            console.log(e)
        }).catch(error => {
            console.log(error)
            // setError(true)
        })
    }

    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"sm"}
        fullWidth={true}
    >
        <form onInvalid onSubmit={register} encType="multipart/form-data">


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
                    <Grid item md={12} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   type="file"
                                   fullWidth
                                   variant="outlined"
                                   name='product_photo'
                                   onChange={(e) => change(e)}
                        />

                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='primary' onClick={register}>
                    Upload
                </Button>
                <Button onClick={() => closeDialog(false)} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default SupplierRegister