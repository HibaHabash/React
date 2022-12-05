import List from './components/List';
import React from 'react';
import { options } from './data/options';
import './App.scss';
function App() {
    return (
        <div className="App">
            <List options={options} />
        </div>
    );
}

export default App;
