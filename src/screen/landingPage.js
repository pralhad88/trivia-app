import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { withSnackbar } from 'notistack';

class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      name: "",
      userRecord: {
        data: []
      }
    }
  }

  componentDidMount () { // component updateed if data is found in localstorage.
    let userRecord = JSON.parse(localStorage.getItem("userRecord"))
    
    if (!userRecord) {
      localStorage.setItem("userRecord", JSON.stringify(this.state.userRecord))
    } else {
      this.setState({
        userRecord: userRecord
      })
    }
  }
  
  handleClose = () => { // dialog box opend for getting users name.
    this.setState({
      dialogOpen: false
    })
  }

  handleOpen = () => { // dialog box closed once user filled their name.
    this.setState({
      dialogOpen: true
    })
  }

  handelChange = (event) => { // event handeler to update users name.
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }
  
  onSubmit = () => { // once filled user he's/her name then readdy to start quiz.
     
    const {name} = this.state;
    const { history } = this.props;
    
    if(!name) { // the feild is mamdatory.
      this.props.enqueueSnackbar('filed your name!',{ variant: 'error' });
    } else {
      const record = JSON.parse(localStorage.getItem("userRecord")) // get all data from localstorage for recording new entry.
      record.data.push({
        name: name
      });
      localStorage.setItem("userRecord", JSON.stringify(record)) // set user name in localstorage.
      history.push("/quiz")
    }
  }
  
  render() {
    return ( 
        <Container>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Typography className="text" variant="h3" style={{ marginTop: 200 }}>
              Welcome to Trivia Quiz
            </Typography>
            <Button variant="contained" color="secondary" onClick={this.handleOpen}>Launch App</Button>
          </Grid>
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleClose}
          >
            <DialogTitle id="form-dialog-title">What is your name?</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                name='name'
                margin="normal"
                variant="outlined"
                color="primary"
                value={this.state.name}
                onChange={this.handelChange}
              />
            </DialogContent>
            <DialogActions style={{ marginRight: 70 }}>
              <Button variant="contained" color="secondary" onClick={this.onSubmit}>Start Game</Button>
            </DialogActions>
          </Dialog>
        </Container>
    )
  }
}

export default withSnackbar(SplashScreen);