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
            echo: 'This is just a test'
        };

        axios.get(`${host}/test`, {params: params}).then(response => {
            this.setTitle(response.data);
        }).catch(error => {
            this.setTitle('Error');
        });
    }

    setTitle = (title) => {
        this.setState({title: title});
    }

    render() {
        let {title} = this.state;

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Hacker Wubadubadubdub News</h2>
                    <h3>Pickle Rick!</h3>
                </div>

                <div>
                <br/>
                <br/>
                    <button onClick={this.updateTitle}>Update title</button>
                    <h1>{title}</h1>
                </div>
                <p className="App-intro">
                    <br/>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <img src={image1} className="Main-image" alt="image1"/>
            </div>
        );
    }
}

export default App;
