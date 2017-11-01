import React from 'react';

export default class extends React.Component {
    static propTypes = {
    }

    render() {
        return (
            <div className="submit-container">
                <div className="title-input">
                    title <input type="text"/>
                </div>
                <div className="url-input">
                    url <input type="text"/>
                </div>
                <span>or</span>
                <div className="text">
                    text <textarea name="text" id="text" cols="30" rows="10"></textarea>
                </div>
            </div>
        );
    }
};
