import {Suspense, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import style from './MainUiStyle'
import Sidebar from './sidebar/Sidebar';
import {Switch} from 'react-router';
import Skeleton from '../../utils/skeleton/TableUISkeleton'
import Navbar from "../navbar/Navbar";
import {Route} from "react-router-dom";

// ui for each entity
import {Products} from "../UI/products";
import {StoreBranch} from "../UI/store_branch";
import {Supplier} from "../UI/supplier";
import {Transaction} from "../UI/transaction";
import {Users} from '../UI/users'
import {Sales} from "../UI/sales";
import {Customers} from "../UI/customer/CustomerTable";

export default function MainUI({user}) {

    const classes = style();


    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {

        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Navbar open={open} handleDrawerOpen={handleDrawerOpen}/>
            <Sidebar
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
            />


            <main className={classes.content}>
                <div className={classes.toolbar}/>

                {
                    <Suspense fallback={<Skeleton/>}>
                        <Switch>

                            <Route exact path={"/users"}>
                                <Users/>
                            </Route>
                            <Route path={"/products"}>
                                <Products/>
                            </Route>

                            <Route exact path={"/stores"}>
                                <StoreBranch/>
                            </Route>
                            <Route path={"/sales"}>
                                <Sales/>
                            </Route>

                            <Route exact path={"/transaction"}>
                                <Transaction/>
                            </Route>
                            <Route path={"/supplier"}>
                                <Supplier/>
                            </Route>
                            <Route path={"/customer"}>
                                <Customers/>
                            </Route>

                        </Switch>
                    </Suspense>
                }

            </main>
        </div>
    );
}