import React from 'react';
// import {Link} from 'react-router-dom';
// import PostActions from '../actions/PostActionCreators';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActionCreators';

export default class extends React.Component {
    state = {
        user: {}
    }

    componentDidMount() {
        AuthActions.checkAuth();
        this.setData();
        AuthStore.addChangeListener(this.onChange);
    }

    componentWillUnmount = () => {
        AuthStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({user: AuthStore.getUser()})
    }

    setData = () => {
        this.setState({user: AuthStore.getUser()});
    }

    updatePassword = (event) => {
        let {target} = event;
        let {user} = this.state;

        user.password = target.value;

        AuthActions.updateUser(user);
    }

    update = () => {
        let {user} = this.state;

        AuthActions.updateUserPassword(user);
    }

    render() {
        let {user} = this.state;

        return (
        <div className="management-container">
            <div className="info-banner">
                <span>
                Please remember your new password. Otherwise you will never be able to access your
                account again.
                </span>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            user: {user.username}
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            karma:
                        </td>
                        <td>
                            1
                        </td>
                    </tr>
                    <tr>
                        <td>
                            password:
                        </td>
                        <td>
                            <input value={user.password || ""}
                            onChange={this.updatePassword}
                            type="password"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={this.update}>
                                update
                            </button>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        );
    }
};
