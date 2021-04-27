import {Grid, Divider} from "@material-ui/core";
import ItemList from "./ItemBuy/ItemList";
import InputItem from "./InputItem/InputItem";
import ProductList from "./ProductList/ProductList";
import {style} from "./PosStyle";
import {useEffect, useState} from "react";
import {baseUrlWithAuth} from "../mainUI/BaseUrlWithAuth";
import {productList} from "../../utils/ServerEndPoint";

const Pos = ({setPosOn,user}) => {
    const classes = style()

    const [products, setProducts] = useState([])
    const [code, setCode] = useState('')
    const [itemBuy, setItemBuy] = useState([])
    const [qty, setQty] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const temp = []
        const getData = async () => {

            await baseUrlWithAuth.get(productList, {
                params: {
                    branch: 1
                }
            }).then(async (products) => {
                products.data.map(product =>
                    temp.push(product)
                )
                setProducts(temp)
            })

        }

        getData().then(ignored => {
        })

    }, [])

    const insert = (item, qty) => {
        const product = item[0]
        return {
            productName: product.name,
            productBrand: product.brand,
            price: product.price,
            qty,
            code
        }
    }


    const buy = async (event) => {

        if (event.which === 13) {
            let tempQ = qty

            const tempData = [...products]
            let last = null
            while (tempQ !== 0) {
                let current = null;
                const product = await tempData.find((e, index) => {
                    current = index
                    return e.code.toString() === code
                })

                if (current !== null && product !== undefined) {
                    last = tempData.splice(current, 1)

                } else {
                    alert("We don't have enough Supply")
                    break;
                }

                tempQ--
            }


            if (tempQ === 0) {
                const product = insert(last, qty)
                const newData = [...itemBuy, product]
                const newTotalPrice = totalPrice + (last[0].price * qty)

                setTotalPrice(newTotalPrice)
                setItemBuy(newData)
                setProducts(tempData)
                setQty(1)
                setCode('')
            }
        }

    }

    const checkOut = () => {

    }

    const logout = () => {
        localStorage.clear()
        window.location.reload(true);

    }

    const switchUser = () => {
        if(user.role === 1){
            alert("can't switch")
            return;
        }
        setPosOn(false)
    }

    return (
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
                <ProductList logout={logout}
                             checkOut={checkOut}
                             switchUser={switchUser}
                             user={user}
                             data={products}/>
            </Grid>
        </Grid>
    )
}

export default Pos
