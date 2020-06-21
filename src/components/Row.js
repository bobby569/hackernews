import './App.css';
import React, { Component } from 'react';
import Button from './Button';

export default class Row extends Component {
    render() {
        const { item, onDismiss } = this.props;
        const largeColumn = { width: '40%' };
        const midColumn = { width: '30%' };
        const smallColumn = { width: '10%' };

        return (
            <div className="table-row z-depth-1 table__row">
                <span style={largeColumn}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.num_comments}</span>
                <span style={smallColumn}>{item.points}</span>
                <span style={smallColumn}>
                    <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
                        Dismiss
                    </Button>
                </span>
            </div>
        );
    }
}
