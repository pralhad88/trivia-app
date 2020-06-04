import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Dialog } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Moment from 'react-moment';

class Sumary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        }
    }


    landingPage = () => { // when finshed the quiz it goes on landing page.
        const {history} = this.props;
        history.push("/")
    }

    getHistory = () => { // it get history of game.
        this.setState({ 
            dialogOpen: true
        })
    }
    
    handleClose =() => { // onClick dailog box is closed.
        this.setState({
            dialogOpen: false
        })
    }
    
    render() {
        const getAllData = JSON.parse(localStorage.getItem("userRecord")) // get all record from localstorage for summary.
        const summary = getAllData.data.slice(-1)[0]
        const history = getAllData.data;
        return(
            <Container maxWidth="sm">
                <Card
                    style={{marginTop: 40, maxWidth: 400}} // card shows the summary of the users.
                > 
                    <CardContent>
                        <Typography variant="h4">Hello, {summary.name}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h6" >Here are the answers selected </Typography>
                    </CardContent>
                    {summary.questionAnswer.map((item, index) => <div>
                        <CardContent>
                    <Typography variant="h5">{`Q. ${index+1} `}{item.question}</Typography>
                        </CardContent>
                        <CardContent>
                            Answers: {item.ans}
                        </CardContent>
                    </div>)}
                    <CardActions>
                        <Button variant="contained" color="secondary" onClick={this.landingPage}>
                            Finish
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.getHistory}>
                            History    
                        </Button>
                    </CardActions>
                </Card>
                <Dialog open={this.state.dialogOpen} // It shows the history of game.
                    onClose={this.handleClose}
                > 
                  <DialogTitle><center><h2>History of game</h2></center></DialogTitle>
                  {history.map((item, index) => <div>
                      <DialogContent>
                          <h2>{`GAME ${index+1}: `}<Moment format="D MMM YYYY HH a" withTitle>{item.dateTime}</Moment></h2>
                      </DialogContent>
                      <DialogContent>
                          <Card>
                            <CardContent>
                                <h3>{`Name : ${item.name}`}</h3>
                            </CardContent>
                            {item.questionAnswer.map((questionAns, qIndex) => <div>
                                <CardContent>
                                    <Typography variant="h5">{`Q. ${qIndex+1} `}{questionAns.question}</Typography>
                                </CardContent>
                                <CardContent>
                                    Answers: {questionAns.ans}
                                </CardContent>
                            </div>)}
                          </Card>
                      </DialogContent>
                      </div>)}
                </Dialog>
            </Container>
        )
    }
}

export default Sumary;