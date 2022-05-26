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


function App() {
  // const api = 'https://tpcapi.herokuapp.com/';
  // const api = 'http://localhost:3000/'
  const api = 'https://4027-2409-4070-2cc4-c7cd-75bb-b8a7-c88a-2ceb.in.ngrok.io/'

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.replace('/login')
    }
  }, []);
  return (
    <Switch>
      <Route exact path='/dashboard/view-profile' render={() => <ViewProfile />}></Route>
      <Route exact path='/Login' render={() => <Home api={api} />}></Route>
      <Route exact path='/register' render={() => <Home api={api} />}></Route>
      <Route path='/dashboard' render={() => <Dashboard api={api} />}></Route>
      <Route path="*" render={() => <PageNotFound />} />
    </Switch>
  );
}

export default withRouter(App);
