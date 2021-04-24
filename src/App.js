import {
    BrowserRouter as Router, Route,
} from "react-router-dom";
import MainUI from './components/mainUI/MainUI'
import Pos from "./components/POS/Pos";
import Login from "./components/Login/Logins";
import {Switch} from 'react-router';
const App = () => {
    return (
        <Router>
            <Switch>
                {/*<Route exact path="/pos">*/}
                {/*    <Pos/>*/}
                {/*</Route>*/}
                {/*<Route exact path="/login">*/}
                {/*<Login>*/}
                {/*</Route>*/}
                <MainUI/>
            </Switch>
        </Router>

    );
}

export default App;
