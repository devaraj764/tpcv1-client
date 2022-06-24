import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import React from 'react'
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import ViewProfile from './components/view-profile';
import PageNotFound from './pages/PageNotFound'
import Adminlogin from './pages/Admin/login.js';
import Admindashboard from './pages/Admin';
import LandingPage from './pages/LandingPage'
import { useMediaQuery } from 'react-responsive'


function App() {

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' })

  return (
    <Switch>
      {isMobile ? <Route exact path="/view-profile/:id" render={() => (
        <p className="preview-unavailable" style={{ textAlign: 'center', width: '100%', color: '#3c4852' }}>Sorry! No Preview available for this screen <br /> <span style={{ color: '#6b818b' }}>Change the screen to "Desktop site"</span></p>
      )}></Route> : <Route exact path='/view-profile/:id' render={() => <ViewProfile />}></Route>}
      <Route exact path='/login' render={() => <Home />}></Route>
      <Route exact path='/register' render={() => <Home />}></Route>
      <Route exact path="/admin/login" render={() => <Adminlogin />}></Route>
      <Route exact path="/admin/dashboard" render={() => <Admindashboard />} />
      <Route exact path="/" render={()=><LandingPage />}></Route>
      <Route path='/dashboard' render={() => <Dashboard />}></Route>
      <Route path="*" render={() => <PageNotFound />} />
    </Switch>
  );
}

export default withRouter(App);
