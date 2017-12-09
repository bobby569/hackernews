import './App.css';
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Button from './Button';
import Search from './Search';
import Table from './Table';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const DEFAULT_QUERY = 'redux';
const PARAM_PAGE = 'page=';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: null,
			searchTerm: DEFAULT_QUERY,
			error: null
		};

		this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
		this.setSearchTopStories = this.setSearchTopStories.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
	}

	fetchSearchTopStories(searchTerm, page = 0) {
		fetch(
			`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
		)
			.then(response => response.json())
			.then(result => this.setSearchTopStories(result))
			.catch(e => this.setState({ error: e }));
	}

	setSearchTopStories(result) {
		const { hits, page } = result;
		const oldHits = page !== 0 ? this.state.result.hits : [];
		const updatedHits = [...oldHits, ...hits];
		this.setState({
			result: { hits: updatedHits, page }
		});
	}

	onDismiss(id) {
		const newHits = this.state.result.hits.filter(item => {
			return item.objectID !== id;
		});
		this.setState({ result: { ...this.state.result, hits: newHits } });
	}

	onSearchChange(e) {
		this.setState({ searchTerm: e.target.value });
	}

	onSearchSubmit(e) {
		e.preventDefault();
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	componentDidMount() {
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	render() {
		const { result, searchTerm, error } = this.state;
		const page = (result && result.page) || 0;

		if (error) {
			return <p>Something went wrong</p>;
		}

		return (
			<div className="page">
				<div className="interaction">
					<Search
						value={searchTerm}
						onChange={this.onSearchChange}
						onSubmit={this.onSearchSubmit}
					>
						Search
					</Search>
				</div>
				{error ? (
					<div className="interaction">
						<p>Something went wrong</p>
					</div>
				) : (
					result && <Table list={result.hits} onDismiss={this.onDismiss} />
				)}
				<div className="interactions">
					<Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
						More
					</Button>
				</div>
			</div>
		);
	}
}

export default App;
