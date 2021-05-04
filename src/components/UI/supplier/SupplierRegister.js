import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, TextField
} from "@material-ui/core"
import {useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {supplierInsert} from "../../../utils/ServerEndPoint";
import Response from '../../../utils/Response/Response'


const SupplierRegister = (
    {
        closeDialog,
        dialog,
        Reload

    }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [telNo, setTelNo] = useState('')


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const close = () => {
        setShow(false)
    }


    const register = (event) => {


        event.preventDefault()

        if (name.trim().length === 0) {
            alert("Please enter store name")
            return
        }

        if(email.trim().length === 0){
            alert("Please enter a email")
            return
        }

        const data = {
            name: name,
            email: email,
            address: address,
            city: city,
            postalCode: postalCode.length ===0? 1: postalCode,
            mobile_no: mobileNo,
            tel_no: telNo
        }


        baseUrlWithAuth.post(supplierInsert, data).then(ignored => {
            Reload()
            setName('')
            setEmail('')
            setAddress('')
            setCity('')
            setPostalCode('')
            setTelNo('')
            setMobileNo('')
            setError(false)
            setShow(true)
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
    >
        <form noValidate={false} onSubmit={register}>


            <DialogTitle id="add-student">Register Supplier</DialogTitle>
            <DialogContent>


                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='Supplier Register Success'
                          closeSnackBar={close}
                />

                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Company Name"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                        />

                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                                   margin="dense"
                                   label="Company Email"
                                   type="email"
                                   fullWidth
                                   variant="outlined"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={8} xs={12}>
                        <TextField
                                   margin="dense"
                                   label="Company Address"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={address}
                                   onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={2} xs={12}>
                        <TextField
                                   margin="dense"
                                   label="City"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={city}
                                   onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>


                    <Grid item md={2} xs={12}>
                        <TextField
                                   margin="dense"
                                   label="Postal Code"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={postalCode}
                                   onChange={e => setPostalCode(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                                   margin="dense"
                                   label="Mobile Number"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={mobileNo}
                                   onChange={e => setMobileNo(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                                   margin="dense"
                                   label="Telephone Number"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={telNo}
                                   onChange={e => setTelNo(e.target.value)}
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


export default SupplierRegister