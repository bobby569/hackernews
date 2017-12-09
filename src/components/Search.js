import React, { Component } from 'react';

export default class Search extends Component {
	render() {
		const { value, onChange } = this.props;
		const inputStyle = { width: '50%', textAlign: 'center' };

		return (
			<div className="search-bar">
				<input
					type="text"
					value={value}
					style={inputStyle}
					onChange={onChange}
					placeholder="Search"
				/>
			</div>
		);
	}
}
