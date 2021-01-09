import React, { Component } from 'react';

class LoadingBox extends Component {
    render() {
        return (
            <div className="center">
                <h1><i className="fa fa-spinner fa-spin"></i>Loding...</h1>
            </div>
        );
    }
}

export default LoadingBox;