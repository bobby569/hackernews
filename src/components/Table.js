import React from 'react';
import Row from './Row';

export default props => (
	<table className="bordered">
		<tbody>
			{props.list
				.filter(item => {
					return item.title;
				})
				.map(item => {
					return <Row key={item.objectID} item={item} onDismiss={props.onDismiss} />;
				})}
		</tbody>
	</table>
);
