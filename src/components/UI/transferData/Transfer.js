import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Button} from "@material-ui/core";
import {ProductTransfer as columns, InsertProductTransfer as insert} from '../../../utils/tableColumn/ProductTransfer'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, Fragment,useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {ReceiveList} from "../../../utils/ServerEndPoint";
import 'react-dates/lib/css/_datepicker.css';
import ReceiveItem from "./ReceiveItem";

const Transfered = () => {
    const classes = style()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [dialog,setDialog] = useState(false)


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


        getData().then(ignored => {})
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page,size,search])


    const getData = async () => {
        setLoading(true)
        const temp = []
        await baseUrlWithAuth.get(ReceiveList, {
            params: {
                page,
                size,
                search
            }
        }).then((receives) => {
            setCount(receives.data.count)
            receives.data.rows.map(receive =>
                temp.push(insert(receive.code, receive.from.location,receive.to.location,receive.arrangeBy.email,receive.createdAt)))
        })
        setData(temp)
        setLoading(false)

    }

    return (
        <Fragment>
            <ReceiveItem getData={getData} dialog={dialog} closeDialog={() => setDialog(false)} />
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Button variant={"contained"} onClick={() => {setDialog(true)}} disableElevation color={'primary'}>
                                Receive Item
                            </Button>
                        </Box>

                    </Toolbar>


                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Transfered List
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

export default Transfered

