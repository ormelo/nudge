import React, { Component } from 'react';
class ModalView extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('open modal')
    }

    render() {
        return (<div id="myModal" className="custom-modal">
                <div className="custom-modal-content">
                    <span className="close">&times;</span>
                    <p>Why this option can be me trusted?</p>
                </div>
            </div>)
    }

}

export default ModalView;