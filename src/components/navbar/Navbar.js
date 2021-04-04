import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {Badge,withStyles} from '@material-ui/core';

import {useEffect, useState} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import style from '../mainUI/MainUiStyle'
import {Link} from "react-router-dom";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}

        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            // color: 'black',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.black,
            },
        },
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.black
        }
    },
}))(MenuItem);

const Navbar = ({handleDrawerOpen}) => {

    const classes = style()




    useEffect(() => {
        // mode(false)
    }, [])

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            elevation={0}
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    Sales and Inventory System
                </Typography>

                <Link  style={{textDecoration: 'none', color: 'white'}} >
                    <Typography variant="h6" noWrap style={{marginRight: '10px'}}>
                        {`Current Login user`}
                    </Typography>
                </Link>


                <div>
                    <ArrowDropDownIcon
                        className={classes.dropDownLight}
                        color={'primary'}
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={handleClick}
                    />

                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}

                    >

                        <StyledMenuItem >
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText primary="Logout"/>
                        </StyledMenuItem>

                    </StyledMenu>
                </div>
            </Toolbar>
        </AppBar>
    )
}



export default Navbar