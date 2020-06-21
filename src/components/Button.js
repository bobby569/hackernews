import React from 'react';

export default (props) => (
    <button type="button" onClick={props.onClick} className={props.className}>
        {props.children}
    </button>
);
