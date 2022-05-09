import {
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import Home from './pages/Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
