import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid,
    TextField
} from "@material-ui/core"
import {useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {
    getCriticalStockUpdate
} from "../../../utils/ServerEndPoint";
import {Autocomplete} from "@material-ui/lab";
import Response from "../../../utils/Response/Response"
import RemoveError from "../../../utils/FormError/RemoveError";


const UpdateCriticalStockLevel = (
    {
        closeDialog,
        dialog,
        stores,
        getData
    }) => {


    // for form value

    const [store, setStore] = useState('')
    const [level,setLevel] = useState(1)
    const [code,setCode] = useState('')
    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // for snack bar
    const [showing, setShowing] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // form error
    const [storeIdError, setStoreIdError] = useState(false)

    // form errorMessage

    const [storeIdErrorMessage, setStoreIdErrorMessage] = useState('')

    const register = async (event) => {
        RemoveFormError()
        event.preventDefault()


        if(!store){
            alert("Please Select Store")
            return
        }

        if(code.length ===0){
            alert("Please Input A Code")
            return
        }

        if(level ===0){
            alert("Please Input A Critical Level")
            return
        }


        if (!error) {
            const data = {
                productCode:code,
                StoreId: store.id,
                critical_level:level
            }
            await baseUrlWithAuth.post(getCriticalStockUpdate, data).then(ignored => {
                setError(false)
                setShowing(true)
                getData().then(ignored=> {})
            }).catch(error => {
                const response = error.response.data
                setErrorMessage(response.message)
                setErrorTitle(response.title)
                setError(true)
            })
        }

    }

    const RemoveFormError = () => {
        RemoveError(setStoreIdError, setStoreIdErrorMessage)
    }

    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Update Critical Stock Level</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={showing}
                          successMessage='Critical Stock Level Updated'
                          closeSnackBar={() => setShowing(false)}
                />

                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={stores}
                                getOptionLabel={(option) => option.location}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => value === null ? setStore('') : setStore(value)}
                                renderInput={(params) =>
                                    <TextField
                                        error={storeIdError}
                                        helperText={storeIdErrorMessage}
                                        {...params}
                                        label="Location"
                                        variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField
                            margin="dense"
                            label="Product Code"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={code}
                            onChange={(e) => setCode(e.target.value < 0 ? 1 : e.target.value)}
                        />
                    </Grid>


                    <Grid item md={4} xs={12}>
                        <TextField
                            margin="dense"
                            label="Product Critical Level"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={level}
                            onChange={(e) => setLevel(e.target.value < 0 ? 1 : e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='primary' onClick={register}>
                    Update
                </Button>
                <Button onClick={() => closeDialog(false)} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}

export default UpdateCriticalStockLevel