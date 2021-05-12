import {Grid, Divider} from "@material-ui/core";
import ItemList from "./ItemBuy/ItemList";
import InputItem from "./InputItem/InputItem";
import ProductList from "./ProductList/ProductList";
import {style} from "./PosStyle";
import {useEffect, useState, Fragment, lazy} from "react";
import {baseUrlWithAuth} from "../mainUI/BaseUrlWithAuth";
import {productList} from "../../utils/ServerEndPoint";

const CustomerExistDialog = lazy(() => import(`./checkout/CustomerExistDialog`))
const CustomerForm = lazy(() => import(`./checkout/CustomerForm`))
const FindCustomer = lazy(() => import(`./checkout/FindCustomer`))
const Receipt = lazy(() => import(`./checkout/Receipt`))
const productMap = new Map()
const Pos = ({setPosOn, user}) => {
    const classes = style()

    const [products, setProducts] = useState([])
    const [code, setCode] = useState('')
    const [itemBuy, setItemBuy] = useState([])
    const [qty, setQty] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)
    const [customer, setCustomer] = useState()

    // dialog
    const [checkOutDialog, setCheckOutDialog] = useState(false)
    const [customerFormDialog, setCustomerFormDialog] = useState(false)
    const [findCustomerDialog, setFindCustomerDialog] = useState(false)
    const [printReceipt, setPrintReceipt] = useState(false)


    // for search in product list
    const [loading,setLoading] = useState(false)
    const [search, setSearch] = useState('')


    useEffect(() => {

        getData().then(ignored => {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])


    const getData = async () => {
        setLoading(true)
        const temp = []
        await baseUrlWithAuth.get(productList, {
            params: {
                branch: user.StoreId,
                status: 'available',
                search
            }
        }).then(async (products) => {
            console.log(products.data.rows)
            products.data.rows.map(product =>
                temp.push(product)
            )
            setProducts(temp)
        }).finally(() => {
            setLoading(false)
        })

    }


    const insert = (item, qty) => {
        const product = item[0]
        return {
            productName: product.name,
            productBrand: product.brand,
            price: product.price,
            qty,
            code,
            id: product.id
        }
    }

    const remove = async () => {
        if (itemBuy.length === 0) {
            alert("The Item Is Empty")
            return
        }
        let code = prompt('Enter Product Code');

        let index = 0

        const find = itemBuy.find((e, i) => {
            index = i;
            return e.code === code
        })


        // if the item code is invalid
        if (find === undefined) {
            alert("Product Code Invalid")
            return
        }

        // deleting item in left side bar
        let checkoutItem = [...itemBuy]
        if(find.qty === 1){
            checkoutItem.splice(index, 1)
            setItemBuy(checkoutItem)
        }else{
           checkoutItem[index].qty = checkoutItem[index].qty - 1
        }

        const currentTotalPrice = totalPrice - find.price;
        setTotalPrice(currentTotalPrice)
        getData().then(ignored => {})

    }

    const cancelTransaction =  () => {
        getData().then(ignored => {})
        setItemBuy([])
        setTotalPrice(0)
        alert("Transaction Cancel Successful")
    }


    const buy = async (event) => {

        if(code.length === 0){
            alert("Please Enter A Valid Code")
            return
        }

        if(parseInt(qty) === 0){
            alert("Please Have A Quantity Greater Than Zero")
            return
        }

        if (event.which === 13) {
            await baseUrlWithAuth.get(productList, {
                params: {
                    branch: user.StoreId,
                    status: 'available',
                    search: code,
                    size: qty
                }
            }).then( (products) => {
                if(products.data.rows.length !== parseInt(qty)){
                    alert('Quantity Is Not Enough')
                }else{
                    const code = products.data.rows[0].code
                    if(productMap.get(code) !== undefined && parseInt(productMap.get(code)) + parseInt(qty) > parseInt(products.data.count)){
                        alert('Quantity Is Not Enough')
                        return
                    }
                    const product = insert(products.data.rows, qty)
                    const newData = [...itemBuy, product]
                    const newTotalPrice = totalPrice + (products.data.rows[0].price * qty)
                    setTotalPrice(newTotalPrice)
                    setItemBuy(newData)
                    setQty(1)
                    setCode('')
                    if(productMap.get(code) === undefined) productMap.set(code, 0)
                    productMap.set(code,productMap.get(code)+parseInt(qty))
                }
            })

        }

    }

    const checkOut = () => {
        if (itemBuy.length === 0) {
            alert("Please Buy First To Checkout")
            return
        }
        setCheckOutDialog(true)
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload(true);

    }

    const switchUser = () => {
        if (user.role === 1) {
            alert("can't switch")
            return;
        }
        setPosOn(false)
    }

    const print = () => {
        setPrintReceipt(true)
    }

    return (
        <Fragment>
            <CustomerExistDialog
                setCustomer={setCustomer}
                registerCustomer={setCustomerFormDialog}
                findCustomer={setFindCustomerDialog}
                dialog={checkOutDialog}
                print={print}
                cancel={() => setCheckOutDialog(false)}/>


            {
                printReceipt ? <Receipt
                    getData={getData}
                    setCheckOutDialog={setCheckOutDialog}
                    setPrice={setTotalPrice}
                    item={itemBuy}
                    setItem={setItemBuy}
                    customer={customer}
                    initialAmount={totalPrice}
                    dialog={printReceipt}
                    user={user}
                    cancel={() => setPrintReceipt(false)}
                    posOn={true}/> : null
            }
            <FindCustomer setCustomer={setCustomer} print={print} dialog={findCustomerDialog}
                          closeDialog={() => setFindCustomerDialog(false)}/>

            <CustomerForm dialog={customerFormDialog} closeDialog={() => setCustomerFormDialog(false)}/>


            <Grid container className={classes.root}>
                <Grid container item md={3} className={classes.left}>
                    <p className={classes.leftText}>Sales And Inventory</p>
                    <Divider className={classes.divider} light/>

                    <ItemList
                        totalPrice={totalPrice}
                        items={itemBuy}
                        classes={classes}/>

                    <InputItem qty={qty}
                               setQty={setQty}
                               code={code}
                               setCode={setCode}
                               buy={buy}
                               classes={classes}
                    />
                </Grid>
                <Grid container item md={9} className={classes.right}>
                    <ProductList
                        loading={loading}
                        search={search}
                        setSearch={setSearch}
                        cancelTransaction={cancelTransaction}
                        logout={logout}
                        checkOut={checkOut}
                        switchUser={switchUser}
                        user={user}
                        remove={remove}
                        data={products}/>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Pos
