import React from 'react';
// import {Link} from 'react-router-dom';
// import PostActions from '../actions/PostActionCreators';
// import PostStore from '../stores/PostStore';

export default class extends React.Component {
    state = {
        user: {},
        email: "",
        about: ""
    }

    update = () => {
        console.log("update");
    }

    updateEmail = () => {

    }

    updateAboutMe = () => {
        
    }

    render() {
        let {email, about} = this.state;

        return (
        <div className="management-container">
            <div className="info-banner">
                <span>
                Please put a valid address in the email field, or we won't be able to send you a
                new password if you forget yours. Your address is only visible to you and us.
                Crawlers and other users can't see it.
                </span>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            user:
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            created:
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
                            about:
                        </td>
                        <td>
                            <textArea value={about}
                            onChange={this.updateAboutMe}>
                                
                            </textArea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            email:
                        </td>
                        <td>
                            <input value={email}
                            onChange={this.updateEmail}
                            type="text"/>
                        </td>
                    </tr>
                    {/**
                    <tr>
                        <td>
                        </td>
                        <td>
                            <Link to="">change password</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <Link to="">submissions</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <Link to="">comments</Link>
                        </td>
                    </tr>
                    **/}
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
