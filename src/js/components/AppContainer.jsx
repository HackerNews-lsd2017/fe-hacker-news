import React from 'react';
import Actions from '../actions/PostActionCreators';
import Store from '../stores/PostStore';
import Header from './Header';
import '../../styles/App.css';

export default class extends React.Component {
    state = {
        user: {},
        authenticated: Store.getAuth()
    }

    componentDidMount = () => {
        Store.addChangeListener(this.onChange);
        Actions.checkAuth();
    }

    componentWillUnmount = () => {
        Store.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            user: Store.getUser(),
            authenticated: Store.getAuth()
        });
    }

    render = () => {
        let {user, authenticated} = this.state;
        return (
            <div className="app">
                <Header user={user} authenticated={authenticated}/>
                {this.props.children}
            </div>
        )
    }
}
