import {
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
    </Switch>
  );
}

export default App;
