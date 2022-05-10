import {
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function App() {
  return (
    <Switch>
      <Route exact path='/Dashboard' component={Dashboard}></Route>
      <Route exact path='/Login' component={Home}></Route>
      <Route exact path='/register' component={Home}></Route>
    </Switch>
  );
}

export default App;
