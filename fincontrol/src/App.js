import { BrowserRouter as Router } from 'react-router-dom';
import RouterApp from './RouterApp'; 

import './styles/App.scss'

function App() {
  return (
      <div className="App">
        <Router>
          <RouterApp />
        </Router>
      </div>
  );
}

export default App;
