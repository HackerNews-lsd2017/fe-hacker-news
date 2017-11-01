import PropTypes from 'prop-types';
import React from 'react';

import actions from '../actions/actions';
import DocumentStore from '../stores/DocumentStore';
import Story from './Story';

import '../../styles/App.css';

import logo from '../../img/logo.png';
import image1 from '../../img/image1.jpg'

export default class extends React.Component {
    state = {
        posts: []
    }

    componentDidMount = () => {
        DocumentStore.addChangeListener(this.onChange);
        this.loadData();
    }

    loadData = () => {
        this.getPosts();
    }

    onChange = () => {
        this.setState({
            posts: DocumentStore.getPosts()
        });
    }

    getPosts = () => {
        actions.getPosts(10);
    }

    _onBackClick = () => {
        let {router} = this.context;

        router.push({
            name: 'casefile-creator'
        });
    }

    render = () => {
        let {posts} = this.state;

        return (
            <div className="app">
                <div className="app-header">
                    
                </div>
                <div className="app-content">
                    {posts.map((post, index) =>
                        <Story key={index} index={index + 1} data={post} />
                    )}
                </div>
            </div>
        )
   
    }
}
