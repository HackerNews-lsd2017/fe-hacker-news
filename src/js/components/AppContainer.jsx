import PropTypes from 'prop-types';
import React from 'react';
import actions from '../actions/actions';
import logo from '../../img/logo.png';
import '../../styles/App.css';
import image1 from '../../img/image1.jpg'

export default class extends React.Component {

    static propTypes = {
        prop: PropTypes.object
    }

    getPosts  = () => {
        actions.getPosts(10);
    }

    _onBackClick = () => {
        let {router} = this.context;

        router.push({
            name: 'casefile-creator'
        });
    }

    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h2>Hacker Wubadubadubdub News</h2>
                    <h3>Pickle Rick!</h3>
                </div>
                <div className="app-content">
                    <p>Click the button below to check if this application is connected to the server.</p>
                    <button className="ping-server-button" onClick={this.getPosts}>Get posts</button>
                </div>
                <img src={image1} className="main-image" alt="image1"/>
            </div>
        )
   
    }
}
