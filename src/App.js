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

function App() {
  const api = 'https://tpcapi.herokuapp.com/';
  // const api = 'http://localhost:3000/'

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.replace('/login')
    }
  }, []);
  return (
    <Switch>
      <Route path='/dashboard' render={() => <Dashboard api={api} />}></Route>
      <Route exact path='/Login' render={() => <Home api={api} />}></Route>
      <Route exact path='/register' render={() => <Home api={api} />}></Route>
    </Switch>
  );
}

export default withRouter(App);
