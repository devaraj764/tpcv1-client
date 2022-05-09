import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Home}></Route>
        <Route exact path='/register' component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
