import React, {Component} from 'react'
 import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import GithubIssues from './components/GithubIssues'
import _ from 'lodash'

function App() {
  return (
    <div className="App">
      <Header logo/>
      <GithubIssues /> 
      <Footer />
    </div>
  );
}



export default App

