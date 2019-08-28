import React from 'react';

var System = function System(props) {
    console.log('props', props);
    return React.createElement(
        'div',
        { className: 'date-label' },
        React.createElement(
            'div',
            { className: 'label-style' },
            props.text
        )
    );
};

export default System;