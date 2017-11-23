import React from 'react';
import AuthActions from '../actions/AuthActionCreators';
import AuthStore from '../stores/AuthStore';
import Header from './Header';
import '../../styles/App.css';

export default class extends React.Component {
    state = {
        user: {},
        authenticated: false
    }

    componentDidMount = () => {
        AuthStore.addChangeListener(this.onChange);
        AuthActions.checkAuth();
    }

    componentWillUnmount = () => {
        AuthStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            user: AuthStore.getUser(),
            authenticated: AuthStore.getAuth()
        });
    }

    render = () => {
        let {user, authenticated} = this.state;
        return (
            <div className="app">
                <Header user={user} authenticated={authenticated}/>
                <div className="app-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
