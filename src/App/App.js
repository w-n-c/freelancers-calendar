import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Calendar from './Calendar'

export class App extends Component {
  render() {
    return (
      <div className="App">
		<Header />
		<Calendar />
      </div>
    );
  }
}
