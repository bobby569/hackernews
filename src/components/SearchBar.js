import React from 'react';

export default (props) => (
    <form className="search-bar" onSubmit={props.onSubmit}>
        <input
            type="text"
            value={props.value}
            style={{ width: '30%', textAlign: 'center' }}
            onChange={props.onChange}
            placeholder="Search"
        />
        <button type="submit">Search</button>
    </form>
);
