import React from 'react';

export default props => (
	<div className="search-bar">
		<input
			type="text"
			value={props.value}
			style={{ width: '40%', textAlign: 'center' }}
			onChange={e => props.onSearchChange(e.target.value)}
			placeholder="Search"
		/>
	</div>
);
