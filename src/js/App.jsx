import React from 'react';

export default class extends React.Component {

    render = () => {
        return (
            <div className="app-container">
                {this.props.children}
            </div>
        )
   }
}
