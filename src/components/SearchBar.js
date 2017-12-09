import React, { Component } from 'react';

export default class SearchBar extends Component {
	render() {
		const { value } = this.props;
		const inputStyle = { width: '40%', textAlign: 'center' };

		return (
			<div className="search-bar">
				<input
					type="text"
					value={value}
					style={inputStyle}
					onChange={e => this.props.onSearchChange(e.target.value)}
					placeholder="Search"
				/>
			</div>
		);
	}
}
