import style, {TableOptions as options} from '../_style/TableStyle'
import Button from "@material-ui/core/Button";
import {Paper, Grid, Box, Toolbar, CircularProgress} from "@material-ui/core";
import {UserTable as columns, InsertUser as insert} from '../../../utils/tableColumn/UserTable'
import MUIDataTable from 'mui-datatables'
import {Axios} from '../../../utils/axios/Axios'
import {useEffect, useState,Fragment} from "react";
import Typography from "@material-ui/core/Typography";
import UserRegister from "./UserRegister";
import {userList} from "../../../utils/ServerEndPoint";
import DeleteUser from "./DeleteUser";

export const Users = () => {
    const classes = style()

    const [dialog, setDialog] = useState(false);
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)


    const [deleteUser, setDeleteUser] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()  => {

        setLoading(true)

        const wew = async () => {
            return await Axios.get(userList)
        }

        // create data temp so our state will not mutate
        const item = []

        await wew().then(e => {
            e.data.map(user =>
                item.push(insert(user.id,user.email,user.firstName,user.lastName,user.role, user.Store.name, user.status))
            )
        }).catch(error => {
            console.log(error)
        })

        setData(...data, item)
        setLoading(false)

    }, [])

    const insertData = (user) => {
        const newData = [user,...data]
        setData(newData)
    }

    const deleted = (email) => {
        const temp = data.filter(e=> e.email !== email)
        setData(temp)
    }

    return (
        <Fragment>
            <DeleteUser deleted={deleted} dialog={deleteUser} closeDialog={() => setDeleteUser(false)}/>
            <UserRegister dialog={dialog} closeDialog={() => setDialog(false)}  insertData={insertData}/>
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Button onClick={() => setDialog(true)} variant="outlined" color="primary">
                                Add User
                            </Button>
                            <Button onClick={() => setDeleteUser(true)} style={{margin:'0px 20px'}} variant="outlined" color="secondary">
                                Delete User
                            </Button>
                            <Button onClick={() => setDialog(true)} variant="outlined" color="primary">
                                Update User
                            </Button>
                        </Box>

                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                User List
                                {loading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
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


