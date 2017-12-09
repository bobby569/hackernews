import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		return (
			<nav>
				<div className="nav-wrapper blue-grey lighten-2">
					<span className="center brand-logo">Hacker News</span>
				</div>
			</nav>
		);
	}
}
