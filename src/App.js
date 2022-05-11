import {
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function App() {
  const api = 'http://localhost:3000/';
  return (
    <Switch>
      <Route path='/dashboard' render={() => <Dashboard api={api}/>}></Route>
      <Route exact path='/Login' render={() => <Home api={api}/>}></Route>
      <Route exact path='/register' render={() => <Home api={api}/>}></Route>
    </Switch>
  );
}

export default App;
