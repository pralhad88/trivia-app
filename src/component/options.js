import React, { Component } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

class Options extends Component {
    
    handelChange = (event) => {
        const {value} = event.target;
        this.props.selectedOption(value) // select Only one option
    }
    
    render() {  // It return own option component for each respective question options.
        const {option, index} = this.props;
        return(
            <MenuItem key={index} value={option}>
                <Checkbox value={option} onChange={this.handelChange} />
                <ListItemText primary={option} />
            </MenuItem>
        )
    }
}

export default Options;