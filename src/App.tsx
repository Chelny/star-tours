import React from 'react';
import './App.css';
import { BookTrip } from './components';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Star Tours</h1>
      </header>
      <main>
        <BookTrip />
      </main>
      <footer className="app-footer" translate="no">
        &copy; 2021 - Chelny Duplan
      </footer>
    </div>
  );
}

export default App;
