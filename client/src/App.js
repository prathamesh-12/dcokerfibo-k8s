import { BrowserRouter, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Fib from './components/Fib';
import OtherPage from './components/OtherPage';

function App() {
  return (
    <BrowserRouter>   
      <div className="App">
        <header className="App-header">
          <Link to="/">Home Page</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        <div>
          <Route path="/" exact component={Fib}/>
          <Route path="/otherpage" exact component={OtherPage}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
