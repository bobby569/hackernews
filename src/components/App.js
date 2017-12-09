import './App.css';
import _ from 'lodash';
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
	}

	componentDidMount() {
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	onDismiss(id) {
		const hits = this.state.result.hits.filter(item => {
			return item.objectID !== id;
		});
		this.setState({ result: { ...this.state.result, hits } });
	}

	onSearchChange(searchTerm) {
		this.setState({ searchTerm });
		_.debounce(term => {
			this.fetchSearchTopStories(term);
		}, 500)(searchTerm);
	}

	setSearchTopStories(result) {
		const { hits, page } = result;
		const oldHits = page !== 0 ? this.state.result.hits : [];
		const updatedHits = [...oldHits, ...hits];
		this.setState({
			result: { hits: updatedHits, page }
		});
	}

	fetchSearchTopStories(searchTerm, page = 0) {
		axios
			.get(`https://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}`)
			.then(res => {
				this.setSearchTopStories(res.data);
			})
			.catch(err => this.setState({ err }));
	}

	render() {
		const { err, result, searchTerm } = this.state;
		if (err) {
			return <p>Something went wrong</p>;
		}
		const center = { textAlign: 'center' };
		const page = (result && result.page) || 0;

		return (
			<div className="page">
				<Header />
				<SearchBar value={searchTerm} onSearchChange={this.onSearchChange} />
				{err ? (
					<div style={center}>
						<p>Something went wrong</p>
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
