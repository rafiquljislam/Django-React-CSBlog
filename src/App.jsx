import Axios from 'axios'
import React, { useEffect } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Friend from './comp/Friend'
import Home from './comp/Home'
import Login from './comp/Login'
import Navbar from './comp/Navbar'
import Newpost from './comp/Newpost'
import PostDetails from './comp/PostDetails'
import Profile from './comp/Profile'
import Register from './comp/Register'
import Update from './comp/Update'
import { apiUrl, options } from './env'
import { useStateValue } from './State/StateProvider'

const App = () => {
  const [{ profile }, dispatch] = useStateValue()
  useEffect(() => {
    const getdata = async () => {
      const apidata = await Axios.get(`${apiUrl}profile/`, options)
      dispatch({
        type: "ADD_PROFILE",
        profile: apidata.data[0]
      })
    }
    getdata();
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {
          profile != null ? (
            <>
              <Route exact path='/' component={Home} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/user/:username/' component={Friend} />
              <Route exact path='/createpost' component={Newpost} />
              <Route exact path='/:id/' component={PostDetails} />
              <Route exact path='/:id/update/' component={Update} />
            </>
          ) :
            (
              <>
                <Route exact path='/' component={Login} />
                <Route exact path='/register/' component={Register} />
              </>
            )
        }
      </Switch>
    </BrowserRouter>
  )
}

export default App
