import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ''
		};
	}

	render() {
		const { value, onChange } = this.props;
		const inputStyle = { width: '40%', textAlign: 'center' };

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
