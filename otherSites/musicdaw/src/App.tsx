import React from 'react';
import './App.css';

function App() {
  if(isDesktop()){
    return (
      <div className="App">
        <header className="App-header">
        <div className='App-window' id='tools'>
            <h2>temp</h2>
          </div>
          <div className='App-window' id='mixer'>
            <h2>temp</h2>
          </div>
          <div className='App-window' id='tracks'>
          <h2>temp</h2>
          </div>
        </header>
        <main>
          
        </main>
        <footer>
          
        </footer>
      </div>
    );
  }else{
    return (
      <div className='App'>
        <header className='App-header'>
          <h2>Sorry, this website doesnt support mobile devices!</h2>
        </header>
      </div>
    )
  }
   
}

const isDesktop = () => {
  return window.matchMedia("(min-width: 1024px)").matches;
}

export default App;
