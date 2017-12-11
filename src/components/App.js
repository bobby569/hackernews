import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Button from './Button';
import Header from './Header';
import SearchBar from './SearchBar';
import Table from './Table';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			err: null,
			result: null,
			searchTerm: ''
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
	}

	componentDidMount() {
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	onDismiss(id) {
		const { result } = this.state;
		const hits = result.hits.filter(item => {
			return item.objectID !== id;
		});
		this.setState({ result: { ...result, hits } });
	}

	setSearchTopStories(result) {
		const { hits, page } = result;
		const oldHits = page !== 0 ? this.state.result.hits : [];
		const updatedHits = [...oldHits, ...hits];
		this.setState({ result: { hits: updatedHits, page } });
	}

	fetchSearchTopStories(searchTerm, page = 0) {
		axios
			.get(`https://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}`)
			.then(res => this.setSearchTopStories(res.data))
			.catch(err => this.setState({ err }));
	}

	onSearchChange(e) {
		this.setState({ searchTerm: e.target.value });
	}

	onSearchSubmit(e) {
		e.preventDefault();
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	render() {
		const { err, result, searchTerm } = this.state;
		const center = { textAlign: 'center' };
		const page = result ? result.page : 0;

		return (
			<div className="page">
				<Header />
				<SearchBar
					value={searchTerm}
					onChange={this.onSearchChange}
					onSubmit={this.onSearchSubmit}
				/>
				{err ? (
					<div style={center}>
						<h2>Something went wrong</h2>
					</div>
				) : (
					result && <Table list={result.hits} onDismiss={this.onDismiss} />
				)}
				<div style={center}>
					<Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
						More
					</Button>
				</div>
			</div>
		);
	}
}
