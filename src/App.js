import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Pos from './components/POS/Pos'
const App = () => {
  return (
      <Router>
        <switch>
          <Route path="/">
            <Pos/>
          </Route>
        </switch>
      </Router>
  );
}

export default App;
