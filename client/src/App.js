import React from 'react';
import './App.css';
import './components/Busqueda'
import Busqueda from './components/Busqueda';
import Lista from './components/Lista';

function App() {
  return (
    <div className="App">

        <Busqueda></Busqueda>
        <Lista></Lista>

    </div>
  );
}

export default App;
