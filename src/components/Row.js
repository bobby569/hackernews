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
			<tr className="table-row">
				<td style={largeColumn}>
					<a href={item.url}>{item.title}</a>
				</td>
				<td style={midColumn}>{item.author}</td>
				<td style={smallColumn}>{item.num_comments}</td>
				<td style={smallColumn}>{item.points}</td>
				<td style={smallColumn}>
					<Button onClick={() => onDismiss(item.objectID)} className="button-inline">
						Dismiss
					</Button>
				</td>
			</tr>
		);
	}
}
