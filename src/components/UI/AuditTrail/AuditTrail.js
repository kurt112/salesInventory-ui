import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, CircularProgress} from "@material-ui/core";
import {AuditTrailTable as columns, InsertAudit as insert} from '../../../utils/tableColumn/AuditTrail'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {CustomerList} from "../../../utils/ServerEndPoint";


export const AuditTrail = () => {
    const classes = style()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const data =async () => {
            setLoading(true)
            const temp = []
            await Axios.get(CustomerList).then((customers) => {
                customers.data.map(customer =>
                    temp.push(insert(customer.id, customer.name, customer.email, customer.address, customer.city, customer.state, customer.postalCode, customer.mobile_no, customer.tel_no))
                )
            })
            setData(...data, temp)
            setLoading(false)
        }

    }, [])


    return (
        <Grid component="main" className={classes.root}>
            <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>

            </Grid>
            <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                <MUIDataTable
                    title={
                        <Typography variant="h6">
                            Audit Trail
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
    )
}

export default AuditTrail