import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Options from "./options";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const questions = [
    {
        question: "Who is the best cricketer in the world?",
        options: ["Sachin Tendulkar", "Virat Kolli", "Adam Gilchirst", "Jacques Kallis"],
        type: "onlyOne"
    },
    {
        question: "What are the colors in the Indian national flag?",
        options: ["White", "Yellow", "Orange", "Green"],
        type: "moreThanOne"
    }
]

class Questions extends Component {
    constructor() {
        super();
        this.state = {
            questionNumber: 0,
            record: [],
            selectedOption: '',
        }
    }

    nextQuestion = () => { // record the all questions answers.
        const {questionNumber, selectedOption, record } = this.state;
        if (questionNumber < questions.length) {
            let newRecord = {
                question: questions[questionNumber].question,
                ans: typeof(selectedOption) == "string"? selectedOption: selectedOption.join(", ")
            }
            this.setState({
                questionNumber: questionNumber + 1,
                record: [...record, newRecord],
                selectedOption: []
            })
        }
    }

    OnSubmit = () => { // once quiz are completed then stored the history in localstorage
        const { history } = this.props;
        const oldRecord = JSON.parse(localStorage.getItem("userRecord"))
        oldRecord.data[oldRecord.data.length -1]["questionAnswer"] = this.state.record
        oldRecord.data[oldRecord.data.length -1]["dateTime"] = new Date()
        localStorage.setItem("userRecord", JSON.stringify(oldRecord))
        history.push("/summary")
    }
    
    selectedOption = (option) => { // this function is applicable for only on option select. 
        this.setState({
            selectedOption: option
        })
    }
    
    handelChange = (event) => { // multiple option select functionality.
        const {value} = event.target;
        const {selectedOption} = this.state;
        let Selectedvalue = selectedOption.indexOf(value) == -1 || selectedOption.length == 0 ? [...selectedOption, value] : selectedOption.filter(e => e !== value);
        this.setState({
            selectedOption: Selectedvalue
        })
    }
    
    render() { // returns question with options.
        const {questionNumber} = this.state;
        return (<div>
            <Container maxWidth="sm" style={{marginTop: 40}}>
                <Card>
                    <CardContent>
                        {questions.length > questionNumber && <div>
                        <Grid item xs={12}>
                            <Typography variant="h4" >{`Q. ${questionNumber+1} ${questions[questionNumber].question}`}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {questions[questionNumber].type=="onlyOne" ? <h4>Select any one.</h4> : <h4>Select more than 1</h4> }
                        </Grid>
                        <Grid item container xs={12}>
                            {questions[questionNumber].type == "onlyOne" ? questions[questionNumber].options.map((options, index) => <Options
                            option={options}
                            selectedOption={this.selectedOption}
                            index={index}
                        />):
                            questions[questionNumber].options.map((option, index) => <MenuItem key={index} >
                                <Checkbox name={option} value={option} onChange={this.handelChange} ></Checkbox>
                                <ListItemText primary={option}></ListItemText>
                            </MenuItem>) }
                        </Grid>
                        <Grid item xs={12} container direction="row" justify="center" alignItems="center">
                            <Button variant="contained" color="secondary" onClick={this.nextQuestion}>Next</Button>
                        </Grid>
                        </div>}
                    </CardContent>
                    <CardContent>
                    <Grid item xs={12} container direction="row" justify="center" alignItems="center">
                        {questionNumber == questions.length && <div>
                            <h3>Submit your quiz and get summary of your performance.</h3>
                            <Button variant="contained" color="secondary" onClick={this.OnSubmit}>
                                Submit
                        </Button></div>}
                    </Grid>
                    </CardContent>
                </Card>
            </Container>
        </div>)
    }
}

export default Questions;