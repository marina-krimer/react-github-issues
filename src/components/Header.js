import React from "react"
import '../App.css'
import '../index.css'
import logo from "../logo.png"  

function Header() {
    return(
        <header className="App-header" >
            <img src={logo}  alt="logo?"/>
            <p>Github issues</p>
        </header>
    )
}

export default Header



