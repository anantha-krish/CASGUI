import React from 'react';
import logo from './logo.svg';
import './assets/sass/common.scss';
import TopBar from './components/common/TopBar/TopBar'
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <TopBar/>
     <Dashboard/>
    </div>
  );
}

export default App;
