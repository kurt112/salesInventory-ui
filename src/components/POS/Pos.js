import {Grid, Divider} from "@material-ui/core";
import ItemList from "./ItemBuy/ItemList";
import InputItem from "./InputItem/InputItem";
import ProductList from "./ProductList/ProductList";
import {style} from "./PosStyle";
import {useEffect, useRef, useState} from "react";
import {baseUrl} from "../../utils/axios/BaseUrl";
import {productList} from "../../utils/ServerEndPoint";

const Pos = () => {

    const classes = style()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')
    const [itemBuy, setItemBuy] = useState([])
    const [qty, setQty] = useState(1)
    let ref = useRef()
    useEffect(() => {
        setLoading(true)
        const temp = []
        const getData = async () => {

            await baseUrl.get(productList, {
                params: {
                    branch: 1
                }
            }).then(async (products) => {
                products.data.map(product =>
                    temp.push(product)
                )
                setProducts(...products, temp)
            })

        }

        getData().then(ignored=> {})

        setLoading(false)
    }, [])

    const insert = (item, qty) => {
        const product = item[0]
        return {
            productName: product.name,
            productBrand: product.brand,
            price: product.price,
            qty
        }
    }

    console.log("The res")
    console.log(ref)

    const buy = (event) => {

        if (event.which === 13) {
            let tempQ = qty

            const tempData = [...products]
            let last = null

            while (tempQ !== 0) {
                let current = null;

                const product = tempData.find((e, index) => {
                    current = index
                    return e.code.toString() === code
                })

                if (current === null && product !== undefined) {
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
                setItemBuy(newData)
                setProducts(tempData)
                setQty(1)
                setCode('')
            }
        }

    }

    return (
        <Grid container className={classes.root}>
            <Grid container item md={3} className={classes.left}>
                <p className={classes.leftText}>Sales And Inventory</p>
                <Divider className={classes.divider} light/>

                <ItemList items={itemBuy} classes={classes}/>

                <InputItem ref={ref} qty={qty} setQty={setQty} code={code} setCode={setCode} buy={buy}
                           classes={classes}/>
            </Grid>
            <Grid container item md={9} className={classes.right}>

                <ProductList loading={loading} data={products}/>
            </Grid>
        </Grid>
    )
}

export default Pos
