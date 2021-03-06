import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, CircularProgress, Box, Tooltip, Toolbar} from "@material-ui/core";
import {CustomerTable as columns, InsertCustomer as insert} from '../../../utils/tableColumn/CustomerTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState, Fragment, lazy} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {CustomerList} from "../../../utils/ServerEndPoint";
import IconButton from "@material-ui/core/IconButton";
import UpdateIcon from "@material-ui/icons/Update";
import FindCustomer from "../../POS/checkout/FindCustomer";

const UpdateCustomer = lazy(() => import(`./UpdateCustomer`));

export const Customers = () => {
    const classes = style()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [findCustomerDialog, setUpdateCustomerDialog] = useState(false)
    const [customerFormDialog, setCustomerFormDialog] = useState(true)

    // const [updateC]
    const [customer, setCustomer] = useState()


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


        getData().then(ignored => {
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page,search,size])

    const getData = async () => {
        setLoading(true)
        const temp = []
        await baseUrlWithAuth.get(CustomerList, {
            params: {
                page,
                size,
                search
            }
        }).then((customers) => {
            setCount(customers.data.count)
            customers.data.rows.map(customer =>
                temp.push(insert(customer.id, customer.name, customer.email, customer.address, customer.city, customer.state, customer.postalCode, customer.mobile_no, customer.tel_no))
            )
        })
        setData(temp)
        setLoading(false)
    }

    useEffect(() => {
        if(customer !== undefined){
            setCustomerFormDialog(true)
        }
    }, [customer])


    return (
        <Fragment>

            {
                customer !== undefined ?
                    <UpdateCustomer getData={getData} setCustomer={setCustomer} customer={customer}
                                    closeDialog={() => setCustomerFormDialog(false)}
                                    dialog={customerFormDialog}/>
                    :   <FindCustomer setCustomer={setCustomer} closeDialog={setUpdateCustomerDialog}
                                      dialog={findCustomerDialog}/>
            }

            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Tooltip title="Update Customer" aria-label="add">
                                <IconButton onClick={() => setUpdateCustomerDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <UpdateIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Customer List
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


