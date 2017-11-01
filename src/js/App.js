import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../styles/App.css';
import image1 from '../img/image1.jpg'
import axios from 'axios';

const host = 'http://138.68.173.201:8080'; // make constants

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null
        };
    }

    updateTitle = () => {
        let params = {
            echo: 'Server is running'
        };
    }

    setTitle = (title) => {
        this.setState({title: title});
    }

    render() {
        let {title} = this.state;

        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h2>Hacker Wubadubadubdub News</h2>
                    <h3>Pickle Rick!</h3>
                </div>
                <div className="app-content">
                    <p>Click the button below to check if this application is connected to the server.</p>
                    <button className="ping-server-button" onClick={this.updateTitle}>Ping Server</button>
                    <h1 className={(title === 'Error') ? "error" : "success"}>{title}</h1>
                    <p>Endpoint for the server:</p>
                    <a href="http://138.68.173.201:8080/test?echo=hello%20world">
                        {host + "/test?echo=hello%20world"}
                    </a>
                </div>
                <img src={image1} className="main-image" alt="image1"/>

                <div>
                    <h1>Render here:</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
