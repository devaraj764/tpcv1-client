import {
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/register' element={< Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
