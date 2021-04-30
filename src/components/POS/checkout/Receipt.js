import './Receipt.css'

import {useEffect, useRef, Fragment, useState} from "react";
import {Dialog, TableCell} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {transactionInsert} from "../../../utils/ServerEndPoint";
import ShortUniqueId from 'short-unique-id';


const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const Receipt = ({
                     dialog,
                     cancel,
                     user,
                     customer,
                     initialAmount,
                     item
                 }) => {

    console.log(user)
    const [today, setToday] = useState('')
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [step, setStep] = useState(1)
    const [code, setCode] = useState('')
    const [valid, setValid] = useState(true)

    useEffect(() => {
        const codeGenerate = new ShortUniqueId()
        const c_today = new Date();
        const dd = String(c_today.getDate()).padStart(2, '0');
        const mm = String(c_today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = c_today.getFullYear();
        setToday(months[mm - 1] + '/' + dd + '/' + yyyy)
        const tempCode = `${codeGenerate()}-${mm}-${dd}`
        setCode(tempCode)
    }, [])

    useEffect(() => {
        const amount = initialAmount - discount
        setTotalPrice(amount)
    }, [discount])

    const back = () => {
        if (step >= 2) {
            setStep(step - 1)
        }
    }

    const applyDiscount = () => {
        const tempDiscount = prompt('Enter Discount Value');
        if(tempDiscount > initialAmount){
            alert("Make Sure Discount Is Lower Or Equal Than Initial Amount")
            return
        }

        setDiscount(tempDiscount)

    }

    const saveTransaction = async () => {
        setStep(step + 1)
        const data = {
            code,
            amount: initialAmount,
            discount: discount,
            CustomerId: customer.id,
            StoreId: user.StoreId,
            UserId: user.id
        }
        if (valid) {
            await baseUrlWithAuth.post(transactionInsert, data).then(ignored => {
                alert("Transaction Save")
                setValid(false)

            }).catch(error => {
                console.log(error)
            })
            return
        }

        alert("Transaction Already Save")
    }


    const print = () => {
        const mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('<style>' +
            '@media print {\n' +
            '  body {-webkit-print-color-adjust: exact;}\n' +
            '}\n' +
            '.invoice {\n' +
            '    width: 100%\n' +
            '}\n' +
            '\n' +
            '.invoice-company {\n' +
            '    font-size: 20px;\n' +
            '    display: flex;\n' +
            '    justify-content: space-between;\n' +
            '}\n' +
            '\n' +
            '.invoice-company p{\n' +
            '    margin: 0;\n' +
            '}\n' +
            '\n' +
            '.invoice-header {\n' +
            '    background: #f0f3f4;\n' +
            '    padding: 10px;\n' +
            '    display: flex;\n' +
            '    justify-content: space-between;\n' +
            '}\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '.invoice-date .date,\n' +
            '.invoice-from strong,\n' +
            '.invoice-to strong {\n' +
            '    font-size: 16px;\n' +
            '    font-weight: 600\n' +
            '}\n' +
            '\n' +
            '.invoice-date {\n' +
            '    text-align: right;\n' +
            '    padding-left: 20px\n' +
            '}\n' +
            '\n' +
            '.invoice-price {\n' +
            '    background: #f0f3f4;\n' +
            '    display: table;\n' +
            '    width: 100%\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-left,\n' +
            '.invoice-price .invoice-price-right {\n' +
            '    display: table-cell;\n' +
            '    padding: 20px;\n' +
            '    font-size: 20px;\n' +
            '    font-weight: 600;\n' +
            '    width: 75%;\n' +
            '    position: relative;\n' +
            '    vertical-align: middle\n' +
            '}\n' +
            'table{' +
            'width:100%' +
            '}' +
            'table th{' +
            'text-align: left' +
            '}' +
            '\n' +
            '.invoice-price .invoice-price-left .sub-price {\n' +
            '    display: table-cell;\n' +
            '    vertical-align: middle;\n' +
            '    padding: 0 20px\n' +
            '}\n' +
            '\n' +
            '.invoice-price small {\n' +
            '    font-size: 12px;\n' +
            '    font-weight: 400;\n' +
            '    display: block\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-row {\n' +
            '    display: table;\n' +
            '    float: left\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-right {\n' +
            '    width: 25%;\n' +
            '    background: #2d353c;\n' +
            '    color: #fff;\n' +
            '    font-size: 28px;\n' +
            '    text-align: right;\n' +
            '    vertical-align: bottom;\n' +
            '    font-weight: 300\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-right small {\n' +
            '    display: block;\n' +
            '    opacity: .6;\n' +
            '    position: absolute;\n' +
            '    top: 10px;\n' +
            '    left: 10px;\n' +
            '    font-size: 12px\n' +
            '}\n' +
            '\n' +
            '.invoice-footer {\n' +
            '    border-top: 1px solid #ddd;\n' +
            '    padding-top: 10px;\n' +
            '    font-size: 10px\n' +
            '}\n' +
            '\n' +
            '.invoice-note {\n' +
            '    color: #999;\n' +
            '    margin-top: 80px;\n' +
            '    font-size: 85%\n' +
            '}\n' +
            '\n' +
            '.invoice>div:not(.invoice-footer) {\n' +
            '    margin-bottom: 20px\n' +
            '}\n' +
            '\n' +
            '.btn.btn-white, .btn.btn-white.disabled, .btn.btn-white.disabled:focus, .btn.btn-white.disabled:hover, .btn.btn-white[disabled], .btn.btn-white[disabled]:focus, .btn.btn-white[disabled]:hover {\n' +
            '    color: #2d353c;\n' +
            '    background: #fff;\n' +
            '    border-color: #d9dfe3;\n' +
            '}\n' +
            '\n' +
            '.printButton{\n' +
            '    display: flex;\n' +
            '    justify-content: center;\n' +
            '}\n</style>')
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById('receipts').innerHTML);
        mywindow.document.write('</body></html>');

        // mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        // mywindow.close();

        return true
    }

    return (
        <Fragment>
            <Dialog
                open={dialog}
                onClose={cancel}
                aria-labelledby="add-student"
                maxWidth={"md"}
                fullWidth
            >
                <Box id="receipts" component={Paper}>
                    <div className="col-md-12">
                        <div className="invoice">
                            {/*begin invoice-company*/}
                            <div className="invoice-company text-inverse f-w-600">
                                <p><b>Jars Cecullar, Inc</b></p>
                                <p><b>{user.firstName} {user.lastName}</b></p>
                            </div>
                            {/*end invoice-company */}
                            {/*begin invoice-header */}
                            <div className="invoice-header">
                                <div className="invoice-from">
                                    <small>From:</small>
                                    <address className="">
                                        <strong className="text-inverse">JAR'S CELLULAR PHONES & ACCESSORIES
                                            HAUS<sup>-2</sup></strong><br/>
                                        2nd Flr. San Pablo Shopping Mall<br/>
                                        San Pablo City<br/>
                                    </address>
                                </div>
                                <div className="invoice-to">
                                    <small>To:</small>
                                    <address className="m-t-5 m-b-5">
                                        <strong className="text-inverse">{customer.name}</strong><br/>
                                        {customer.address}<br/>
                                        {customer.city}, {customer.postalCode}<br/>
                                    </address>
                                </div>
                                <div className="invoice-date">
                                    <small>Transaction:</small>
                                    <div className="date text-inverse m-t-5">{today}</div>
                                    <div className="invoice-detail">
                                        <b>{code}</b>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                            {/*end invoice-header*/}
                            {/*begin invoice-content*/}
                            <div className="invoice-content">
                                {/*begin table-responsive*/}
                                <div className="table-responsive">
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>Product Name</b></TableCell>
                                                <TableCell><b>Product Code</b></TableCell>
                                                <TableCell><b>Price</b></TableCell>
                                                <TableCell><b>Quantity</b></TableCell>
                                                <TableCell align="right"><b>Total</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {
                                                item.map((item, id) => <TableRow key={id}>
                                                        <TableCell align={"left"}>
                                                            <small>{item.productName}</small><br/>
                                                        </TableCell>
                                                        <TableCell align={"left"}>{item.code}</TableCell>
                                                        <TableCell align={"left"}>₱ {item.price}</TableCell>
                                                        <TableCell align={"left"}>{item.qty}</TableCell>
                                                        <TableCell align="right">₱ {item.price * item.qty}</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </div>
                                {/*end table-responsive*/}
                                {/*begin invoice-price*/}
                                <div className="invoice-price">
                                    <div className="invoice-price-left">
                                        <div className="invoice-price-row">
                                            <div className="sub-price">
                                                <small>INITIAL AMOUNT</small>
                                                <span className="text-inverse">₱ {initialAmount}</span>
                                            </div>
                                            <div className="sub-price">
                                                <i className="fa fa-plus text-muted"/>
                                            </div>
                                            <div className="sub-price">
                                                <small>DISCOUNT</small>
                                                <span className="text-inverse">₱ {discount}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="invoice-price-right">
                                        <small>TOTAL</small> <span className="f-w-600">₱ {totalPrice}</span>
                                    </div>
                                </div>
                                {/*end invoice-price*/}
                            </div>


                        </div>
                    </div>
                </Box>
                <span className="printButton">

                    {
                        step === 1 ?
                            <Fragment>
                                <Button style={{marginBottom: 20, marginTop: 20}} onClick={applyDiscount}
                                        variant={"contained"}
                                        color={"primary"}>
                                    Apply Discount
                                </Button>
                                <Button style={{marginBottom: 20, marginTop: 20, marginLeft: 10}} onClick={() => setStep(step+1)}
                                        variant={"contained"}
                                        color={"primary"}>
                                    Next
                                </Button>
                            </Fragment> : null
                    }
                    {
                        step === 2 ? <Button style={{marginBottom: 20, marginTop: 20}} onClick={saveTransaction}
                                             variant={"contained"}
                                             color={"primary"}>
                            Save Transaction
                        </Button> : null
                    }

                    {
                        step === 3 ?
                            <Button style={{marginBottom: 20, marginTop: 20, marginLeft: 10}} onClick={print}
                                    variant={"contained"}
                                    color={"primary"}>
                                Print
                            </Button> : null
                    }

                    {
                        step === 4 ?
                            <Button style={{marginBottom: 20, marginTop: 20, marginLeft: 10}} onClick={back}
                                    variant={"contained"}
                                    color={"primary"}>
                                Back
                            </Button> : null
                    }
            </span>
            </Dialog>
        </Fragment>
    )
}

export default Receipt