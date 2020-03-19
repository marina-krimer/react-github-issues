import React from 'react'
import './App.css'
import Header from './components/views/Header'
import Footer from './components/views/Footer'
import GithubIssues from './components/GithubIssues'

function App() {
  return (
    <div className="App">
      <Header logo />
      <GithubIssues />
      <Footer />
    </div>
  )
}


export default App
