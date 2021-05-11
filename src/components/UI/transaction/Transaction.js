import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip, InputLabel, Select, FormControl} from "@material-ui/core";
import {TransactionTable as columns, InsertTransaction as insert} from '../../../utils/tableColumn/TransactionTable'
import MUIDataTable from 'mui-datatables'
import {Fragment, useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {storeList, transactionList} from "../../../utils/ServerEndPoint";
import Typography from "@material-ui/core/Typography";
import ReceiptIcon from '@material-ui/icons/Receipt';
import IconButton from "@material-ui/core/IconButton";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Receipt from "../../POS/checkout/Receipt";
import FindTransaction from "./FindTransaction";
import ReturnItemDialog from "./ReturnItemDialog";

export const Transaction = ({user}) => {

    const classes = style()
    const [stores, setStores] = useState([])
    const [dialog, setDialog] = useState(false)
    const [receiptDialog, setReceiptDialog] = useState(false)
    const [returnItemDialog,setReturnItemDialog] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [transaction, setTransaction] = useState()
    const [assignedUser, setAssignedUser] = useState()

    const [branch, setBranch] = useState(user.StoreId)
    const role = user.role
    const changeBranch =  (value) => {
        setData([])
        setBranch(value)
    }


    useEffect(() => {


        const temp = []
        const get = async () => {
            setLoading(true)

            await baseUrlWithAuth.get(storeList).then(e => {
                setStores(e.data)
            })


            await baseUrlWithAuth.get(transactionList, {
                params: {
                    branch,
                }
            }).then((transactions) => {
                transactions.data.map(transaction =>
                    temp.push(insert(transaction.code, `${transaction.User.firstName} ${transaction.User.lastName}`, transaction.amount,
                        transaction.discount, `${transaction.Customer.name}`, transaction.Store.location, transaction.createdAt))
                )
            }).finally(() => {
                setLoading(false)
            })
            setData(...data, temp)
        }
        get().then(ignored => {
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [branch])

    const updateTransaction = (transaction) => {
        setItems(transaction.sales)
        setTransaction(transaction)
        setAssignedUser(transaction.transaction.User)
        setReceiptDialog(true)
    }



    return (
        <Fragment>
            <FindTransaction dialog={dialog} closeDialog={setDialog}
                             updateTransaction={updateTransaction}/>
            <ReturnItemDialog dialog={returnItemDialog}  closeDialog={setReturnItemDialog}/>
            {
                receiptDialog === true ?
                    <Receipt

                        customer={transaction.transaction.Customer}
                        user={assignedUser}
                        transaction={transaction.transaction}
                        item={items}
                        posOn={false}
                        dialog={receiptDialog}
                        cancel={() => setReceiptDialog(false)}/> : null
            }
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Tooltip title="View Transaction" aria-label="add">
                                <IconButton onClick={() => setDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <ReceiptIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Return Item" aria-label="add">
                                <IconButton onClick={() => setReturnItemDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <CompareArrowsIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                        </Box>

                        <FormControl style={{marginLeft: 10}} variant="outlined" margin='dense' >
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

                    </Toolbar>


                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Transaction List
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


