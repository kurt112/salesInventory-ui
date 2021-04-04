import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Pos from './components/POS/Pos'
import Login from "./components/Login/Logins";
import MainUI from './components/mainUI/mainUI'
const App = () => {
  return (
      <Router>
        <switch>
            <MainUI/>
          {/*<Route exact path="/">*/}
          {/*  /!*<Pos/>*!/*/}

          {/*</Route>*/}
          {/*  <Route exact path="/login">*/}
          {/*      <Login/>*/}
          {/*  </Route>*/}
        </switch>
      </Router>
  );
}

export default App;
