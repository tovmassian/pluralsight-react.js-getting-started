import React from 'react';

class Submit extends React.Component {
    buttonState = answerIsCorrect => {
        if(answerIsCorrect === null) {
            return 'default';
        }
        return answerIsCorrect ? 'success' : 'danger';
    };
    render() {
        return (
            <div  className="col-2">
                <button className={this.buttonState(this.props.answerIsCorrect) === 'default' ? 'btn btn-default' : (this.buttonState(this.props.answerIsCorrect) === 'success' ? 'btn btn-success' : 'btn btn-danger')}
                        disabled={this.props.selectedNumbers.length === 0} onClick={this.buttonState(this.props.answerIsCorrect) === 'success' ? () => this.props.acceptAnswer(): () => this.props.checkAnswer()}>
                    <i className={this.buttonState(this.props.answerIsCorrect) === 'default' ? 'fa fa-question' : (this.buttonState(this.props.answerIsCorrect) === 'success' ? 'fa fa-check' : 'fa fa-times')}></i>
                </button>
                <button className="btn btn-warning" disabled={this.props.redrawAmount === 0} onClick={() => this.props.redraw()}><i className="fa fa-refresh"> {this.props.redrawAmount}</i></button>
            </div>
        );
    }
}

export default Submit;