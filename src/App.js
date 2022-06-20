import {
  Switch,
  Route,
  withRouter,
  Redirect
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


function App() {
  // const api = 'https://tpcapi.herokuapp.com/';
  // const api = 'https://tpc-api.loca.lt'
  const api = 'http://localhost:80'


  return (
    <Switch>
      <Route exact path='/view-profile/:id' render={() => <ViewProfile api={api} />}></Route>
      <Route exact path='/login' render={() => <Home api={api} />}></Route>
      <Route exact path='/register' render={() => <Home api={api} />}></Route>
      <Route exact path="/admin/login" render={() => <Adminlogin api={api} />}></Route>
      <Route exact path="/admin/dashboard" render={() => <Admindashboard api={api} />} />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path='/dashboard' render={() => <Dashboard api={api} />}></Route>
      <Route path="*" render={() => <PageNotFound />} />
    </Switch>
  );
}

export default withRouter(App);
