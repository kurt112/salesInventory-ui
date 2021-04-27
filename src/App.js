import {
    BrowserRouter as Router, Route,
    Redirect
} from "react-router-dom";
import MainUI from './components/mainUI/MainUI'
import Pos from "./components/POS/Pos";
import Login from "./components/Login/Logins";
import {Switch} from 'react-router';
import {useEffect, useState} from 'react'
import {baseUrlNoAuth} from "./utils/axios/BaseUrl";
import {tokenData} from "./utils/ServerEndPoint";

const App = () => {

    const [token, setToken] = useState(null)
    const [user, setUser] = useState()
    const [posOn, setPosOn] = useState(false)

    // localStorage.clear()

    useEffect(() => {
        const tokenLocal = localStorage.getItem('jars-token')
        if (tokenLocal) {
            setToken(tokenLocal)
            const getUser = async () =>
                await baseUrlNoAuth.post(tokenData, {token: tokenLocal}).then(e => {
                    setUser(e.data)
                })

            getUser().then(ignored => {
            })

        }
    }, [token])

    useEffect(() => {

        if (user && user.role === 1) {
            setPosOn(true)
        }

    }, [user])

    return (
        <Router>
            {
                token === null ? <Login setUser={setUser}
                                        setToken={setToken}/> :

                    <Switch>

                        {
                            posOn === true ?
                                <Route exact path="/">
                                    <Pos/>
                                </Route> :
                                <MainUI setUser={setUser} user={user}/>
                        }

                    </Switch>

            }

            <Redirect to={"/"}/>
        </Router>

    )

}


export default App;