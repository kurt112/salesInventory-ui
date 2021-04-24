import {Grid, Paper} from "@material-ui/core";
import DashBoardStyle from "./DashBoardStyle";
import {Fragment} from "react";

// icons
import StoreIcon from '@material-ui/icons/Store';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import FaceIcon from '@material-ui/icons/Face';
const Card = () => {
    const style = DashBoardStyle()

    const colors = ['#273c75','#e84118','#00a8ff','#c56cf0', '#3d3d3d']
    const title = ['Branches', 'Manager', 'Cashier','Products', 'Supplier']
    const number = [10,33,44,55,66,5]
    const icons = [
        <StoreIcon className={style.icons}/>,
        <SupervisorAccountIcon className={style.icons}/>,
        <AccountCircleIcon className={style.icons}/>,
        <PhoneAndroidIcon className={style.icons}/>,
        <FaceIcon className={style.icons}/>

    ]
    return (
        <Fragment>
            {
                colors.map((e,i) =>
                    <Grid item key={i} component={Paper} md={2} xs={12} style={{backgroundColor: e}} className={style.card}>
                        <h2 style={{padding: 0, margin:5}}>{title[i]}</h2>
                        {icons[i]}
                        <p style={{fontSize:35, margin:0}}><b>{number[i]}</b></p>
                    </Grid>
                )
            }

        </Fragment>
    )
}

export default Card