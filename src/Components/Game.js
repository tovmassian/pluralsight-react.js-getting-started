import React from 'react';
import _ from 'lodash';
import Stars from "./Stars";
import Submit from "./Submit";
import Answer from "./Answer";
import Numbers from "./Numbers";
import DoneFrame from "./DoneFrame";

class Game extends React.Component {

    state = Game.setInitialState();

    static randomNumber = () => {
        return 1 + Math.floor(Math.random()*9);
    };

    static setInitialState = () => ({
        selectedNumbers: [],
        usedNumbers: [],
        randomNumberOfStars: 1 + Game.randomNumber(),
        answerIsCorrect: null,
        redrawAmount: 5,
        doneStatus: null,
    });

    playAgain = () => this.setState(Game.setInitialState());

    selectedNumber = clickedNumber => {
        if (!this.state.selectedNumbers.includes(clickedNumber) && !this.state.usedNumbers.includes(clickedNumber)) {
            this.setState(prevState => ({
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
                answerIsCorrect: null,
            }));
        }
    };

    unselectNumber = clickedNumber => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            answerIsCorrect: null,
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((a, b) => a + b, 0),
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.answerIsCorrect ? prevState.usedNumbers.concat(prevState.selectedNumbers) : prevState.answerIsCorrect,
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber(),
        }), this.updateDoneStatus);
    };

    redraw = () => { 
        if (this.state.redrawAmount > 0) {
            this.setState(prevState => ({
                redrawAmount: prevState.redrawAmount - 1,
                randomNumberOfStars: Game.randomNumber(),
                selectedNumbers: [],
                answerIsCorrect: null,
            }), this.updateDoneStatus);
        }
    };

    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumber = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        );
        return Game.possibleCombinationSum(possibleNumber, randomNumberOfStars);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (this.state.usedNumbers.length === 9) {
                return {doneStatus: 'Congratulations, You Won The Game!'};
            }
            if (prevState.redrawAmount === 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: 'Game Over!'};
            }
        });
    };

    static possibleCombinationSum = function(arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return Game.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize);
        for (var i = 1; i < combinationsCount ; i++ ) {
            var combinationSum = 0;
            for (var j=0 ; j < listSize ; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    };

    render() {
        const {selectedNumbers, usedNumbers, randomNumberOfStars, answerIsCorrect, redrawAmount, doneStatus } = this.state;
        return (
            <div className="container">
                <h2>Play Nine</h2>
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars} />
                    <Submit selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            acceptAnswer={this.acceptAnswer}
                            answerIsCorrect={answerIsCorrect}
                            redraw={this.redraw}
                            redrawAmount={redrawAmount}
                            updateDoneStatus={this.updateDoneStatus}/>
                    <Answer selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber} />
                </div>
                <br />
                { doneStatus ? <DoneFrame doneStatus={doneStatus}
                                          playAgain={this.playAgain} /> :
                    <Numbers selectedNumbers={selectedNumbers}
                             selectNumber={this.selectedNumber}
                             usedNumbers={usedNumbers} />
                }
            </div>
        );
    }
}

export default Game;
