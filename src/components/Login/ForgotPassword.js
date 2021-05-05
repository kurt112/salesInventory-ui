import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core"
import {useState} from "react";
import Response from "../../utils/Response/Response";


const FindProduct = (
    {
        closeDialog,
        dialog,

    }) => {


    const [email, setEmail] = useState('')


    // for snack bar
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [show,setShow] = useState(false)


    const register = async (event) => {
        event.preventDefault()

        // await baseUrlWithAuth.post(productFind, {code,branch}).then(e => {
        //     setCode('')
        //     setError(false)
        //     setShow(true)
        //     closeDialog(false)
        //     updateProduct(e.data[0])
        // }).catch(error => {
        //     const response = error.response.data
        //     setErrorMessage(response.message)
        //     setErrorTitle(response.title)
        //     setError(true)
        // })

    }


    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Forgot Password</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage={"Product Find Success"}
                          closeSnackBar={() => setShow(false)}
                />


                <br/>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='primary' onClick={register}>
                    Send
                </Button>
                <Button onClick={closeDialog} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default FindProduct