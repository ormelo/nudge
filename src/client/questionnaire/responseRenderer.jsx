import React, { Component } from 'react';
import { render } from 'react-dom';

class ResponseRenderer extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
         const responses = this.props.responses != null && this.props.responses.length > 0 && this.props.responses.map((response) =>
                <li>{response.primary_label}</li>
              );

        return (<div>
            {responses}
        </div>);
    }
}

export default ResponseRenderer;