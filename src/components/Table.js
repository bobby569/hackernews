import React from 'react';
import Row from './Row';

export default (props) => (
    <div className="bordered">
        <div style={{ width: '90%', margin: '10px auto' }}>
            {props.list
                .filter((item) => {
                    return item.title;
                })
                .map((item) => {
                    return <Row key={item.objectID} item={item} onDismiss={props.onDismiss} />;
                })}
        </div>
    </div>
);
