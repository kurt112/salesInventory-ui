import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core"
import {useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {
    productFind,
} from "../../../utils/ServerEndPoint";
import {Alert, AlertTitle} from "@material-ui/lab";


const FindProduct = (
    {
        closeDialog,
        dialog,
        updateProduct
    }) => {


    const [code, setCode] = useState('')


    // for snack bar
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')



    const register = async (event) => {
        event.preventDefault()

        await Axios.post(productFind, {code}).then(e => {
            setCode('')
            setError(false)
            updateProduct(e.data[0])
        }).catch(error => {
            const response = error.response.data
            setErrorMessage(response.message)
            setErrorTitle(response.title)
            setError(true)
        })

    }

    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Find Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your product code
                </DialogContentText>

                {
                    error ? <Alert variant="filled" severity="error">
                        <AlertTitle><strong>{errorTitle}</strong></AlertTitle>
                        <strong>{errorMessage}</strong>
                    </Alert>: null
                }

                <br/>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Product Code"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='primary' onClick={register}>
                    Next
                </Button>
                <Button onClick={() => closeDialog(false)} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default FindProduct