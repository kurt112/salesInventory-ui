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
import {Alert, AlertTitle} from "@material-ui/lab";
import {userDelete} from "../../../utils/ServerEndPoint";


const DeleteUser = (
    {
        closeDialog,
        dialog,
        deleted

    }) => {

    // user data
    const [email, setEmail] = useState('')


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)


    const close = () => {
        setShow(false)
    }


    const register = (event) => {


        event.preventDefault()

        Axios.post(userDelete, {
           email
        }).then(ignored => {
            deleted(email)
            setEmail('')

            setError(false)
            setShow(true)
        }).catch(error => {
            console.log(error)
            setError(true)
        })


    }

    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"sm"}
        fullWidth
    >
        <form onInvalid onSubmit={register}>


            <DialogTitle id="add-student">Delete User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insert user Email to delete the user
                </DialogContentText>

                {
                    error ? <Alert variant="filled" severity="error">
                        <AlertTitle><strong>Can't Delete User</strong></AlertTitle>
                        <strong>User Can't find or the User is involve to transaction</strong>
                    </Alert> : null
                }

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={show} autoHideDuration={3000} onClose={close}>
                    <Alert onClose={closeDialog} severity="success">
                        User Delete Success
                    </Alert>
                </Snackbar>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField autoFocus
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

                <Button type={"submit"} color='secondary' onClick={register}>
                    Register
                </Button>
                <Button onClick={() => closeDialog(false)} color='primary' >
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default DeleteUser