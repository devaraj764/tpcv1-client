import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import React, { useEffect } from 'react'
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import ViewProfile from './components/view-profile';
import PageNotFound from './pages/PageNotFound'
import Adminlogin from './pages/Admin/login.js';
import Admindashboard from './pages/Admin';


function App() {
  // const api = 'https://tpcapi.herokuapp.com/';
  // const api = 'https://tpc-api.loca.lt'
  const api = 'http://localhost:80'

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.replace('/login')
    }
  }, []);
  return (
    <Switch>
      <Route exact path='/view-profile/:id' render={() => <ViewProfile />}></Route>
      <Route exact path='/Login' render={() => <Home api={api} />}></Route>
      <Route exact path='/register' render={() => <Home api={api} />}></Route>
      <Route exact path="/admin/login" render={() => <Adminlogin api={api} />}></Route>
      <Route exact path="/admin/dashboard" render={() => <Admindashboard api={api}/>} />
      <Route path='/dashboard' render={() => <Dashboard api={api} />}></Route>
      <Route path="*" render={() => <PageNotFound />} />
    </Switch>
  );
}

export default withRouter(App);
