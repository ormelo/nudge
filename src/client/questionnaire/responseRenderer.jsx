import React, { Component } from 'react';
import { render } from 'react-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

class CustomRadioGroup extends Component {
    constructor() {
        super();
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        let val =  event.target.parentElement.parentElement.getAttribute("data-val");
        this.props.recordSelection(val);
        this.setState({value:event.target.value});
    };

    render() {
        const {value} = this.state;
        return (
            <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gender1" value={value} onChange={this.handleChange}>
                    {this.props.responses.map((response) =>
                        <FormControlLabel className="response-label" data-val={response.id} value={response.primary_label} control={<Radio data-val={response.id} color="#fe0305" />} label={response.primary_label} />
                    )}
                </RadioGroup>
            </FormControl>
         );
    }
}

class ResponseRenderer extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    getResponseElements() {
        let elems = null;
        if(this.props.responses != null && this.props.responses.length > 0 && this.props.responses[0].type == 'Radio (single select)') {
            return <CustomRadioGroup responses={this.props.responses} recordSelection={this.props.recordSelection} />;
        } else if(this.props.responses != null && this.props.responses.length > 0 && this.props.responses[0].type == 'Text Field') {
            return <Input id="outlined-basic" label={this.props.responses[0].primary_label} variant="outlined" onChange={(e)=>{this.props.recordSelection('any');}} />
        }

    }

    render() {
         const responses = this.getResponseElements();

        return (<div>
            {responses}
        </div>);
    }
}

export default ResponseRenderer;