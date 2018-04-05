import React from 'react';
import _ from 'lodash';

const Numbers = props => {
    const numberClassName = number => {
        if(props.usedNumbers.includes(number)) {
            return 'used';
        } else {
            return props.selectedNumbers.includes(number) ? 'selected' : '';
        }
    };

    return (
        <div>
            {Numbers.list.map((number, i) =>
                <span key={i} className={numberClassName(number)}
                onClick={() => props.selectNumber(number)}>{number}</span>
            )}
        </div>
    );
};

Numbers.list = _.range(1, 10);

export default Numbers;